#!/usr/bin/env node

require('babel-polyfill');
const babel = require('babel-core');
const fs = require('fs');
const glob = require('globby');
const mkdirp = require('mkdirp');
const path = require('path');
const config = require('../src');

build()
  .catch(error => process.exit(error));

async function build() {
  const params = process.argv.slice(2);
  const pkgDirectories = params.slice(0, -1);
  const distDestDirName = params[params.length - 1];

  return await pkgDirectories
    .reduce(async (previousProcessedFiles, pkgDir) => {
      const globPattern = `${pkgDir}/src/**/*.js`;
      const paths = await glob([globPattern]);
      const output = await previousProcessedFiles;
      const processedFiles = await paths
        .filter(filePath => !filePath.match(/__tests__/))
        .map(async filePath => {
          const transformedCode = await transform(filePath);
          const newFilePath = path.join(process.cwd(), pkgDir, distDestDirName, filePath.replace(`${pkgDir}/src`, ''));

          const fileWrite = await writeFile(newFilePath, transformedCode);
          return fileWrite;

        });
      return output.concat(await Promise.all(processedFiles));
    }, []);
  return await Promise.all(o);
}

function transform(filePath) {
  return new Promise((resolve, reject) => {
    babel.transformFile(filePath, config, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result.code);
    });
  });
}

function writeFile(filePath, contents) {
  return new Promise((resolve, reject) => {
    mkdirp(path.dirname(filePath), (dirCreationError) => {
      if (dirCreationError) {
        reject(dirCreationError);
        return;
      }
      fs.writeFile(filePath, contents, 'utf-8', writeError => {
        if (writeError) {
          reject(writeError);
          return;
        }
        resolve(true);
      });
    });
  });
}
