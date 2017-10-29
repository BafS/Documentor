const fs = require('fs');
const Handlebars = require('handlebars');
const Page = require('./Page');
const { getBasename } = require('./helpers');

module.exports = class Documentator {
  constructor(config = {}) {
    this.config = config;
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
      if (stats.isFile()) {
        if (name.slice(-3) === '.md') {
          // Page
          arr.push(Page.pageCreator(target, fs.readFileSync(target, 'utf8')));
        }
      } else if (stats.isDirectory()) {
        const children = this.pagesTree(target);
        const indexBase = children.findIndex(page => getBasename(page.slug) === 'index');
        const page = children[indexBase] || null;

        if (page) {
          // page.slug = name;
          children.splice(indexBase, 1);
        }

        arr.push({ ...page, children });
      }
    });

    return arr;
  }

  /**
   * Html generator
   *
   * @param {Page[]} pages
   * @returns {string} Html
   */
  generateHtml(pages) {
    const templateRaw = fs.readFileSync('./templates/base.html', 'utf8');
    const template = Handlebars.compile(templateRaw);
    return template({ ...this.config, pages });
  }

  /**
   * Generate documentation
   */
  generate() {
    const pagesTree = this.pagesTree('./docs');
    return this.generateHtml(pagesTree);
  }
};
