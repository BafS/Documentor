const yaml = require('js-yaml');
const MarkdownIt = require('markdown-it');
const { humanizesSlug, getBasename, strToSlug } = require('./helpers');

const md = new MarkdownIt();

module.exports = class Page {
  /**
   * Constructor
   * @param {string} title
   * @param {string} slug
   * @param {string} content
   * @param {array} options
   */
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
   * @param {string} [data=''] data
   * @returns Page
   */
  static pageCreator(filename, data = '') {
    const slug = strToSlug(filename);

    // Split '---' to get the optional yaml header
    const parts = data.split(/-{3,}/, 3);

    if (parts.length === 3 && parts[0] === '') {
      const [, title, content] = parts;
      const options = yaml.safeLoad(title);

      return new Page(options.title || title, slug, content, options);
    }

    const title = humanizesSlug(getBasename(filename));

    return new Page(title, slug, data);
  }
};
