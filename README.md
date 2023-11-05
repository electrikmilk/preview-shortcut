# Preview iOS Shortcut

[![Build with Vite](https://github.com/electrikmilk/preview-shortcut/actions/workflows/vite.yml/badge.svg)](https://github.com/electrikmilk/preview-shortcut/actions/workflows/vite.yml)
[![License](https://img.shields.io/github/license/electrikmilk/preview-shortcut)](https://github.com/electrikmilk/preview-shortcut/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/preview-shortcut)](https://www.npmjs.com/package/preview-shortcut)

iOS Siri Shortcut cross-framework preview for the web.

- Accepts JSON or Property List (.plist) data.
- Agnostic to any framework, written in vanilla TypeScript.
- Displays Shortcut metadata like the icon and name.
- Dark mode support.

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
    selector? : string // default: #shortcut-preview
    name? : string
    url? : string
    data? : object
    header? : boolean // default: true
    meta? : boolean // default: true
});
```

### Result

![Screenshot 2023-11-05 at 02 55 10](https://github.com/electrikmilk/preview-shortcut/assets/4368524/38f1795d-624f-4cfb-9878-5c8c6620f808)

### Dark Mode Support

![Screenshot 2023-11-05 at 02 54 54](https://github.com/electrikmilk/preview-shortcut/assets/4368524/5d4d3c4c-fc81-4eff-b82c-e9b8c7fa58b7)

## Work in Progress

- [x] ~~Framework7 needs to be bundled: instead of borrowing only what we need, we need to bundle and purge what we
  don't use.~~
- [x] ~~Inline variables are not properly handled.~~
- [ ] A lot of the code is a rough draft and needs refactoring.
- [ ] Most actions are not defined, meaning raw action data shows up instead, or they do not look exactly like what they
  look like in the Shortcuts app.
- [ ] Plans to display more metadata about the Shortcut, like what inputs it accepts, etc.
- [ ] Optional components for JS frameworks instead of having to use a DOM selector.

These are growing pains and are planned to be resolved by version 1.0.

## Dependencies

### Colors

Colors are either picked from the Shortcuts app on Mac or pulled from the official Apple color palette.

### Icons

This package uses [Framework7 Icons](https://framework7.io/icons/) to achieve somewhat similar icons to what is
available in iOS, as the official icons (SF Symbols) can only be used under license.

### Styling

This package includes CSS from [Framework7](https://github.com/framework7io/framework7) to make it look as close to iOS
as possible with some custom styling added on top to make sure it also looks as close to the Shortcuts app as possible.
