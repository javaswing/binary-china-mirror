# binary-china-mirror
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
# 命令会自动根据当前项目用yarn或者npm自动生成对应的rc文件
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

- [nvm](https://github.com/nvm-sh/nvm)
- [ChromeDriver](https://www.npmjs.com/package/chromedriver)
- [nwjs](https://github.com/nwjs/nw.js)
- [Electron](https://www.npmjs.com/package/electron)
- [node-sass](https://github.com/sass/node-sass)
- [swc-node](https://github.com/swc-project/swc-node)
- [Playwright](https://www.npmjs.com/package/playwright)
- [node-gyp](https://www.npmjs.com/package/node-gyp)
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3)
- [sentrycli](https://www.npmjs.com/package/@sentry/cli)
- [phantomjs](https://phantomjs.org/)
- [Puppeteer](https://www.npmjs.com/package/puppeteer)
- [node-re2](https://github.com/uhop/node-re2)
- [headless-gl](https://github.com/stackgl/headless-gl)
- [grpc](https://github.com/grpc/grpc-node)
