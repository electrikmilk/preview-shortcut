![Screenshot 2024-05-22 at 20 38 54](https://github.com/electrikmilk/preview-shortcut/assets/4368524/58b32090-8757-41f6-9114-5badf42139ee)

# Siri Shortcut Preview for the Web.

[![Build with Vite](https://github.com/electrikmilk/preview-shortcut/actions/workflows/vite.yml/badge.svg)](https://github.com/electrikmilk/preview-shortcut/actions/workflows/vite.yml)
[![License](https://img.shields.io/github/license/electrikmilk/preview-shortcut)](https://github.com/electrikmilk/preview-shortcut/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/preview-shortcut)](https://www.npmjs.com/package/preview-shortcut)

Preview Shortcut renders a fairly accurate Siri Shortcut preview from JSON or property list (PLIST) Shortcut data. It works across frameworks, rendering to a single HTML element.

- Accepts JSON or Property List (.plist) data (will support encrypted in the future).
- Agnostic to any framework, written in vanilla TypeScript.
- Displays Shortcut metadata like the icon, inputs, details and setup.
- Dark mode support.

Sites that use it:
- [cherrilang.org](https://cherrilang.org)
- [playground.cherrilang.org](https://playground.cherrilang.org)

## Usage

### Install

NPM:

```console
npm i preview-shortcut
```

Yarn:

```console
yarn add preview-shortcut
```

### HTML

```html

<div id="shortcut-preview"></div>
```

### Load a Shortcut

```typescript
import 'preview-shortcut/css';
import {ShortcutPreview} from 'preview-shortcut';

const preview = new ShortcutPreview({
    data: {...} // plist data as JSON object
    // or...
    url: 'https://example.com/example.plist'

    header: true,
    meta: true
});
```

[Learn more on the project wiki.](https://github.com/electrikmilk/preview-shortcut/wiki)

#### Dark Mode Support

![Screenshot 2023-11-25 at 19 51 04](https://github.com/electrikmilk/preview-shortcut/assets/4368524/9cac0dc7-945c-4ada-804e-5c3e447f0fc3)

## Work in Progress

- [x] ~~Framework7 needs to be bundled: instead of borrowing only what we need, we need to bundle and purge what we
  don't use.~~
- [x] ~~Inline variables are not properly handled.~~
- [x] ~~Plans to display more metadata about the Shortcut, like what inputs it accepts, etc.~~
- [ ] Most actions are not defined, meaning raw action data shows up instead, or they do not look exactly like what they
  look like in the Shortcuts app.
- [ ] Optional components for JS frameworks instead of having to use a DOM selector.

These are growing pains and are planned to be resolved by version 1.0.

## Dependencies

### Colors

Colors are either picked from the Shortcuts app on Mac, pulled from the official Apple color palette, or from [Framework7](https://github.com/framework7io/framework7).

### Icons

This package uses [Framework7 Icons](https://framework7.io/icons/) to achieve somewhat similar icons to what is
available on Apple Platforms, as the official icons (SF Symbols) can only be used under license. The glyphs for Shortcut icons are provided by [atnbueno/shortcut-icons](https://github.com/atnbueno/shortcut-icons) under the MIT license.

### Styling

This package includes CSS from [Framework7](https://github.com/framework7io/framework7) to make it look as close to iOS
as possible with some custom styling added on top to make sure it also looks as close to the Shortcuts app as possible.
