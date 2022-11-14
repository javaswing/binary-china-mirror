import path from "path";
import os from "os";
import { getSpeedUpEnv, setRcFile } from "./gen";
import { hasYarn } from "./utils";

// let argv: string | string[];
// try {
//   // before npm7
//   // @see https://github.com/npm/cli/issues/4663
//   if (process.env.npm_config_argv) {
//     argv = JSON.parse(process.env.npm_config_argv).original;
//   } else {
//     argv = process.argv.slice(2);
//   }
// } catch (ex) {
//   argv = process.argv.slice(2);
// }

const usrConfig = process.env.npm_config_userconfig;

const configFile = usrConfig
  ? path.resolve(usrConfig)
  : path.join(os.homedir(), ".npmrc");

type ConfigType = {
  filePath: string;
  isYarn: boolean;
};

function genConfigFileList() {
  const targetFileConfig: ConfigType[] = [];
  if (hasYarn()) {
    targetFileConfig.push({
      filePath: path.join(os.homedir(), ".yarnrc"),
      isYarn: true,
    });
  }

  targetFileConfig.push({ filePath: configFile, isYarn: false });
  return targetFileConfig;
}

// batch write npmrc yarnrc
genConfigFileList().forEach((c: ConfigType) => {
  setRcFile(c.filePath, getSpeedUpEnv(), c.isYarn);
});
