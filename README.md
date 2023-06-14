# Preview iOS Shortcut

[![Build with Vite](https://github.com/electrikmilk/preview-shortcut/actions/workflows/vite.yml/badge.svg)](https://github.com/electrikmilk/preview-shortcut/actions/workflows/vite.yml)
[![License](https://img.shields.io/github/license/electrikmilk/preview-shortcut)](https://github.com/electrikmilk/preview-shortcut/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/preview-shortcut)](https://www.npmjs.com/package/preview-shortcut)

iOS Siri Shortcut cross-framework preview for the web.

## Usage

Install via NPM:

```console
npm i preview-shortcut
```

Preview Shortcut JSON data using the `previewShortcut()` function.

```javascript
import 'preview-shortcut/css';
import {previewShortcut} from 'preview-shortcut';

// Shortcut property list needs to be converted to JSON.
// `data` can either be a JSON file URL or a JSON data value.
const data = './src/test.json';

previewShortcut(data, '#custom-selector');
```

### Result

<img width="490" alt="Screenshot 2023-06-06 at 22 31 52" src="https://github.com/electrikmilk/preview-shortcut/assets/4368524/8ea83434-7ad7-40a1-9e0a-25aa7c33c226">

### Dark Mode Support

<img width="485" alt="Screenshot 2023-06-06 at 22 31 17" src="https://github.com/electrikmilk/preview-shortcut/assets/4368524/57a12542-d732-4580-9c97-5f1c02a5e55c">

## Work in Progress

- [x] ~~Framework7 needs to be bundled: instead of borrowing only what we need, we need to bundle and purge what we
  don't use.~~
- [ ] A lot of the code is a rough draft and needs refactoring.
- [ ] Inline variables are not properly handled.
- [ ] Most actions are not defined, meaning raw action data shows up instead, or they do not look exactly like what they
  look like in the Shortcuts app.
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
