import { getSpeedUpEnv } from "../npmrc";

test("getSpeedUpEnv", () => {
  expect(getSpeedUpEnv()).not.toBeNull();
});
