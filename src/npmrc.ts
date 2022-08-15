import BinaryMirrorConfig from "binary-mirror-config";
import fs from "fs";

export function setNpmrc(npmrcPath: string) {
  let content;
  try {
    content = fs.readFileSync(npmrcPath, "utf8");
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // 文件不存在
      fs.writeFileSync(npmrcPath, "");
    } else {
      console.log(error);
    }
  }
  try {
    const speedEnvConfig = getSpeedUpEnv();
    const newEvn: string[] = [];
    Object.keys(speedEnvConfig).forEach((key) => {
      newEvn.push(`${key}=${speedEnvConfig[key]}`);
    });

    if (newEvn[newEvn.length - 1]) {
      newEvn.push("");
    }
    const newContent = newEvn.join("\n");
    content !== newContent && fs.appendFileSync(npmrcPath, newContent);
  } catch (error: any) {
    console.error(error);
  }
}

export function getSpeedUpEnv() {
  return BinaryMirrorConfig.mirrors.china.ENVS;
}
