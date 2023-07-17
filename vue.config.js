module.exports = defineConfig({
  publicPath: '/master',
  configureWebpack: config => {
    config.externals = {
      AMap: 'AMap'
    }
  }

})

