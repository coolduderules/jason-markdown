/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

'use strict';

const CopyPlugin = require('copy-webpack-plugin');
const { withDefaults } = require('../shared.webpack.config');

module.exports = withDefaults({
	context: __dirname,
	resolve: {
		extensions: ['.ts', '.js'],
		mainFields: ['module', 'main'],
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
		extension: './src/extension.ts',
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: [/node_modules/, /src\/test/],
			use: [{
				loader: 'ts-loader',
				options: {
					configFile: 'tsconfig.json'
				}
			}]
		}]
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: './node_modules/vscode-markdown-languageserver/dist/node/workerMain.js',
					to: 'serverWorkerMain.js',
				}
			],
		}),
	],
});
