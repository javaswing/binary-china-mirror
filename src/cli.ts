#!/usr/bin/env node

import path from "path";
import { getSpeedUpEnv, setRcFile } from "./gen";
import { hasProjectNpm, hasProjectYarn } from "./utils";

const fileList: { filePath: string; isYarn: boolean }[] = [];

if (hasProjectNpm(process.cwd())) {
  fileList.push({
    filePath: path.join(process.cwd(), ".npmrc"),
    isYarn: false,
  });
}

if (hasProjectYarn(process.cwd())) {
  fileList.push({
    filePath: path.join(process.cwd(), ".yarnrc"),
    isYarn: true,
  });
}

fileList.forEach((c: { filePath: string; isYarn: boolean }) => {
  setRcFile(c.filePath, getSpeedUpEnv(), c.isYarn);
});
