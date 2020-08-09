const fs = require('fs');
const path = require('path');
const Bundler = require('parcel-bundler');
const ImportsManager = require('../lib/ImportsManager');

describe('ImportsManager.js', () => {
  let importsManager;

  beforeAll(async () => {
    const entryFilePath = path.resolve(__dirname, './example-src/index.html');
    const bundler = new Bundler(entryFilePath, {
      logLevel: 1,
      minify: true,
      watch: false,
      sourceMaps: false
    });

    const bundle = await bundler.bundle();
    importsManager = new ImportsManager(bundle);
  });

  it('tests HTML imports are replaced with GAS imports', () => {
    importsManager.updateEntryFileImports();

    const { entryFileImports } = importsManager;
    const entryFilePath = importsManager.bundle.name;
    const entryFileSource = fs.readFileSync(entryFilePath, 'utf-8');

    for (const { fileName } of entryFileImports) {
      const gasImport = `<?!= HtmlService.createTemplateFromFile(${fileName}).getRawContent() ?>`;
      expect(entryFileSource.includes(gasImport)).toBe(true);
    }
  });

  it('tests code in imported files is wrapped in correct HTML tag', () => {
    importsManager.wrapImportFilesCode();
    const { childBundles } = importsManager.bundle;

    for (const { name, type } of childBundles) {
      const fileSource = fs.readFileSync(name, 'utf-8');
      const isCSSFile = type === 'css';
      const openTag = isCSSFile ? '<style>' : '<script>';
      const closeTag = isCSSFile ? '</style>' : '</script>';

      expect(fileSource.startsWith(openTag)).toBe(true);
      expect(fileSource.endsWith(closeTag)).toBe(true);
    }
  });

  it('tests imported files are renamed correctly', () => {
    importsManager.renameImportFiles();
    const { childBundles } = importsManager.bundle;

    for (const { name } of childBundles) {
      expect(fs.existsSync(name)).toBe(false);
      expect(fs.existsSync(`${name}.html`)).toBe(true);
    }
  });
});
