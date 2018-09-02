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


# Markdown Files

Markdown support the [CommonMark spec](https://spec.commonmark.org/) and table (GFM).

## Header

An optional header can be specified to override predefined variables.

The header must be the on top on the files, separated by `---`, in a [yaml](http://yaml.org/) format.

### Available variables

| Variable   | Default                              | Description                                  |
|------------|--------------------------------------|----------------------------------------------|
| `title`    | File name, decamelized with caps     | Set a specific title                         |
| `slug`     | File name                            | To define the slug in the url (after the `#`) |

### Example

```md
---
title: Introduction
slug: intro
---

Lorem ipsum...
```
