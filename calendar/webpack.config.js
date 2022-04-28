const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量
const config = {
    // 开发模式
    mode: "development",
    // 入口文件
    entry: "./src/js/index.js",
    // 出口文件
    output: {
        filename: "bundle.js",// 输出文件名
        path: path.resolve(__dirname, "dist")// 输出文件目录 
    },
    module: {
        // 转换规则
        rules: [
            {
                test: /\.css$/i,// 匹配css文件
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    },
    // 配置插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'// html文件位置
        }),
        new CleanWebpackPlugin(),
        require("postcss-preset-env")
    ],
    // 热更新
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'src'), // 静态文件目录
        },
        compress: true, //是否启动压缩 gzip
        port: 8080, // 端口号
        open: true  // 是否自动打开浏览器
    },
    exclude: './node_modules'
}
module.exports = (env, argv) => {
    console.log("argv.mode=", argv.mode);// 打印mode值
    return config;
}