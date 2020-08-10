const ImportsManager = require('./ImportsManager');

module.exports = async bundler => {
  const runPlugin = process.env.PARCEL_PLUGIN_GAS_IMPORTS !== 'false';
  if (!runPlugin) return;

  bundler.on('bundled', async bundle => {
    const bundles = bundle.entryAsset
      ? [bundle]
      : Array.from(bundle.childBundles);

    for (const bundleItem of bundles) {
      if (bundleItem.type !== 'html') continue;

      const importsManager = new ImportsManager(bundleItem);
      importsManager.updateEntryFileImports();
      importsManager.wrapImportFilesCode();
      importsManager.renameImportFiles();
    }
  });
};
