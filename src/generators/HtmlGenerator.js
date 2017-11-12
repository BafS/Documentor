const fs = require('fs');
const babel = require('babel-core');
const Handlebars = require('handlebars');
const postcss = require('postcss');
const cssNext = require('postcss-cssnext');
const { getExtension, readFile } = require('../helpers');

module.exports = class HtmlGenerator {
  /**
   * Constructor
   * @param {string} dir
   * @param {object} config
   */
  constructor(dir, config) {
    this.dir = dir;
    this.config = config;
    this.templatePath = `./templates/${config.template}`;
  }

  /**
   * Generate javascript
   */
  async generateJavascript() {
    if (fs.existsSync(`${this.templatePath}/main.js`)) {
      return new Promise((resolve, reject) => {
        babel.transformFile(`${this.templatePath}/main.js`, {
          minified: true,
          presets: ['es2015'],
        }, (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.code);
        });
      });
    }

    return false;
  }

  /**
   * Generate style
   */
  async generateStyle() {
    if (fs.existsSync(`${this.templatePath}/style.css`)) {
      const style = await readFile(`${this.templatePath}/style.css`, 'utf8');
      return postcss([cssNext]).process(style).css;
    }

    return false;
  }

  /**
   * Generate logo
   */
  async generateLogo() {
    if (this.config.logo && fs.existsSync(`${this.dir}/${this.config.logo}`)) {
      const data = fs.readFileSync(`${this.dir}/${this.config.logo}`);
      const ext = getExtension(this.config.logo).substr(1);
      const base64data = Buffer.from(data).toString('base64');
      return `data:image/${ext};base64,${base64data}`;
    }

    return false;
  }

  /**
   * Html generator
   *
   * @param {Page[]} pages
   * @returns {Promise<string>} Html
   */
  async generate(pages) {
    const [templateRaw, logo, css, javascript] = await Promise.all([
      readFile(`${this.templatePath}/base.html`, 'utf8'),
      this.generateLogo(),
      this.generateStyle(),
      this.generateJavascript(),
    ]);

    const template = Handlebars.compile(templateRaw);

    return template({
      ...this.config,
      logo,
      pages,
      css,
      javascript,
    });
  }
};
