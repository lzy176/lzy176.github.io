module.exports = defineConfig({
  publicPath: '/github-actions-demo/',
  configureWebpack: config => {
    config.externals = {
      AMap: 'AMap'
    }
  }

})

