# parcel-plugin-gas-imports

![Version](https://img.shields.io/npm/v/parcel-plugin-gas-imports)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: VladoDev](https://img.shields.io/twitter/follow/VladoDev.svg?style=social)](https://twitter.com/VladoDev)

> 🔥 Parcel plugin that enables bundling of Google App Script HTML.

_This is the plugin for Parcel v1. The plugin for the second version can be found [here](https://github.com/VladimirMikulic/parcel-reporter-gas-imports)._

## 📚 Introduction

If you've ever developed an add-on for Google's Office Suite with Google Apps Script,
then you'll know how inefficient it is to develop your add-on's UI.
This is because Google's Apps Script supports only .gs and .html files.
If you want to use CSS and JS, the only option is to create an HTML file and wrap
your CSS code inside `<style>` tag or your JS inside `<script>` tag and include
it in your UI using [scriptlets](https://developers.google.com/apps-script/guides/html/best-practices#separate_html_css_and_javascript).

This approach has serious flaws.
Parcel (nor any other modern JS bundler for that matter), doesn't recognize scriptlets `<?!= ?>`.
Because of this, it won't apply any code transformation to those files and won't bundle them.

**Why is this approach bad?**

- 🚫 CSS not prefixed (The UI breaks on some browsers)
- 🚫 JS not transpiled (Usage of modern JS not possible)
- 🚫 Code can't be split in modules
- 💣 Large file sizes (Code not minified)

## :package: Installation

```sh
# Installs the plugin and saves it as a development dependency
npm i parcel-plugin-gas-imports -D
```

## :cloud: Usage

The plugin allows you to include your JS and CSS just like you would normally do it in HTML:

```sh
# Example add-on UI files
src
├── index.html
├── style.css
└── script.js
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
  </head>

  <body>
    <h1>Google Apps Script Sidebar</h1>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>
```

### 🚀 Build

`parcel build src/index.html`

```sh
# Fully optimized project ready for deployment
dist
├── index.html
├── style.e308ff8e.css.html
└── script.75da7f30.js.html
```

> ℹ️ NOTE: If you want to prevent this plugin from running in certain cases you can set `PARCEL_PLUGIN_GAS_IMPORTS=false` environment variable.

## :sparkles: Run tests

The plugin uses [Jest](https://jestjs.io/) for running tests.

Jest will execute all `.test.js` files in the `test` folder.

```sh
npm test
```

## :man: Author

**Vladimir Mikulic**

- Twitter: [@VladoDev](https://twitter.com/VladoDev)
- Github: [@VladimirMikulic](https://github.com/VladimirMikulic)
- LinkedIn: [@vladimirmikulic](https://www.linkedin.com/in/vladimir-mikulic/)

## :handshake: Contributing

Contributions, issues and feature requests are welcome!

## :pencil: License

This project is licensed under [MIT](https://opensource.org/licenses/MIT) license.

## :man_astronaut: Show your support

Give a ⭐️ if this project helped you!
