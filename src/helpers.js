const path = require('path');

module.exports = {
  beautifyName: (name) => {
    const beautifyBase = str => str.replace(/^[0-9]+_(.+)/, '$1');

    if (name.toUpperCase() === name) {
      return beautifyBase(name);
    }

    return beautifyBase(name).replace(/(.)([A-Z])/g, (match, p1, p2) => `${p1} ${p2}`);
  },
  getBasename: filename => path.basename(filename, path.extname(filename)),
};
