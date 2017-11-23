const fs = require('fs');
const chokidar = require('chokidar');
const Page = require('./Page');
const { getBasename, getExtension } = require('./helpers');
const HtmlGenerator = require('./generators/HtmlGenerator');

const generators = {
  html: HtmlGenerator,
};

const output = (outputFile, out) => {
  if (!outputFile) {
    process.stdout.write(out);
    return out;
  }

  fs.writeFileSync(outputFile, out);
  return true;
};

module.exports = class Documentor {
  /**
   * Documentor constructor
   * @param {string} dir
   * @param {{}} config
   */
  constructor(dir = './', config = {}) {
    const defaultConfig = {
      extensions: ['md', 'markdown'],
      template: 'alchemy',
    };

    const systemConfig = {
      documentor_version: '0.0.5',
    };

    // Add the last slash if needed
    this.dir = `${dir.replace(/\/+$/, '')}/`;
    this.config = {
      ...defaultConfig,
      ...config,
      ...systemConfig,
    };
  }

  /**
   * Return an array of Page as a tree
   * @private
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
   * Returns the Generator object
   * @private
   * @param {string} outputFile
   * @returns {HtmlGenerator}
   */
  generatorObject(outputFile) {
    const type = getExtension(outputFile || '') || 'html';
    if (generators[type]) {
      const generatorObj = new generators[type](this.dir, this.config);

      if (!generatorObj.generator) {
        throw Error(`The '${type}' generator is not valid (no 'generator' method in ${generatorObj.constructor.name})`);
      }

      return generatorObj;
    }

    return false;
  }

  /**
   * Watch source files to do partial generation when possible
   * @param {string} outputFile
   * @param {(type: string, pathname: string, generation: Promise<void>) => {}} callback
   */
  async watch(outputFile, callback) {
    const watcher = chokidar.watch([this.dir], {
      ignored: /(^|[/\\])\../,
      persistent: true,
      ignoreInitial: true,
    });

    const generatorObj = this.generatorObject(outputFile);
    const generatorFn = await generatorObj.generator();
    const regenerate = () => generatorFn(this.pagesTree(this.dir));

    const onChange = (type, pathname = null) => {
      const generation = new Promise((resolve, reject) => {
        const out = regenerate();
        if (output(outputFile, out)) {
          resolve();
          return;
        }
        reject();
      });

      callback(type, pathname, generation);
    };

    onChange('First generation');

    watcher
      .on('add', pathname => onChange('add', pathname))
      .on('change', pathname => onChange('change', pathname))
      .on('unlink', pathname => onChange('unlink', pathname));
  }

  /**
   * Generate documentation
   * @returns {Promise<string>}
   */
  async generate(outputFile = null) {
    const generatorObj = this.generatorObject(outputFile);

    const pagesTree = this.pagesTree(this.dir);

    const out = (await generatorObj.generator())(pagesTree);

    return output(outputFile, out);
  }
};
