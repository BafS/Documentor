const fs = require('fs');
const babel = require('@babel/core');
const Handlebars = require('handlebars');
const postcss = require('postcss');
const path = require('path');
const cssNext = require('postcss-cssnext');
const { getExtension, readFile } = require('../helpers');

module.exports = class {
  /**
   * Constructor
   * @param {string} dir
   * @param {{}} config
   */
  constructor(dir, config) {
    this.dir = dir;
    this.config = config;

    if (config.template.substr(0, 2) === './' || config.template.substr(0, 1) === '/') {
      this.templatePath = config.template;
    } else {
      const basePath = path.join(__dirname, '..', '..');
      this.templatePath = `${basePath}/templates/${config.template}`;
    }

    if (!fs.existsSync(`${this.templatePath}/base.html`)) {
      throw Error(`Template '${this.templatePath}' is not a valid template folder`);
    }
  }

  /**
   * Generate javascript
   * @private
   * @returns {Promise<string>}
   */
  async generateJavascript() {
    if (fs.existsSync(`${this.templatePath}/main.js`)) {
      return new Promise((resolve, reject) => {
        babel.transformFile(`${this.templatePath}/main.js`, {
          minified: true,
          presets: ['@babel/preset-env'],
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
   * @private
   * @returns {Promise<string>}
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
   * @private
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
   * Get template data
   * @private
   * @returns {{}}
   */
  async templateData() {
    const [logo, icon, css, javascript] = await Promise.all([
      this.generateImage(this.config.logo),
      this.generateImage(this.config.icon),
      this.generateStyle(),
      this.generateJavascript(),
    ]);

    return {
      ...this.config,
      logo,
      icon,
      css,
      javascript,
    };
  }

  /**
   * Html generator
   * @returns {Promise<(pages: Page[]) => string>}
   */
  async generator() {
    const templateRaw = await readFile(`${this.templatePath}/base.html`, 'utf8');
    const template = Handlebars.compile(templateRaw);
    const data = await this.templateData();

    return pages => template({ ...data, pages });
  }
};
