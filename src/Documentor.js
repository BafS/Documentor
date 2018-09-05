const fs = require('fs');
const chokidar = require('chokidar');
const { getBasename, getExtension, humanizesSlug, escapeRegExp } = require('./helpers');
const generators = require('./generators');
const parsers = require('./parsers');
const packageObj = require('../package.json');

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
  constructor(dir = '.', config = {}) {
    const defaultConfig = {
      extensions: ['md', 'markdown'],
      template: 'alchemy',
    };

    const systemConfig = {
      documentor_version: packageObj.version || '',
    };

    this.dir = dir.replace(/\/+$/, '/');
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
    const parser = parsers.markdown(this.config);
    dir.forEach((name) => {
      const target = `${pathname}/${name}`;

      const stats = fs.statSync(target);
      if (stats.isFile() && this.config.extensions.indexOf(getExtension(name)) !== -1 && name.substr(0, 1) !== '_') {
        // Page
        let pageTarget = target;
        if (target.indexOf(this.dir) === 0) {
          const re = new RegExp(`^${this.dir}\\/*`, '');
          pageTarget = target.replace(re, '');
        }

        arr.push(parser(pageTarget, fs.readFileSync(target, 'utf8')));
      } else if (stats.isDirectory() && name.substr(0, 1) !== '_') {
        const children = this.pagesTree(target);
        const indexBase = children.findIndex(page => getBasename(page.slug) === 'index');
        const page = children[indexBase] || parser(name);

        if (children[indexBase]) {
          children.splice(indexBase, 1);
          page.slug = page.slug.substr(0, page.slug.lastIndexOf('/index'));
          if (page.title === 'index') {
            page.title = humanizesSlug(name);
          }
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
    let additionalRegex = '';
    if (outputFile.startsWith(this.dir)) {
      const fileLastPart = outputFile.substr(this.dir.length);
      additionalRegex = `|${escapeRegExp(fileLastPart)}`;
    }

    const watcher = chokidar.watch([this.dir], {
      ignored: new RegExp(`(^|[/\\\\])\\..|\\.ya?ml${additionalRegex}$`),
      persistent: true,
      ignoreInitial: true,
    });

    const generatorObj = this.generatorObject(outputFile);
    const generatorFn = await generatorObj.generate();
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

    const out = (await generatorObj.generate())(pagesTree);

    return output(outputFile, out);
  }
};
