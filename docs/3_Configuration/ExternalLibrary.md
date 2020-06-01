External libraries can be loaded easily from the configuration (or a custom template), here is some
examples using CDNs.


# Syntax Highlighting

You can add code coloration for code blocks with javascript libraries.

Use the configuration `htmlHeader` to add the CSS in the header and `htmlBody` to run the javascript in the body.

### Example with Highlightjs

For example with [highlightjs](https://highlightjs.org/) you can simply add the css and javascript
from their CDN.

```yaml
# In `_config.yml`
htmlHeader:
  - <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/default.min.css">
htmlBody:
  - <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/highlight.min.js"></script>
  - <script>hljs.initHighlightingOnLoad();</script>
```

# Math Support

There is many libraries to add math support, like [KaTeX](https://github.com/KaTeX/KaTeX) and [MathJax](https://www.mathjax.org/).

### Example with KaTeX

Follow [the documentation](https://github.com/KaTeX/KaTeX) and add the right css/javascript from
their CDN.

With the basic configuration, you will be able to type latex formulas between `$$`.

Example: `$$c = \\pm\\sqrt{a^2 + b^2}$$`

```yaml
# In `_config.yml`
htmlHeader:
  - <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11/dist/katex.min.css" integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossorigin="anonymous">
htmlBody:
  - <script defer src="https://cdn.jsdelivr.net/npm/katex@0.11/dist/katex.min.js" integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz" crossorigin="anonymous"></script>
  - <script defer src="https://cdn.jsdelivr.net/npm/katex@0.11/dist/contrib/auto-render.min.js" integrity="sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI" crossorigin="anonymous"
        onload="renderMathInElement(document.body);"></script>
```

> Note: The library is not loaded in this documentation


# Diagrams Support

### Example with Mermaid

You can use [Mermaid](https://github.com/mermaid-js/mermaid) to create diagrams from text, with this
example you need to add the "mermaid" language on code blocks.

```
```mermaid
graph LR
    A --- B
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
``​`
```

```yaml
# In `_config.yml`
htmlBody:
  - <script src="https://unpkg.com/mermaid@8.5/dist/mermaid.min.js"></script>
  - <script>mermaid.init({startOnLoad:true}, '.language-mermaid');</script>
```

> Note: The library is not loaded in this documentation
