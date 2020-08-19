const path = require('path');
// const Bundler = require('parcel-bundler');
// const { Packager } = require('parcel-bundler');
// const pluginGasImports = require('../lib/index');
// const entryFilePath = path.resolve(__dirname, './example-src/index.html');

// class MyPackager extends Packager {
//   async start() {
//     // optional. write file header if needed.
//     // await this.dest.write(header);
//   }

//   async addAsset(asset) {
//     console.log(this.bundler.mainBundle.entryAsset.generated);
//     // required. write the asset to the output file.
//     // await this.dest.write(asset.generated.foo);
//   }

//   async end() {
//     // optional. write file trailer if needed.
//     // await this.dest.end(trailer);
//   }
// }

// (async function () {
//   // body
//   const bundler = new Bundler(entryFilePath, {
//     // logLevel: 1,
//     minify: true,
//     watch: false,
//     sourceMaps: false
//   });

//   // await pluginGasImports(bundler);
//   bundler.addPackager('html', MyPackager);

//   const bundle = await bundler.bundle();
// })();

// ------------
const fs = require('fs');
const posthtml = require('posthtml');

const entryFilePath = path.resolve(__dirname, './example-src/index.html');
const html = fs.readFileSync(entryFilePath, 'utf-8');

// const result = posthtml().process(html, {
//   sync: true,
//   // parser(tree) {
//   //   // console.log(tree);

//   //   return tree;
//   // }

// }).html;

// console.log(result);
// ------------

const result = posthtml()
  // .use(require('posthtml-custom-elements')())
  .process(html, {
    sync: true,
    directives: [
      { name: '?', start: '<', end: '>' },
      { name: '?=', start: '<', end: '>' }
    ]
  }).html;

console.log(result);

// const htmlnano = require('htmlnano');
// const options = {
//   removeEmptyAttributes: false, // Disable the module "removeEmptyAttributes"
//   collapseWhitespace: 'conservative' // Pass options to the module "collapseWhitespace"
// };
// // posthtml, posthtml-render, and posthtml-parse options
// const postHtmlOptions = {
//   sync: false, // https://github.com/posthtml/posthtml#usage
//   lowerCaseTags: true, // https://github.com/posthtml/posthtml-parser#options
//   quoteAllAttributes: false // https://github.com/posthtml/posthtml-render#options this
// };

// htmlnano
//   // "preset" arg might be skipped (see "Presets" section below for more info)
//   // "postHtmlOptions" arg might be skipped
//   .process(html, options, htmlnano.presets.safe, postHtmlOptions)
//   .then(function (result) {
//     console.log(result.html);
//     // result.html is minified
//   })
//   .catch(function (err) {
//     console.error(err);
//   });
