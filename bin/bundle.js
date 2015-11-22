#!/usr/bin/env node
'use strict';
const ENTRY = __dirname + '/../src/app.js';
const DESTINATION = __dirname + '/../dist/www/bundle.js';

const fs = require('fs');
const browserify = require('browserify');
const babelify = require('babelify');

const b = browserify();
b.transform(babelify, {
	presets: [
		'babel-preset-es2015',
		'babel-preset-react',
		'babel-preset-stage-0',
	],
});

b.add(ENTRY);

const s = b.bundle();
const out = fs.createWriteStream(DESTINATION);

out.on('finish', () => {
	console.log('Bundle sucessfully built');
});

out.on('err', err => {
	console.error('Got bundle error', err);
	process.exit(1);
});

s.pipe(out);
