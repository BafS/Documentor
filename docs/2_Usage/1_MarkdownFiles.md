# File Structure

Documentor will list all markdown file with the .md or .markdown extension to create pages of the documentation.

To *hide* a file from the listing, you can prefix the file with an underscore (eg. `_hideMe.md`).

The pages are *sorted* alphabetically. To sort your pages manually you can prefix a number followed by an underscore (eg. `0_Introduction`, `1_HowToUse`, etc.).

It is possible to have sub pages by creating sub files in a folder. The folder name will be seen as an empty page. To add content to this page, you can name your file `index.md`.

The title of the page is generated from the file name. The file name will be decamelized (eg. *MySuperTitle* will become *My Super Title*).

### Example

```bash
.
└── docs
    ├── _config.yml        # Optional configuration
    ├── 0_Introduction.md
    ├── _todo.md           # This will not be listed in the documentation
    └── Basics
        ├── index.md       # This will be seen as the "Basics" page
        ├── 0_Action.md
        └── 1_Reaction.md
```


# Markdown Files Header

If you want to force a specific title you can simply add the `title` variable in the head of your markdown file.

Example

```md
---
title: Introduction
---

Lorem ipsum...
```
