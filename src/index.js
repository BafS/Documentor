const fs = require('fs');
const yaml = require('js-yaml');
const Documentator = require('./Documentator');

let config = {};

if (fs.existsSync('./docs/config.yml')) {
  try {
    config = yaml.safeLoad(fs.readFileSync('./docs/config.yml', 'utf8'));
  } catch (e) {
    console.error(e);
  }
}

const d = new Documentator('./docs', config);
const html = d.generate();
console.log(html);
