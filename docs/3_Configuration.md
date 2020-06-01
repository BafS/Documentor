By default, Documentor will read `_config.yml` in the root folder of the documentation but you can pass `-c` or `--config` to use your own config path (see the [Command Line Usage](#2_Usage/0_CommandLine) for more information).

# Options

- **`name`** – Name of the project. It will be the main title for the html page.
- **`version`** – Version of the project.
- **`homepageUrl`** – Homepage of the project
- **`logo`** – Main logo of the project.
- **`icon`** – Icon of the project, will typically be used for the favicon of the html page.
- **`footer`** – The content of the footer.
- **`template`** – By default Documentor uses the *alchemy* template. To use a custom template path, start with `./` for a relative path or `/` for an absolute path.
  - *Example* – `template: ./mytemplate`
- **`htmlHeader`** – List of html element to add in the header
- **`htmlBody`** – List of html element to add in the body
- **`markdown-it`** – You can specified some options to the parser. Please read [Markdown-it doc](https://github.com/markdown-it/markdown-it#init-with-presets-and-options) for
  more info.

All fields are optionals.

## Example of a Configuration File

```js
name: Documentor
version: 1.0.0
logo: _assets/logo.png
icon: _assets/icon.png
```
