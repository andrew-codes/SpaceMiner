#!/usr/bin/env node

require('babel-polyfill');
const babel = require('babel-core');
const fs = require('fs');
const glob = require('globby');
const mkdirp = require('mkdirp');
const path = require('path');
const config = {
  presets: [
    'babel-preset-env',
    'babel-preset-react',
  ],
  plugins: [
    'babel-plugin-dynamic-import-webpack',
    'babel-plugin-transform-class-properties',
    'babel-plugin-transform-object-rest-spread',
    'babel-plugin-emotion',
  ],
  env: {
    development: {
      plugins: [
        'babel-plugin-react-hot-loader/babel',
      ],
    },
  },
};

module.exports = async function build(patternsToBuild) {
  try {
    return await patternsToBuild
      .reduce(async (previousProcessedFiles, inputPattern) => {
        const paths = await glob([inputPattern]);
        const processedFiles = await paths
          .filter(filePath => !/__tests__/.test(filePath))
          .map(async filePath => {
            const transformedCode = await transform(filePath);
            const newFilePath = getNewFilePath(filePath);

            const fileWrite = await writeFile(newFilePath, transformedCode);
            return fileWrite;

          });
        const output = await previousProcessedFiles;
        return output.concat(await Promise.all(processedFiles));
      }, []);
  }
  catch (error) {
    console.log(error);

    return error;
  }
}

function transform(filePath) {
  return new Promise((resolve, reject) => {
    const absoluteFilePath = path.resolve(process.cwd(), filePath);
    babel.transformFile(absoluteFilePath, config, (error, result) => {
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

function getNewFilePath(filePath) {
  const distDestDirName = 'dist';
  return path.join(process.cwd(), distDestDirName, filePath.replace(/^src\//, ''));
}
