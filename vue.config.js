const apiUrl = process.env.VUE_APP_API_URL
module.exports = {
  devServer: {
    proxy: {
      [apiUrl]: {
        target: 'http://localhost:5000',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { [apiUrl]: '/' },
      },
    },
  },
}
