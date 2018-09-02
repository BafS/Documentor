const yaml = require('js-yaml');
const MarkdownIt = require('markdown-it');
const Page = require('../Page');
const { humanizesSlug, getBasename, strToSlug } = require('../helpers');

module.exports = (config) => {
  const md = new MarkdownIt(config['markdown-it']);
  const delimiter = '---';

  /**
   * Parse the content and create a page object
   * @param {string} filename
   * @param {string} [data=''] data
   * @returns Page
   */
  return (filename, data = '') => {
    const slug = strToSlug(filename);

    // Split '---' to get the optional yaml header
    const parts = data.split(delimiter);

    // If we have a yaml header
    if (parts.length >= 3 && parts[0] === '') {
      const [, optionsYaml, ...contents] = parts;
      const options = yaml.safeLoad(optionsYaml);

      const content = md.render(contents.join(delimiter));

      return new Page(options.title || optionsYaml, options.slug || slug, content, options);
    }

    const title = humanizesSlug(getBasename(filename));

    return new Page(title, slug, md.render(data));
  };
};
