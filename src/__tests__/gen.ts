import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs-extra";
import path from "path";
import { getSpeedUpEnv, setRcFile } from "../gen";

test("getSpeedUpEnv", () => {
  expect(getSpeedUpEnv()).toEqual({
    NODEJS_ORG_MIRROR: "https://cdn.npmmirror.com/binaries/node",
    NVM_NODEJS_ORG_MIRROR: "https://cdn.npmmirror.com/binaries/node",
    PHANTOMJS_CDNURL: "https://cdn.npmmirror.com/binaries/phantomjs",
    CHROMEDRIVER_CDNURL: "https://cdn.npmmirror.com/binaries/chromedriver",
    OPERADRIVER_CDNURL: "https://cdn.npmmirror.com/binaries/operadriver",
    ELECTRON_MIRROR: "https://cdn.npmmirror.com/binaries/electron/",
    ELECTRON_BUILDER_BINARIES_MIRROR:
      "https://cdn.npmmirror.com/binaries/electron-builder-binaries/",
    SASS_BINARY_SITE: "https://cdn.npmmirror.com/binaries/node-sass",
    SWC_BINARY_SITE: "https://cdn.npmmirror.com/binaries/node-swc",
    NWJS_URLBASE: "https://cdn.npmmirror.com/binaries/nwjs/v",
    PUPPETEER_DOWNLOAD_HOST: "https://cdn.npmmirror.com/binaries",
    SENTRYCLI_CDNURL: "https://cdn.npmmirror.com/binaries/sentry-cli",
    SAUCECTL_INSTALL_BINARY_MIRROR:
      "https://cdn.npmmirror.com/binaries/saucectl",
    PLAYWRIGHT_DOWNLOAD_HOST: "https://cdn.npmmirror.com/binaries/playwright",
    RE2_DOWNLOAD_MIRROR: "https://cdn.npmmirror.com/binaries/node-re2",
    RE2_DOWNLOAD_SKIP_PATH: "true",
    npm_config_keytar_binary_host: "https://cdn.npmmirror.com/binaries/keytar",
    npm_config_sharp_binary_host: "https://cdn.npmmirror.com/binaries/sharp",
    npm_config_sharp_libvips_binary_host:
      "https://cdn.npmmirror.com/binaries/sharp-libvips",
    npm_config_robotjs_binary_host:
      "https://cdn.npmmirror.com/binaries/robotjs",
  });
});

describe("config file test", () => {
  const mockNpmFile = path.join(__dirname, ".npmrc");
  const mockYarnFile = path.join(__dirname, ".yarnrc");

  beforeAll(() => {
    if (!existsSync(mockNpmFile)) {
      writeFileSync(mockNpmFile, "");
    }

    if (!existsSync(mockYarnFile)) {
      writeFileSync(mockYarnFile, "");
    }
  });

  afterAll(() => {
    unlinkSync(mockNpmFile);
    unlinkSync(mockYarnFile);
  });

  test("write a npmrc file", async () => {
    setRcFile(mockNpmFile, { mock: "323", mock2: "mock2" });
    const content = readFileSync(mockNpmFile, "utf-8");
    expect(content).toEqual("mock=323\nmock2=mock2\n");
  });

  test("write a yarnrc file", async () => {
    setRcFile(
      mockYarnFile,
      {
        mock: "323",
        registry: "https://registry.npm.taobao.org",
      },
      true
    );

    const content = readFileSync(mockYarnFile, "utf-8");
    expect(content).toEqual(
      "mock 323\nregistry https://registry.npm.taobao.org\n"
    );
  });
});
