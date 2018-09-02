const fs = require('fs');
const path = require('path');

const helpers = {
  strToSlug: str => (
    str
      .replace(/^\.\//, '')
      .replace(/\.[^/.]+$/, '')
      .replace(/ /g, '')
  ),

  removeLeadingNumber: slug => slug.replace(/^[0-9]+_(.+)/, '$1'),

  humanizesSlug: name => (
    helpers
      .removeLeadingNumber(name)
      .replace(/_/g, ' ')
      .trim()
      .replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2}`)
  ),

  getExtension: filename => path.extname(filename).substr(1),

  getBasename: filename => path.basename(filename, path.extname(filename)),

  exists: async filePath => (
    new Promise((resolve, reject) => {
      fs.stat(filePath, (err, stats) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stats);
      });
    })
  ),

  readFile: async (filePath, options) => (
    new Promise((resolve, reject) => {
      fs.readFile(filePath, options, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    })
  ),

  escapeRegExp: str => (
    // https://github.com/sindresorhus/escape-string-regexp
    str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
  ),
};

module.exports = helpers;
