export const otherConfigMirror = {
  // python
  "python-mirror": "https://npmmirror.com/mirrors/python",

  // sqlite3
  // "sqlite3-binary-site": "https://npmmirror.com/mirrors/sqlite3",
  // "node-sqlite3-binary-host-mirror": "https://npmmirror.com/mirrors",

  // node-gyp
  // need to path
  // "iojs-org-mirror": "https://npmmirror.com/mirrors/iojs",

  // node-canvas
  canvas_binary_host_mirror: "https://npmmirror.com/mirrors/canvas",

  // git-win
  "git4win-mirror": "https://npmmirror.com/mirrors/git-for-windows",

  // headless-gl
  "gl-binary-host-mirror": "https://npmmirror.com/mirrors/gl/v{version}",

  // grpc
  "grpc-node-binary-host-mirror": "https://npmmirror.com/mirrors",

  // @todo
  // CYPRESS_DOWNLOAD_MIRROR: "https://cdn.npmmirror.com/binaries/cypress/",

  // node-pre-gyp
  // ref: https://github.com/mapbox/node-pre-gyp/pull/170
  // https://github.com/node-gfx/node-canvas-prebuilt/blob/master/package.json#L24
  npm_config_canvas_binary_host_mirror: `https://cdn.npmmirror.com/binaries/canvas`,
  // https://github.com/node-inspector/v8-profiler/blob/master/package.json#L24
  npm_config_profiler_binary_host_mirror: `https://cdn.npmmirror.com/binaries/node-inspector`,
  // https://github.com/node-inspector/v8-debug/blob/master/package.json#L18
  npm_config_debug_binary_host_mirror: `https://cdn.npmmirror.com/binaries/node-inspector`,
  // https://github.com/mapbox/node-sqlite3/blob/master/package.json#L10
  // npm_config_node_sqlite3_binary_host_mirror:
  // "https://cdn.npmmirror.com/binaries",
  // https://github.com/nodegit/nodegit/blob/master/package.json#L69
  // NOTE: {version} 会被 node-pre-gyp 替换
  npm_config_nodegit_binary_host_mirror: `https://cdn.npmmirror.com/binaries/nodegit/v{version}`,
  // https://github.com/fsevents/fsevents
  npm_config_fse_binary_host_mirror: `https://cdn.npmmirror.com/binaries/fsevents/`,

  // prebuild
  npm_config_sharp_binary_host: `https://cdn.npmmirror.com/binaries/sharp`,
};
