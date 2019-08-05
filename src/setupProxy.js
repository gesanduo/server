const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('http://localhost:3000/api', {
      target: 'http://localhost:8081/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}