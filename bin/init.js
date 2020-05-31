/* eslint no-console: 0 */

const fs = require('fs');
const yaml = require('js-yaml');
const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name of your documentation',
  },
  {
    type: 'input',
    name: 'version',
    message: 'Documentation version',
    default: '1.0.0',
  },
];

const contentFirstFile = `## Welcome to your brand new documentation

To render this documentation (in index.html) run

\`\`\`bash
documentator ./{dir} -o index.html
\`\`\`
`;

module.exports = () => {
  inquirer.prompt(questions)
    .then((ans) => {
      const dirName = ans.name.replace(' ', '_');

      if (fs.existsSync(dirName)) {
        throw new Error(`Directory '${dirName}' already exists`);
      }
      fs.mkdirSync(dirName);

      fs.writeFileSync(`${dirName}/_config.yml`, yaml.safeDump(ans));
      fs.writeFileSync(`${dirName}/Introduction.md`, contentFirstFile.replace('{dir}', dirName));

      console.log(`> You can now run 'documentor ./${dirName} -o index.html' to render your documentation.`);
    });
};
