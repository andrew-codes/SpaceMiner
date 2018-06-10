#!/usr/bin/env node

const createWebpackCompiler = require('@space-miner/webpack');

const [entry] = process.argv.slice(2);
const env = 'production';

const compiler = createWebpackCompiler({
  entry,
  env,
  publicPath: 'dist/',
});

compiler.run((error, stats) => {
  if (error) {
    throw new Error(error);
    return;
  }
  console.log(stats);
});
