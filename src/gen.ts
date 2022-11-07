import BinaryMirrorConfig from "binary-mirror-config";
import fs from "fs";
import fse from "fs-extra";

export function setRcFile(
  rcFilePath: string,
  content: Record<string, unknown>,
  isYarn?: boolean
) {
  let oldContent;
  try {
    oldContent = fs.readFileSync(rcFilePath, "utf8");
  } catch (error: any) {
    if ("code" in error && error.code === "ENOENT") {
      // 文件不存在
      return;
    } else {
      throw error;
    }
  }
  try {
    if (oldContent) {
      console.log("oldContent :>> ", oldContent.match(/^.*$/gm));
      const splitArr = oldContent
        .match(/^.*$/gm)
        ?.filter(Boolean)
        .filter((s: string) => {
          const reg = isYarn ? /^(.+?)\s\s*/ : /^(.+?)\s*=/;
          if (!reg.test(s)) {
            RegExp.$1.toLowerCase();
          }
        });
    } else {
      const config = parseObjToString(content, isYarn);
      fse.outputFileSync(rcFilePath, config);
    }
  } catch (error: unknown) {
    console.error(error);
  }
}

function parseObjToString(obj: Record<string, unknown>, isYarn?: boolean) {
  const newEvn: string[] = [];
  Object.keys(obj).forEach((key) => {
    const lineStr = isYarn ? `${key} ${obj[key]}` : `${key}=${obj[key]}`;
    newEvn.push(lineStr);
  });

  if (newEvn[newEvn.length - 1]) {
    newEvn.push("");
  }
  const newContent = newEvn.join("\n");
  return newContent;
}

export function getSpeedUpEnv() {
  return BinaryMirrorConfig.mirrors.china.ENVS;
}
