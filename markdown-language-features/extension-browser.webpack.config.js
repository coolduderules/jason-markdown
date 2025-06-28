/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

'use strict';

const CopyPlugin = require('copy-webpack-plugin');
const { browser } = require('../shared.webpack.config');

module.exports = browser({
	context: __dirname,
	resolve: {
		extensions: ['.ts', '.js'],
		fallback: {
			"path": false,
			"https": false,
			"http": false,
			"os": false,
			"crypto": false,
			"fs": false,
			"child_process": false
		}
	},
	entry: {
		extension: './src/extension.browser.ts'
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: [/node_modules/, /src\/test/],
			use: [{
				loader: 'ts-loader',
				options: {
					configFile: 'tsconfig.browser.json'
				}
			}]
		}]
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: './node_modules/vscode-markdown-languageserver/dist/browser/workerMain.js',
					to: 'serverWorkerMain.js',
				}
			],
		}),
	],
}, {
	configFile: 'tsconfig.browser.json'
});
