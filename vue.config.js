module.exports = defineConfig({
  configureWebpack: config => {
    config.externals = {
      AMap: 'AMap'
    }
  }
})

