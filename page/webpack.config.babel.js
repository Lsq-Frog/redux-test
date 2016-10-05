/**
 * Created by lai on 2016/7/15.
 */

import path from  'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Plugins from './config/plugins'

/**********************module.exports的entry配置*******************************/

//获取所有入口文件
let entryJS = {};
entryJS['index'] = ['./src/entries/index.js'];
entryJS['react'] = ['react'];
entryJS['react-dom'] = ['react-dom'];
entryJS['jquery'] = ['jquery'];


/****************************webpack的总体配置******************************/
export default  {
    //入口文件，这里循环所有入口文件，不需要每个都写出来
    entry: entryJS,
    output: {
        //打包文件存放的绝对路径，html、css、js都会按这个路径打包
        path: path.join(__dirname, '../server/static/'),
        //网站运行时的访问路径，不设置的话，打包出的html中的默认引用的路径会是相对路径
        publicPath: "/views/",
        //打包后的文件名
        filename: 'js/[name].js'
    },
    resolve: {
        //require文件的时候不需要写后缀了，可以自动补全
        extensions: ['', '.js', '.jsx', '.css']
    },
    module: {
        loaders: [//定义一系列加载器
            {test: /\.html$/, loader: "html"}, /*html*/
            {test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}, /*css to css*/
            {test: /\.(jpg|png)$/, loader: "url?limit=8192"},  //limit=8192表示图片大小单位是k  小于这个值走内联大于这个值走外联             /*images 打包*/
            {test: /\.less$/, loader: "style!css!less"}                 /*less to css*/
        ]
    },
    plugins: Plugins, //使用插件
    //watch: true //开启观察者模式
};