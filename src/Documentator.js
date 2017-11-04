const fs = require('fs');
const babel = require('babel-core');
const Handlebars = require('handlebars');
const postcss = require('postcss');
const cssNext = require('postcss-cssnext');
const Page = require('./Page');
const { getBasename, getExtension } = require('./helpers');

module.exports = class Documentator {
  constructor(dir = './', config = {}) {
    const coreConfig = {
      documentator_version: '0.0.1',
    };

    this.dir = dir;
    this.config = {
      ...config,
      ...coreConfig,
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
      if (stats.isFile() && name.slice(-3) === '.md' && name.substr(0, 1) !== '_') {
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
   * Html generator
   *
   * @param {Page[]} pages
   * @returns {string} Html
   */
  async generateHtml(pages) {
    const javascript = babel.transformFileSync('./templates/main.js', {
      minified: true,
      presets: ['es2015'],
    }).code;

    let logo;
    if (this.config.logo && fs.existsSync(`${this.dir}/${this.config.logo}`)) {
      const data = fs.readFileSync(`${this.dir}/${this.config.logo}`);
      const ext = getExtension(this.config.logo).substr(1);
      const base64data = Buffer.from(data).toString('base64');
      logo = `data:image/${ext};base64,${base64data}`;
    }

    let css;
    if (fs.existsSync('templates/style.css')) {
      const style = fs.readFileSync('templates/style.css', 'utf8');
      css = await postcss([cssNext]).process(style).css;
    }

    const templateRaw = fs.readFileSync('./templates/base.html', 'utf8');
    const template = Handlebars.compile(templateRaw);
    return template({
      ...this.config,
      logo,
      pages,
      css,
      javascript,
    });
  }

  }

  /**
   * Generate documentation
   */
  generate() {
    const pagesTree = this.pagesTree(this.dir);
    return this.generateHtml(pagesTree);
  }
};
