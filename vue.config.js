module.exports = defineConfig({
  publicPath: "./",
  configureWebpack: config => {
    config.externals = {
      AMap: 'AMap'
    }
  }

})

