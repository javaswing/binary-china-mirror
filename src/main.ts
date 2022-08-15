import path from "path";
import { setNpmrc } from "./npmrc";

export function init() {
  const npmrcPath = path.resolve(process.cwd(), ".npmrc");
  setNpmrc(npmrcPath);
}
