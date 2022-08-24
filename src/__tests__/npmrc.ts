import { getSpeedUpEnv } from "../npmrc";

describe("npmrc test", () => {
  test("getSpeedUpEnv", () => {
    expect(getSpeedUpEnv()).not.toBeNull();
  });
});
