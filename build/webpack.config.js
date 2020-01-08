const fs = require("fs");
const path = require('path');
const merge = require('webpack-merge');
const config = require('../config/index');
const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname); //源码目录
const VIEWS_PATH = path.resolve(__dirname, '../static/view/'); //模板目录
const JS_PATH = path.resolve(__dirname, '../static/module/'); //模板目录

//生成环境
const NODE_ENV = process.env.NODE_ENV;

// 页面入口
const pageEntry = {};
// 页面模板
const pageHtml = [];
//入口页面
const pages = fs.readdirSync(VIEWS_PATH);
console.log(pages);
pages.forEach((name, index) => {
    //入口路径
    const entryPath = path.join(VIEWS_PATH, name);
    //入口js
    pageEntry[name] = path.join(JS_PATH, `${name}/${name}.ts`);
    // 输出页面模板
    pageHtml.push(new HtmlWebpackPlugin({
        entryName: name,
        template: `${entryPath}/${name}.html`,
        filename: `views/${name}/${name}.html`,
        inject:'body',
        chunks: [name]
    }));
});

console.log(pageEntry);

module.exports = merge(baseConfig,{
    entry: Object.assign(pageEntry, {

    }),
    output: {
        path: path.resolve(__dirname, '../dist/'),
        publicPath: config.build.publicPath,
        filename: "[name]/[name].[chunkhash].js",
        chunkFilename:'[name].[chunkhash].bundle.js'
    },
    mode: NODE_ENV,
    devServer:{
        contentBase:"./dist",
        historyApiFallback: true,
        inline: true,
        open: true
    },
    plugins: [

    ].concat(pageHtml)
});