#!/usr/bin/env node

const createWebpackCompiler = require('../src');

build()
  .catch(error => {
    console.error(error);
    process.exit(1)
  });

async function build() {
  const [entry] = process.argv.slice(2);
  const env = process.env.NODE_ENV || 'production';

  const compiler = createWebpackCompiler({
    entry,
    env,
    publicPath: 'dist/',
  });

  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stats);
    })
  });
}
