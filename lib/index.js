const ImportsManager = require('./ImportsManager');

module.exports = async bundler => {
  bundler.on('bundled', async bundle => {
    const bundles = bundle.entryAsset
      ? [bundle]
      : Array.from(bundle.childBundles);

    for (const bundleItem of bundles) {
      const importsManager = new ImportsManager(bundleItem);
      importsManager.updateEntryFileImports();
      importsManager.wrapImportFilesCode();
      importsManager.renameImportFiles();
    }
  });
};
