import 'framework7/css/bundle';
import 'framework7-icons';

import './style.css';

import {renderShortcut} from "~/render";

// @ts-ignore
import {parse} from 'plist/dist/plist-parse.js';

export let preview: HTMLDivElement | null;

export function previewShortcutURL(url: string, selector: string = '#shortcut-preview') {
    fetch(url).then(response => response.text()).then((response) => {
        let json;
        try {
            json = JSON.parse(response);
        } catch (e) {
            json = parse(response);
        }
        previewShortcut(json, selector);
    }).catch(error => {
        console.error(`[preview-shortcut] Error loading shortcut: ${error}`);
    });
}

export function previewShortcut(shortcut: string | object, selector: string = '#shortcut-preview') {
    preview = document.querySelector<HTMLDivElement>(selector);
    if (!preview) {
        throw new Error(`[preview-shortcut] Selector '${selector}' selects nothing.`);
    }
    if (!preview.className.includes('sp-container')) {
        let previewClasses = preview.className.split(' ');
        previewClasses.push('sp-container', 'ios');
        preview.className += previewClasses.join(' ');
    }
    preview.innerHTML = '';

    switch (typeof shortcut) {
        case 'string':
            let json;
            try {
                json = JSON.parse(shortcut);
            } catch (e) {
                json = parse(shortcut);
            }
            renderShortcut(json.WFWorkflowActions);
            break;
        case 'object':
            // @ts-ignore
            renderShortcut(shortcut.WFWorkflowActions);
            break;
    }
}
