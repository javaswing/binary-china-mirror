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
      // filter oldContent props in content vars by key
      // @see https://stackoverflow.com/questions/31906705/alternative-to-deprecated-regexp-n-object-properties
      const splitArr = oldContent
        .match(/^.*$/gm)
        ?.filter(Boolean)
        .filter((s: string) => {
          const reg = isYarn ? /^(.+?)\s\s*/ : /^(.+?)\s*=/;
          if (reg.test(s)) {
            const catchKey = (reg.exec(s) || [])[1] || "";
            return !(catchKey && catchKey in content);
          }
          return false;
        });

      const newSplitArr = parseObjToString(content, isYarn, splitArr);
      if (newSplitArr !== oldContent) {
        fse.outputFileSync(rcFilePath, newSplitArr);
      }
    } else {
      const config = parseObjToString(content, isYarn);
      fse.outputFileSync(rcFilePath, config);
    }
  } catch (error: unknown) {
    console.error(error);
  }
}

function parseObjToString(
  obj: Record<string, unknown>,
  isYarn?: boolean,
  sourceArr: any[] = []
) {
  Object.keys(obj).forEach((key) => {
    const lineStr = isYarn ? `${key} ${obj[key]}` : `${key}=${obj[key]}`;
    sourceArr.push(lineStr);
  });

  if (sourceArr[sourceArr.length - 1]) {
    sourceArr.push("");
  }
  const newContent = sourceArr.join("\n");
  return newContent;
}

export function getSpeedUpEnv() {
  return BinaryMirrorConfig.mirrors.china.ENVS;
}
