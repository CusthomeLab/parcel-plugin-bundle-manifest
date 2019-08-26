Parcel plugin for generating an bundle manifest.

This repository is a fork of the https://github.com/mugi-uno/parcel-plugin-bundle-manifest repository. See the fork section for an explanation of why we fork it.

# Usage

## Install

```
npm install --save-dev @custhome/parcel-plugin-bundle-manifest
```

## Build

```
parcel build entry.js
```

## Output

Output a `asset-manifest.json` file to the same directory as the bundle file.

- dist/entry.html
- dist/{hash}.js
- dist/{hash}.css
- dist/asset-manifest.json

The manifest will look like this :

```json
{
  "files": {
    "index.html": "/dist/index.html",
    "index.js": "/dist/5f0796534fe2892712053b3a035f585b.js",
    "main.scss": "/dist/5f0796534fe2892712053b3a035f585b.css"
  }
}
```

# Fork

We choose to fork the repository to change to format of the asset manifest files. We needed it to match the webpack one.

This lead to three main changes:

- We add a key `files` at the file root containing the file list
- We rename the outputed manifest file from `parcel-manifest.json` to `asset-manifest.json`
- Service worker are in the manifest like any other files

# License

MIT
