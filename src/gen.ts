import BinaryMirrorConfig from "binary-mirror-config";
import fs from "fs-extra";
import { otherConfigMirror } from "./constants";

export function setRcFile(
  rcFilePath: string,
  content: Record<string, unknown>,
  isYarn?: boolean
) {
  let oldContent = "";
  try {
    oldContent = fs.readFileSync(rcFilePath, "utf8");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if ("code" in error && error.code === "ENOENT") {
      console.error("file is ENOENT, will create file");
    } else {
      throw error;
    }
  }
  try {
    // filter oldContent props in content vars by key
    // @see https://stackoverflow.com/questions/31906705/alternative-to-deprecated-regexp-n-object-properties
    const splitArr = oldContent
      .match(/^.*$/gm)
      ?.filter(Boolean)
      .filter((s: string) => {
        const reg = isYarn ? /^(.+?)\s\s*/ : /^(.+?)\s*=/;
        if (reg.test(s)) {
          const catchKey = (reg.exec(s) || [])[1] || "";
          return !(
            catchKey &&
            (catchKey.toLowerCase() in content ||
              catchKey.toUpperCase() in content)
          );
        }
        return false;
      });

    const newSplitArr = parseObjToString(content, isYarn, splitArr);
    if (newSplitArr !== oldContent) {
      fs.outputFileSync(rcFilePath, newSplitArr);
    }
  } catch (error: unknown) {
    console.error(error);
  }
}

function parseObjToString(
  obj: Record<string, unknown>,
  isYarn?: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sourceArr: any[] = []
) {
  Object.keys(obj).forEach((key) => {
    // must use lower in yarnrc or npmrcfile
    const formatKey = key.toLowerCase();
    const lineStr = isYarn
      ? `${formatKey} ${obj[key]}`
      : `${formatKey}=${obj[key]}`;
    sourceArr.push(lineStr);
  });

  if (sourceArr[sourceArr.length - 1]) {
    sourceArr.push("");
  }
  const newContent = sourceArr.join("\n");
  return newContent;
}

/**
 * get speed env
 * @returns
 * @see https://opensumi.com/zh/docs/integrate/quick-start/electron
 */
export function getSpeedUpEnv() {
  return {
    registry: "https://registry.npmmirror.com",
    // add electron custom dir
    // @see https://www.electronjs.org/docs/latest/tutorial/installation#mirror
    // ELECTRON_CUSTOM_DIR: "{{ version }}",
    ...BinaryMirrorConfig.mirrors.china.ENVS,
    ...otherConfigMirror,
  };
}
