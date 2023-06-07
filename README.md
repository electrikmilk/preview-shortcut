# Preview iOS Shortcut

[![License](https://img.shields.io/github/license/electrikmilk/preview-shortcut)](https://github.com/electrikmilk/preview-shortcut/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/preview-shortcut)](https://www.npmjs.com/package/preview-shortcut)

iOS Siri Shortcut cross-framework previewer for the web.

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