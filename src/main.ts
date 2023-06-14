import 'framework7/css/bundle';
import 'framework7-icons';

import './style.css';

import {renderShortcut} from "~/render";

export let preview: HTMLDivElement | null;

export function previewShortcut(shortcut: string | object, selector: string = '#shortcut-preview') {
    console.group('[preview-shortcut]');

    preview = document.querySelector<HTMLDivElement>(selector);
    if (!preview) {
        throw new Error(`[preview-shortcut] Selector '${selector}' selects nothing.`);
    }
    preview.className = 'sp-container ios';
    preview.innerHTML = '';

    const shortcutDataType = typeof shortcut;
    switch (shortcutDataType) {
        case 'string':
            fetch(String(shortcut)).then(response => response.json()).then((response) => {
                renderShortcut(response.WFWorkflowActions);
                console.groupEnd();
            }).catch(error => {
                console.error(`[preview-shortcut] Error loading shortcut: ${error}`);
            });
            break;
        case 'object':
            renderShortcut(Object(shortcut));
            console.groupEnd();
            break;
        default:
            console.error(`[preview-shortcut] Shortcut data is not of type URL string or object but ${shortcutDataType}!`);
    }
}