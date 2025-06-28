// jason-markdown/shared.webpack.config.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// @ts-check

'use strict';

const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');

/**
 * @typedef {import('webpack').Configuration} WebpackConfig
 */

/** @type WebpackConfig */
const commonConfig = {
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.js'],
		extensionAlias: {
			'.js': ['.ts', '.js']
		}
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [{
				loader: 'ts-loader'
			}]
		}]
	},
	externals: {
		'vscode': 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded.
	},
};

/**
 * @param {WebpackConfig} config
 * @returns {WebpackConfig}
 */
function withDefaults(config) {
	/** @type WebpackConfig */
	const newConfig = {
		...commonConfig,
		...config,
	};
	newConfig.output = {
		path: path.resolve(config.context || __dirname, 'out'),
		filename: '[name].js',
		libraryTarget: 'commonjs2',
		...config.output,
	};
	return newConfig;
}

withDefaults.nodePlugins = (context) => {
	return [
		/* new CopyPlugin({
			patterns: [
				// Add any other assets to copy here
			],
		}), */
	];
};

/**
 * @param {WebpackConfig} config
 * @returns {WebpackConfig}
 */
function browser(config, options) {
	/** @type WebpackConfig */
	const newConfig = {
		...commonConfig,
		...config,
		target: 'webworker',
	};
	newConfig.output = {
		path: path.resolve(config.context || __dirname, 'dist', 'browser'),
		filename: '[name].js',
		libraryTarget: 'commonjs',
		...config.output,
	};
	newConfig.resolve = {
		...newConfig.resolve,
		mainFields: ['browser', 'module', 'main'],
		...config.resolve,
	};
	return newConfig;
}

function browserPlugins(context) {
	return [
		/* new CopyPlugin({
			patterns: [
				// Add any other assets to copy here
			],
		}), */
	];
}


module.exports = {
	withDefaults,
	browser,
	browserPlugins,
};
