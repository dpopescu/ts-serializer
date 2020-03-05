const path = require('path');

module.exports = {
	entry: __dirname + '/ts-serializer',
	mode: 'production',
	devtool: 'inline-source-map',
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	  },
	output:{
		globalObject: 'this',
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: 'ts-serializer.js',
		libraryTarget: 'umd',
		library: 'TSerializer'
	},
	module: {
		rules: [
			{
			  test: /\.tsx?$/,
			  use: 'ts-loader',
			  exclude: /node_modules/
			}
		  ]
	}
};