import { execSync } from "child_process";
import path from "path";
import LRUCache from "lru-cache";
import fs from "fs";

let _hasYarn: boolean;

const _yarnProjects = new LRUCache<string, boolean>({
  max: 10,
  maxAge: 1000,
});

export const hasProjectYarn = (cwd: string) => {
  if (_yarnProjects.has(cwd)) {
    return checkYarn(_yarnProjects.get(cwd));
  }

  const lockFile = path.join(cwd, "yarn.lock");
  const result = fs.existsSync(lockFile);
  _yarnProjects.set(cwd, result);
  return checkYarn(result);
};

function checkYarn(result: boolean | undefined) {
  if (result && !hasYarn())
    throw new Error(
      `The project seems to require yarn but it's not installed.`
    );
  return result;
}

// env detection
export const hasYarn = () => {
  if (_hasYarn != null) {
    return _hasYarn;
  }
  try {
    execSync("yarn --version", { stdio: "ignore" });
    return (_hasYarn = true);
  } catch (e) {
    return (_hasYarn = false);
  }
};

const _npmProjects = new LRUCache({
  max: 10,
  maxAge: 1000,
});

export const hasProjectNpm = (cwd: string) => {
  if (_npmProjects.has(cwd)) {
    return _npmProjects.get(cwd);
  }

  const lockFile = path.join(cwd, "package-lock.json");
  const result = fs.existsSync(lockFile);
  _npmProjects.set(cwd, result);
  return result;
};

// OS
export const isWindows = process.platform === "win32";
export const sMacintosh = process.platform === "darwin";
export const isLinux = process.platform === "linux";
