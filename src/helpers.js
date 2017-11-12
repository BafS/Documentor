const fs = require('fs');
const path = require('path');

const helpers = {
  beautifySlug: slug => slug.replace(/^[0-9]+_(.+)/, '$1'),
  beautifyName: (name) => {
    if (name.toUpperCase() === name) {
      return helpers.beautifySlug(name);
    }

    return helpers.beautifySlug(name).replace(/(.)([A-Z])/g, (match, p1, p2) => `${p1} ${p2}`);
  },
  getExtension: filename => path.extname(filename),
  getBasename: filename => path.basename(filename, path.extname(filename)),
  exists: async filePath => (
    new Promise((resolve, reject) => {
      fs.stat(filePath, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
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
