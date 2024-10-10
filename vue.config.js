const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  publicPath: './',
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      customFileProtocol: "./",
      builderOptions: {
        productName: '小鸡桌面',
        win: {
          icon: require('path').join(__dirname, './public/512x512.png'),
          requestedExecutionLevel: "highestAvailable"
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve("path-browserify")
      }
    }
  }
})