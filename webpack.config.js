const path = require('path');

module.exports = {
	mode: 'production',
	entry: __dirname + '/ts-serializer',
	resolve: {
		extensions: ['.ts']
	},
	output: {
		filename: 'ts-serializer.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: 'ts-loader',
				exclude: [/node_modules/]
			}
		]
	}
};