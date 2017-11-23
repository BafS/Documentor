# Documentor

> A super intuitive doc generator from Markdown

<center>
  <img style="max-width: 600px" src="https://i.imgur.com/wErMEKf.png" />
</center>

# Installation

```bash
npm -g i documentor
```

or with yarn: `yarn global add documentor`

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

## Configuration

- **`name`** – Name of the project. It will be the main title for the html page.
- **`version`** – Version of the project.
- **`logo`** – Main logo of the project.
- **`icon`** – Icon of the project, will typically be used for the favicon of the htmlpage.
- **`footer`** – The content of the footer.
- **`template`** – By default Documentator uses the *alchemy* template. To use a custom template path, start with `./` for a relative path or `/` for an absolute path.
  - *Example* – `template: ./mytemplate`
- **`htmlHeader`** – List of html element to add in the header
- **`htmlBody`** – List of html element to add in the body

## Dev

```bash
yarn install
```

### Test

```bash
yarn test
```
