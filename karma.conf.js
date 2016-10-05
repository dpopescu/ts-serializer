module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', 'karma-typescript'],
		plugins: [
			require('karma-typescript'),
			require('karma-jasmine'),
			require('karma-phantomjs-launcher'),
			require('karma-mocha-reporter'),
			require('karma-html-reporter')
		],
		files: [
			{ pattern: './src/**/*.ts', watched: false }
		],
		preprocessors: {
			'./src/**/*.ts': ['karma-typescript']
		},
		htmlReporter: {
			outputDir: 'site/reports/tests',
			focusOnFailures: true,
			namedFiles: false,
			pageTitle: 'TS Serializer Test Results',
			urlFriendlyName: false,
			preserveDescribeNesting: true,
			foldAll: true,
			reportName: 'unit-tests-results'
		},
		karmaTypescriptConfig: {
			reports: {
				"html": "site/reports/coverage"
			}
		},
		reporters: ['mocha', 'karma-typescript', 'html'],
		colors: true,
		logLevel: config.LOG_INFO,
		browsers: ['PhantomJS'],
		singleRun: true
	});
};
