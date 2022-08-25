import BinaryMirrorConfig from "binary-mirror-config";
import fs from "fs";

export function setRcFile(rcPath: string) {
  let content;
  try {
    content = fs.readFileSync(rcPath, "utf8");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // 文件不存在
      fs.writeFileSync(rcPath, "");
    } else {
      console.log(error);
    }
  }
  try {
    const isYarn = rcPath.indexOf(".yarn") > -1;
    const speedEnvConfig = getSpeedUpEnv();
    const newEvn: string[] = [];
    Object.keys(speedEnvConfig).forEach((key) => {
      const lineStr = isYarn
        ? `${key} ${speedEnvConfig[key]}`
        : `${key}=${speedEnvConfig[key]}`;
      newEvn.push(lineStr);
    });

    if (newEvn[newEvn.length - 1]) {
      newEvn.push("");
    }
    const newContent = newEvn.join("\n");
    content !== newContent && fs.appendFileSync(rcPath, newContent);
  } catch (error: unknown) {
    console.error(error);
  }
}

export function getSpeedUpEnv() {
  return BinaryMirrorConfig.mirrors.china.ENVS;
}
