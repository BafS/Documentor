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

    if (config.template.substr(0, 2) === './' || config.template.substr(0, 1) === '/') {
      this.templatePath = config.template;
    } else {
      this.templatePath = `./templates/${config.template}`;
    }

    if (!fs.existsSync(`${this.templatePath}/base.html`)) {
      throw Error(`Template '${this.templatePath}' is not a valid template`);
    }
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
   * Generate an inline image
   * @param {string} imagePath
   * @returns {Promise<string>} base64 image data
   */
  async generateImage(imagePath) {
    if (imagePath && fs.existsSync(`${this.dir}/${imagePath}`)) {
      const data = await readFile(`${this.dir}/${imagePath}`);
      const ext = getExtension(imagePath);
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
    const [templateRaw, logo, icon, css, javascript] = await Promise.all([
      readFile(`${this.templatePath}/base.html`, 'utf8'),
      this.generateImage(this.config.logo),
      this.generateImage(this.config.icon),
      this.generateStyle(),
      this.generateJavascript(),
    ]);

    const template = Handlebars.compile(templateRaw);

    return template({
      ...this.config,
      logo,
      icon,
      pages,
      css,
      javascript,
    });
  }
};
