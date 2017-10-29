const fs = require('fs');
const Handlebars = require('handlebars');
const Page = require('./Page');
const { getBasename } = require('./helpers');

module.exports = class Documentator {
  constructor(dir = './', config = {}) {
    this.dir = dir;
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
          const re = new RegExp(`${this.dir}\\/*`, 'g');
          arr.push(Page.pageCreator(target.replace(re, ''), fs.readFileSync(target, 'utf8')));
        }
      } else if (stats.isDirectory()) {
        const children = this.pagesTree(target);
        const indexBase = children.findIndex(page => getBasename(page.slug) === 'index');
        const page = children[indexBase] || Page.pageCreator(name);

        if (children[indexBase]) {
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
    const pagesTree = this.pagesTree(this.dir);
    return this.generateHtml(pagesTree);
  }
};
