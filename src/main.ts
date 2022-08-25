import isDocker from "is-docker";
import path from "path";
import { setRcFile } from "./gen";
import { hasYarn } from "./utils";
import os from "os";

export function init() {
  if (isDocker()) {
    const npmrcPath = path.resolve(process.cwd(), ".npmrc");
    setRcFile(npmrcPath);

    if (hasYarn()) {
      const yarnrcPath = path.resolve(process.cwd(), ".yarnrc");
      setRcFile(yarnrcPath);
    }
  } else {
    if (hasYarn()) {
      const yarnrcPath = path.resolve(os.homedir(), ".yarnrc");
      setRcFile(yarnrcPath);
    }

    const npmrcPath = path.resolve(os.homedir(), ".npmrc");
    setRcFile(npmrcPath);
  }
}
