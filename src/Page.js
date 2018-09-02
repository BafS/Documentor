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
    this.content = content;
    this.options = options;
  }
};
