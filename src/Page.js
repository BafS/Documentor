const yaml = require('js-yaml');
const MarkdownIt = require('markdown-it');
const { beautifyName, getBasename } = require('./helpers');

const md = new MarkdownIt();

module.exports = class Page {
  constructor(title, slug, content, options = []) {
    this.title = title;
    this.slug = slug;
    this.content = md.render(content);
    this.options = options;
  }

  /**
   * Page creator
   *
   * @static
   * @param {string} filename
   * @param {string} [content='']  content
   * @returns Page
   */
  static pageCreator(filename, content = '') {
    // Split '---' to get the optional yaml header
    const parts = content.split(/-{3,}/, 3);

    const slug = filename.replace('./', '').replace(/\.[^/.]+$/, '');
    const basename = getBasename(filename);
    const title = beautifyName(basename);

    if (parts.length === 3 && parts[0] === '') {
      const options = yaml.safeLoad(parts[1]);

      return new Page(options.title || title, slug, parts[2].trim(), options);
    }

    return new Page(title, slug, content);
  }
};
