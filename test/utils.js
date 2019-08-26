const rimraf = require("rimraf");

const fs = require("fs");
const util = require("util");

const Bundler = require("parcel-bundler/src/Bundler");
const BundleManifestPlugin = require("../src/BundleManifestPlugin");

exports.createTester = baseDir => {
  if (!baseDir) throw new Error();

  const outDir = baseDir + "/dist/";
  const manifestPath = outDir + "asset-manifest.json";

  return {
    baseDir,
    outDir,
    manifestPath,

    option: { outDir },

    cleanDist: () => {
      rimraf.sync(outDir);
    },

    readManifest: async () => {
      const manifest = await util.promisify(fs.readFile)(manifestPath, "utf8");

      return JSON.parse(manifest);
    }
  };
};

exports.createBundler = (filePath, option = {}) => {
  const bundler = new Bundler(
    filePath,
    Object.assign(
      {
        watch: false,
        cache: false,
        hmr: false,
        logLevel: 0
      },
      option
    )
  );

  BundleManifestPlugin(bundler);

  return bundler;
};
