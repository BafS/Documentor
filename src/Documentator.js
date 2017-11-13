const fs = require('fs');
const Page = require('./Page');
const { getBasename, getExtension } = require('./helpers');
const HtmlGenerator = require('./generators/HtmlGenerator');

const generators = {
  html: HtmlGenerator,
};


module.exports = class Documentator {
  constructor(dir = './', config = {}) {
    const defaultConfig = {
      extensions: ['md', 'markdown'],
      template: 'alchemy',
    };

    const systemConfig = {
      documentator_version: '0.0.1',
    };

    this.dir = dir;
    this.config = {
      ...defaultConfig,
      ...config,
      ...systemConfig,
    };
  }

  /**
   * Return an array of Page as a tree
   *
   * @param {string} pathname
   * @param {Page[]} [arr=[]]
   * @returns {Page[]}
   */
  pagesTree(pathname, arr = []) {
    const dir = fs.readdirSync(pathname);
    dir.forEach((name) => {
      const target = `${pathname}/${name}`;

      const stats = fs.statSync(target);
      if (stats.isFile() && this.config.extensions.indexOf(getExtension(name)) !== -1 && name.substr(0, 1) !== '_') {
        // Page
        const re = new RegExp(`${this.dir}\\/*`, 'g');
        arr.push(Page.pageCreator(target.replace(re, ''), fs.readFileSync(target, 'utf8')));
      } else if (stats.isDirectory() && name.substr(0, 1) !== '_') {
        const children = this.pagesTree(target);
        const indexBase = children.findIndex(page => getBasename(page.slug) === 'index');
        const page = children[indexBase] || Page.pageCreator(name);

        if (children[indexBase]) {
          children.splice(indexBase, 1);
          page.slug = page.slug.substr(0, page.slug.lastIndexOf('/index'));
        }

        arr.push({ ...page, children });
      }
    });

    return arr;
  }

  /**
   * Generate documentation
   */
  async generate(outputFile = null) {
    const pagesTree = this.pagesTree(this.dir);

    const type = getExtension(outputFile || '') || 'html';
    if (generators[type]) {
      const generator = new generators[type](this.dir, this.config);

      if (!generator.generate) {
        throw Error(`The '${type}' generator is not valid (no 'generate' method in ${generator.constructor.name})`);
      }

      const out = await generator.generate(pagesTree);

      if (!outputFile) {
        process.stdout.write(out);
        return out;
      }

      fs.writeFileSync(outputFile, out);
      return true;
    }

    return false;
  }
};
