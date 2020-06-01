<a href="https://bafs.github.io/Documentor" target="_blank"><img width="550"
src="https://i.imgur.com/j8Bh0cv.png"/></a>

> A super intuitive doc generator from Markdown files

# Installation

```sh
npm -g i documentor
```

or for yarn users: `yarn global add documentor`

## Quick Usage

```sh
documentor init  # initialisation of the documentation
```

```sh
documentor ./docs-folder -o output.html  # render the documentation to output.html
```

![https://i.imgur.com/whek9Zm.png](https://i.imgur.com/whek9Zm.png)

# [Documentation](http://bafs.github.io/Documentor)

Please check the [**documentation**](http://bafs.github.io/Documentor) for more details.

## Command Line Usage

- **`-i`**, **`--input`**: Input folder (optional flag)
- **`-o`**, **`--output`**: Write in file
- **`-t`**, **`--to`**: Output format
- **`-c`**, **`--config`**: Configuration file
- **`-w`**, **`--watch`**: Watch docs files with partial generation
- **`-v`**, **`--verbose`**: Configuration file
- **`--var`**, **`--variable`**: Set or override config variable(s)
- **`-h`**, **`--help`**: Show help

### Examples

Generate `project.html` from `./docs` folder

```sh
documentor ./docs -o out.html
```

Output html to STDOUT from `./docs` folder and read the configuration file `conf.yml`

```sh
documentor docs -c conf.yml
```

Generate "out.html" with a custom name and footer

```sh
documentor ./docs -o out.html --var.name "My Project" --var.footer "(c) Project 1.0"
```

Watch the "docs" folder and regenerate "out.html" on change

```sh
documentor docs -o out.html -w
```

## Dev

```sh
npm i
```

You can run the CLI version with `node bin/documentor.js`, for example `node bin/documentor.js ./docs -o out.html`.

### Test

```sh
npm test
```

# Screenshot

<p align="center"><a href="https://bafs.github.io/Documentor" target="_blank"><img width="600" src="https://i.imgur.com/wErMEKf.png"/></a></p>

#### TODO

 - [ ] Embed images from markdown
 - [ ] Add processing indicator
