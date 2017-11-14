# Documentor

> A super intuitive doc generator from Markdown

### Command Line Usage

- **`-i`**, **`--input`**: Input folder (optional flag)
- **`-o`**, **`--output`**: Write in file
- **`-c`**, **`--config`**: Configuration file
- **`-w`**, **`--watch`**: Watch docs files with partial generation
- **`-v`**, **`--verbose`**: Configuration file
- **`--var`**, **`--variable`**: Set or override config variable(s)
- **`-h`**, **`--help`**: Show help

#### Examples

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

### Dev

```bash
yarn install
```

// TODO

#### Test
