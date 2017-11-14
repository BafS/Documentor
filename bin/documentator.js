#!/usr/bin/env node

const fs = require('fs');
const yaml = require('js-yaml');
const Documentator = require('../src/Documentator');
const yargs = require('yargs');

console.time('time generation');

const { argv } = yargs
  .usage('Usage: $0 -i <doc files> [options]')
  .example('$0 -i docs -o project.html', 'generate "project.html" from "docs" folder')
  .example('$0 -i docs -c conf.yml', 'output html to STDOUT from "docs" folder and read the configuration file "conf.yml"')
  .alias('i', 'input')
  .nargs('i', 1)
  .describe('i', 'Input folder')
  .alias('o', 'output')
  .nargs('o', 1)
  .describe('o', 'Write in file')
  .recommendCommands()
  .alias('c', 'config')
  .nargs('c', 1)
  .describe('c', 'Configuration file')
  .alias('w', 'watch')
  .nargs('w', 0)
  .describe('w', 'Watch docs files with partial generation')
  .alias('v', 'verbose')
  .nargs('v', 0)
  .describe('v', 'Configuration file')
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
  if (argv.watch) {
    console.log(`Watch files in '${argv.input}'`);
    d.watch(argv.output, (type, pathname) => {
      if (pathname) {
        console.log(`[${type}] ${pathname}`);
      } else {
        console.log(type);
      }
    });
  } else {
    const res = d.generate(argv.output);
    if (argv.verbose) {
      res.then(() => {
        console.timeEnd('time generation');
      });
    }
  }
}
