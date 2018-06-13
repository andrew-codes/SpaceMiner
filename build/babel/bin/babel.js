#!/usr/bin/env node

const build = require('../src').build;

const patternsToBuild = process.argv.slice(2);

build(patternsToBuild)
  .catch(error => process.exit(error));
