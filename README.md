# Neuroglancer Ouroboros Plugin

This plugin integrates a Neuroglancer interface into the [Ouroboros](https://github.com/We-Gold/ouroboros) medical imaging software. 

To install it, open Ouroboros, open the Plugin Manager (`Ouroboros > Manage Plugins`), and add a plugin from the GitHub releases url: `https://github.com/ChengLabResearch/neuroglancer-plugin/releases`.

Then restart the app and the plugin should be visible.

### Features

Click the menu on the right side of the Neuroglancer window (three dots) and you'll have the option to load or save the current JSON state.

Neuroglancer can do this natively, but the menu buttons integrate into Ouroboros's file explorer, so when you open a folder in the app, the local JSON files are immediately available.

### Development

Make sure Docker is installed and running.

1. `npm install`
2. `npm run dev`

To test in Ouroboros, run Ouroboros in development mode as well, and use the `Test Plugin` page to view the plugin.

### Release artifact

The current production pin for Ouroboros package builds is:

- tag: `v1.0.0`
- release asset: `release.zip`

That asset predates the named-artifact release workflow, but its archive root is
still the same layout that Ouroboros expects inside its plugin folder:

- `package.json`
- `index.html`
- `icon.svg`
- `compose.yml`
- frontend assets and backend runtime files

The legacy `v1.0.0` asset does not include `plugin-release.json`; Ouroboros
production package metadata should therefore record the pinned release tag and
asset name directly.

New tagged releases publish `neuroglancer-plugin-<tag>.zip` with:

- `package.json`
- `index.html`
- `ngrefactor.html`
- `icon.svg`
- `compose.yml`
- frontend assets and runtime files
- `plugin-release.json`

The `plugin-release.json` metadata records the release tag, artifact name,
commit, and packaged plugin version.

For production package preinstalls, unpack the archive to
`extra-resources/preinstalled-plugins/neuroglancer-plugin/` before building the
Ouroboros app package. On first launch, Ouroboros copies that folder into the
normal user-data plugin directory and detects it from `package.json`.
