module.exports = {
    devServer: {
        port: 8080, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                // ws: true,
                // changeOrigin: false,
                pathRewrite: {
                  '/api': '/'
                }
              },
        },  
    }
}