/*var debug = process.env.NODE_ENV !== "production";*/
var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var htmlWebpackPlugins = require('html-webpack-plugin');
//postcss-loader 需要的配置项
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var extractSass = new ExtractTextPlugin({
    filename: "src/css/[name].css"

});

/*var extractCss = new ExtractTextPlugin({
    filename: "css/index.css"

});*/
module.exports = {
    context: path.join(__dirname),
    /* devtool: debug ? "inline-sourcemap" : null,*/
    entry: "./src/js/root.js",
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react') //模块名，路径
        },
        extensions: ['.js', '.jsx', '.scss']
    }, //调用框架与项目react不同会冲突出错,指定加载路径，
    //extensions对衍生的类型，用alias指定路径去查找位置
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs',
                        ['import', {
                            libraryName: 'antd',
                            style: 'css'
                        }]
                    ], //添加组件的插件配置，插件css按需加载
                }
            },
            //下面是添加的 css 的 loader，也即是 css 模块化的配置方法，大家可以拷贝过去直接使用
            {
                test: /\.css$/,

                /* use: extractCss.extract({
                     fallback: "style-loader",
                     use: ["css-loader"]
                 })*/

                use: [
                    {
                        loader: 'style-loader',

                    }, {
                        loader: 'css-loader'
                    }
                ] //调用框架Ant Design对输出名不做处理
                /* use:[
                 {
                   loader:'style-loader',

                 },{
                   loader:'css-loader',
                   options:{

                      importLoaders:1,
                      modules:true,//运行对模块进行操作，命名等
                      localIdentName:'[name]__[local]--[hash:base64:5]'
                       //css模块化里class名字变为这种形式，不然直接显示hash值

                   }

                 }
                 ]*/


                // loader: 'style-loader!css-loader?modules&importLoaders=1'

            }, {
                test: /\.less/, //引入刷新包
                loader: 'style-loader!css-loader!less-loader'
            },

            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src'),
                /* exclude: path.resolve(__dirname, 'node_modules'),*/

                use: extractSass.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        {
                            loader: 'postcss-loader', //loader可串联,post-loader是对css后处理

                            options: {
                                ident: 'postcss',
                                plugins: (loader) => [
                                    require('autoprefixer')({
                                        broswers: 'last 5 versions'
                                    }) //对css自动加进行浏览器前缀
                                ]
                            }
                        },
                        "sass-loader"
                    ]
                }
                /*loader: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development 
                fallback: "style-loader"
                        }*/ )

            /*use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'css/[name].css'
                    }

                },
                {
                    loader: "extract-loader",
                    options: {
                        publicPath: "../",
                    }
                },


                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: (loader) => [
                            require('autoprefixer')({
                                broswers: 'last 5 versions'
                            })


                        ]
                    }
                },
                'sass-loader'
            ]*/
            },
        /*{
            test: /\.(png|jpg|gif|svg)/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 20000, //20k
                        name: 'images/[name].[ext]' //打包后文件名，占位符name，5位hash，还有后缀名

                    }

                }




            ]

        }*/
        ]
    },
    output: {
        path: path.join(__dirname),
        /*   publicPath: "/src",*/
        filename: "./src/bundle.js"
    },

    plugins: [
        extractSass,
        //  extractCss,
        /*new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        }),*/
        new htmlWebpackPlugins({
            filename: './index.html',
            template: './src/index.html'


        })
    ],
};
