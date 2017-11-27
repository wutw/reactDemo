var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: path.join(__dirname),
	devtool:debug?'inline-sourcemap':null,
	entry:'./src/js/root.js',
	resolve:{
		alias:{
			'react':path.join(__dirname,'node_modules','react')
		},
		extensions:['.js','.jsx']

	},
	module:{
		loaders:[
		{
			test:/\.js?$/,
			exclude:path.resolve(__dirname,'node_modules'),
			use:{
			loader:'babel-loader',
			options:{
				presets:['react','es2015'],
				plugins:['react-html-attrs',['import',{libraryName:'antd',style:'css'}]],
			}
			}
		},
			{
				test:/\.css$/,
				use:[
				'style-loader',
				{loader:'css-loader',
				options:{
					importLoaders:1,
					modules:true,
					localIdentName:'[name]__[local]--[hash:base64:5]'}


				

			}

				]

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


}