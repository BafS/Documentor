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
      .replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2}`)
  ),
  getExtension: filename => path.extname(filename),
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
};

module.exports = helpers;
