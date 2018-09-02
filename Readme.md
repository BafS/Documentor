<a href="https://bafs.github.io/Documentor" target="_blank"><img width="560" src="https://i.imgur.com/6Gjb6Gz.png" /></a>

> A super intuitive doc generator from Markdown files

# Installation

```bash
npm -g i documentor
```

or for yarn users: `yarn global add documentor`

## Quick Usage

```bash
documentor init  # initialisation of the documentation
```

```bash
documentor ./docs-folder -o output.html  # render the documentation to output.html
```

# [Documentation](http://bafs.github.io/Documentor)

Please check the [**documentation**](http://bafs.github.io/Documentor) for more details.

## Command Line Usage

- **`-i`**, **`--input`**: Input folder (optional flag)
- **`-o`**, **`--output`**: Write in file
- **`-c`**, **`--config`**: Configuration file
- **`-w`**, **`--watch`**: Watch docs files with partial generation
- **`-v`**, **`--verbose`**: Configuration file
- **`--var`**, **`--variable`**: Set or override config variable(s)
- **`-h`**, **`--help`**: Show help

### Examples

Generate `project.html` from `./docs` folder

```bash
documentor ./docs -o out.html
```

Output html to STDOUT from `./docs` folder and read the configuration file `conf.yml`

```bash
documentor docs -c conf.yml
```

Generate "out.html" with a custom name and footer

```bash
documentor ./docs -o out.html --var.name "My Project" --var.footer "(c) Project 1.0"
```

Watch the "docs" folder and regenerate "out.html" on change

```bash
documentor docs -o out.html -w
```

## Dev

```bash
yarn install
```

### Test

```bash
yarn test
```

# Screenshot

<p align="center"><a href="https://bafs.github.io/Documentor" target="_blank"><img width="600" src="https://i.imgur.com/wErMEKf.png" /></a></p>

#### TODO

 - [ ] Embed images from markdown
