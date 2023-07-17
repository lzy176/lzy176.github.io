module.exports = defineConfig({
  publicPath: '/gh-pages/',
  outputDir: 'dist', // 构建时的输出目录
  assetsDir: './static', // 放置静态资源的目录
  indexPath: 'index.html', // html 的输出路径
  configureWebpack: config => {
    config.externals = {
      AMap: 'AMap'
    }
  }

})

