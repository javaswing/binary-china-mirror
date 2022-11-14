import { MirrorConfig } from "binary-mirror-config";
import { MockAgent } from "urllib";

describe("fetch binary test file", () => {
  const mockAgent = new MockAgent();

  it("should fail", async () => {
    mockAgent
      .get("https://registry.npmmirror.com")
      .intercept({
        path: "/binary-mirror-config/latest",
        method: "GET",
      })
      .reply(500)
      .times(2);

    const mirrorConfig = new MirrorConfig({
      retryCount: 2,
      retryTimeout: 300,
      console: globalThis.console,
    });
    await mirrorConfig.init();
    mockAgent.assertNoPendingInterceptors();
  });
});
