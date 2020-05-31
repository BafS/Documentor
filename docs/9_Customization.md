You can customize the style or structure by creating your own template.

```bash
documentor ./docs -o out.html --var.template "./myTemplate"
```

A template is composed of html, javascript and css. The structure of the template needs to be the following:

```
.
└── myTemplate
    ├── base.html
    ├── main.js
    └── style.css
```

The javascript and css files are optional. To begin, check how the build-in template is made in the [templates/alchemy](https://github.com/BafS/Documentor/tree/master/templates/alchemy) folder.

## Html

The html use [Handlebar](http://handlebarsjs.com/) as a template, Handlebars is largely compatible with Mustache templates.

## Style (css)

Documentor uses Postcss with [cssnext](http://cssnext.io/). You can thus uses the [features](http://cssnext.io/features/) of cssnext.

## Javascript

Javascript is transpiled with [Babel](https://babeljs.io/) to ECMAScript 5. You can use ECMAScript 6, modules, fat arrow etc.
