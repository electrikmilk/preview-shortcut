# Preview iOS Shortcut

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

## Result

<img width="490" alt="Screenshot 2023-06-06 at 22 31 52" src="https://github.com/electrikmilk/preview-shortcut/assets/4368524/8ea83434-7ad7-40a1-9e0a-25aa7c33c226">

### Dark Mode Support

<img width="485" alt="Screenshot 2023-06-06 at 22 31 17" src="https://github.com/electrikmilk/preview-shortcut/assets/4368524/57a12542-d732-4580-9c97-5f1c02a5e55c">
