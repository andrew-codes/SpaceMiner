#!/usr/bin/env node

const jest = require('jest-cli');
const config = require('./../jest.config');

jest.runCLI(config, [process.cwd()]);
