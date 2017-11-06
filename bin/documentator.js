#!/usr/bin/env node

const fs = require('fs');
const yaml = require('js-yaml');
const Documentator = require('../src/Documentator');
const yargs = require('yargs');

const { argv } = yargs
  .usage('Usage: $0 -i <doc files> [options]')
  .example('$0 -i docs -o project.html', 'generate "project.html" from "docs" folder')
  .example('$0 -i docs -c conf.yml', 'output html to STDOUT from "docs" folder and read the configuration file "conf.yml"')
  .alias('i', 'input')
  .nargs('i', 1)
  .describe('i', 'Input folder')
  .alias('o', 'output')
  .nargs('o', 1)
  .describe('c', 'Configuration file')
  .alias('c', 'config')
  .nargs('c', 1)
  .recommendCommands()
  .describe('o', 'Write in file')
  .demandOption(['i'])
  .help('h')
  .alias('h', 'help');

const confFile = argv.config || `${argv.input}/_config.yml`;
let config = {};

if (fs.existsSync(confFile)) {
  try {
    config = yaml.safeLoad(fs.readFileSync(confFile, 'utf8'));
  } catch (e) {
    console.error(e);
  }
} else if (argv.config) {
  console.log(`Configuration file "${confFile}" does not exists`);
}

const d = new Documentator(argv.input, config);

if (argv.input) {
  d.generate(argv.output);
}
