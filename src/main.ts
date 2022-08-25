import path from "path";
import { setRcFile } from "./gen";

export function init() {
  const npmrcPath = path.resolve(process.cwd(), ".npmrc");
  setRcFile(npmrcPath);
}
