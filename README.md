# Binary-china-mirror
解决国内安装npm依赖时，需要安装国外binary库的问题，让你摆脱安装失败问题。


## 使用方式

```bash
# 自动在全局的.npmrc及.yarnrc生成对应的配置
npm i -g binary-china-mirror --registry=https://registry.npmmirror.com
# 查看npm配置
npm config list
```

## 为项目生成镜像配置文件

```
cd ~/my-project
binary-china-mirror
```

## 在Docker中使用
```dockerfile
RUN npm config set registry https://registry.npmmirror.com \
  && npm install --unsafe-perm -g binary-china-mirror


# 安装全部依赖
RUN npm ci
```



# Mirror源
- [binary-mirror-config](https://github.com/cnpm/binary-mirror-config)

## 目前包含的依赖源

- [x] [nvm](https://github.com/nvm-sh/nvm)
- [x] [ChromeDriver](https://www.npmjs.com/package/chromedriver)
- [x] [nwjs](https://github.com/nwjs/nw.js)
- [x] [Electron](https://www.npmjs.com/package/electron)
- [x] [node-sass](https://github.com/sass/node-sass)
- [x] [swc-node](https://github.com/swc-project/swc-node)
- [x] [Playwright](https://www.npmjs.com/package/playwright)
- [x] [node-gyp](https://www.npmjs.com/package/node-gyp)
- [ ] [sqlite3]
- [x] [better-sqlite3](https://www.npmjs.com/package/better-sqlite3)
- [x] [sentrycli](https://www.npmjs.com/package/@sentry/cli)
- [ ] [OperaDriver]
- [x] [phantomjs](https://phantomjs.org/)
- [x] [Puppeteer](https://www.npmjs.com/package/puppeteer)
- [x] [node-re2](https://github.com/uhop/node-re2)
- [x] [headless-gl](https://github.com/stackgl/headless-gl)
- [x] [grpc](https://github.com/grpc/grpc-node)
