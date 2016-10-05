const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
	entry: __dirname + '/ts-serializer',
	resolve: {
		extensions: ['.ts']
	},
	output:{
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: 'ts-serializer.js',
		libraryTarget: 'umd',
		library: 'TSerializer'
	},
	module: {
		loaders:[{
			test: /\.ts?$/,
			loader: 'ts',
			exclude: [/node_modules/]
		}]
	},
	plugins:[
		new CleanWebpackPlugin(['dist'], {
			verbose: true
		})
	]
};