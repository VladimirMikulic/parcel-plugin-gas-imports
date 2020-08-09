const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

const prependFileSync = require('prepend-file').sync;
const replaceInFileSync = require('replace-in-file').sync;

class ImportsManager {
  constructor(bundle) {
    this.bundle = bundle;
    this.entryFilePath = bundle.name;
    this.distDirPath = bundle.entryAsset.options.outDir;
    this.importPrefix = bundle.entryAsset.options.publicURL;
    this.entryFileImports = this.getEntryFileImports();
  }

  getEntryFileImports() {
    const entryFileSource = fs.readFileSync(this.entryFilePath, 'utf-8');
    const parsedHTML = parse(entryFileSource);

    const htmlImports = parsedHTML
      .querySelectorAll('link, script')
      .filter(el => !el.rawAttrs.match(/((src=)|(href=)).*https?:\/\//));

    for (const htmlImport of htmlImports) {
      const importAttr = htmlImport.tagName === 'link' ? 'href' : 'src';
      const importPath = htmlImport.getAttribute(importAttr);

      htmlImport.fileName = importPath.replace(this.importPrefix, '');
      htmlImport.absFilePath = path.join(this.distDirPath, htmlImport.fileName);
    }

    return htmlImports;
  }

  updateEntryFileImports() {
    for (const htmlImport of this.entryFileImports) {
      const gasImport = `<?!= HtmlService.createTemplateFromFile(${htmlImport.fileName}).getRawContent() ?>`;

      replaceInFileSync({
        files: this.entryFilePath,
        from: htmlImport.toString(),
        to: gasImport
      });
    }
  }

  wrapImportFilesCode() {
    for (const { absFilePath } of this.entryFileImports) {
      const fileType = absFilePath.split('.').slice(-1)[0];
      const isCSSFile = fileType === 'css';
      const openTag = isCSSFile ? '<style>' : '<script>';
      const closeTag = isCSSFile ? '</style>' : '</script>';

      if (!fs.existsSync(absFilePath)) continue;

      prependFileSync(absFilePath, openTag);
      fs.appendFileSync(absFilePath, closeTag);
    }
  }

  renameImportFiles() {
    for (const { absFilePath } of this.entryFileImports) {
      if (!fs.existsSync(absFilePath)) continue;
      fs.renameSync(absFilePath, `${absFilePath}.html`);
    }
  }
}

module.exports = ImportsManager;
