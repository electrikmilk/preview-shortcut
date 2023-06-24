import 'framework7/css/bundle';
import 'framework7-icons';

import './style.css';

import {renderShortcut} from "~/render";

// @ts-ignore
import {parse} from 'plist/dist/plist-parse.js';
import Framework7 from "framework7";

export let preview: HTMLDivElement | null;

export function previewShortcutURL(url: string, selector: string = '#shortcut-preview') {
    fetch(url).then(response => {
        if (response.status !== 200) {
            throw new Error(`Unable to load shortcut (${response.status}): ${url}`);
        }
        return response.text();
    }).then(response => {
        let json;
        try {
            json = JSON.parse(response);
        } catch (e) {
            json = parse(response);
        }
        previewShortcut(json, selector);
    }).catch(error => {
        console.error(`[preview-shortcut] ${error}`);
    });
}

export function previewShortcut(shortcut: string | object, selector: string = '#shortcut-preview') {
    preview = document.querySelector<HTMLDivElement>(selector);
    if (!preview) {
        throw new Error(`[preview-shortcut] Selector '${selector}' selects nothing.`);
    }
    new Framework7({
        el: selector,
        name: 'Preview Shortcut'
    });
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
