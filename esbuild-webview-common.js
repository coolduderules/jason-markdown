/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// @ts-check
const esbuild = require('esbuild');

/**
 * @typedef {import('esbuild').BuildOptions} BuildOptions
 * @typedef {import('esbuild').BuildContext} BuildContext
 */

/**
 * @param {BuildOptions} defaultOptions
 * @param {string[]} args
 * @param {(outdir: string) => void} [postBuild]
 */
function run(defaultOptions, args, postBuild) {
	const watch = args.includes('--watch');

	const outdir = defaultOptions.outdir;
	if (!outdir) {
		throw new Error('outdir is required');
	}

	/** @type {BuildOptions} */
	const options = {
		...defaultOptions,
		bundle: true,
		format: 'iife',
		platform: 'browser',
	};

	if (watch) {
		esbuild.context(options).then(async (ctx) => {
			await ctx.watch();
			console.log('watching...');
		}).catch((error) => {
			console.error('watch setup failed:', error);
			require('process').exit(1);
		});
	} else {
		esbuild.build(options).then(() => {
			console.log('build succeeded.');
			if (postBuild) {
				postBuild(outdir);
			}
		}).catch((error) => {
			console.error('build failed:', error);
			require('process').exit(1);
		});
	}
}

module.exports = { run };