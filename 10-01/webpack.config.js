var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/root.js",
  resolve:{
    alias:{
      'react':path.join(__dirname,'node_modules','react')//模块名，路径
    },//path.join将[]连接，默认/连接
    extensions:['.js','.jsx']
  },//调用框架与项目react不同会冲突出错,指定加载路径，
  //extensions对衍生的类型，用alias指定路径去查找位置
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs',
          ['import',{libraryName:'antd',style:'css'}]
          ], //添加组件的插件配置，插件css按需加载
        }
      },
      //下面是添加的 css 的 loader，也即是 css 模块化的配置方法，大家可以拷贝过去直接使用
      {
        test: /\.css$/,
        use:[
        {
          loader:'style-loader',

        },{
          loader:'css-loader'}
          ]//调用框架Ant Design对输出名不做处理
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

      }
    ]
  },
  output: {
    path: __dirname,
    filename: "./src/bundle.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
