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
};

module.exports = helpers;
