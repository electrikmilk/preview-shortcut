import 'framework7/css/bundle';
import 'framework7-icons';

import './style.css';

import {renderShortcut} from "~/render";

// @ts-ignore
import {parse} from 'plist/dist/plist-parse.js';
import Framework7 from "framework7";

let app: Framework7;

export let preview: HTMLDivElement | null;

const colors = {
    "4282601983": "#f36269",
    "4251333119": "#fc8567",
    "4271458815": "#f7a752",
    "4274264319": "#edc400",
    "4292093695": "#42c95f",
    "431817727": "#2dcdad",
    "1440408063": "#2fcbde",
    "463140863": "#2cb4f7",
    "946986751": "#4969c7",
    "2071128575": "#8757c3",
    "3679049983": "#bb7ae5",
    "3980825855": "#f68bd4",
    "3031607807": "#9e908d",
    "2846468607": "#939f96",
    "255": "#86929a",
}

export function previewShortcutURL(url: string, selector: string = '#shortcut-preview', name?: string) {
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
        previewShortcut(json, selector, name);
    }).catch(error => {
        console.error(`[preview-shortcut] ${error}`);
    });
}

export function previewShortcut(shortcut: string | object, selector: string = '#shortcut-preview', name?: string) {
    preview = document.querySelector<HTMLDivElement>(selector);
    if (!preview) {
        throw new Error(`[preview-shortcut] Selector '${selector}' selects nothing.`);
    }
    if (!app) {
        app = new Framework7({
            el: selector,
            name: 'Preview Shortcut'
        });
    }
    if (!preview.className.includes('sp-container')) {
        let previewClasses = preview.className.split(' ');
        previewClasses.push('sp-container', 'ios');
        preview.className += previewClasses.join(' ');
    }
    preview.innerHTML = '';

    let data;
    if (typeof shortcut === 'string') {
        try {
            data = JSON.parse(shortcut);
        } catch (e) {
            data = parse(shortcut);
        }
    } else {
        data = shortcut;
    }

    const header = document.createElement('div');
    header.className = 'sp-header';

    const iconContainer = document.createElement('div');
    iconContainer.className = 'sp-info';

    const icon = document.createElement('div');
    icon.className = 'sp-icon';
    if (data.WFWorkflowIcon) {
        // @ts-ignore
        icon.style.backgroundColor = colors[data.WFWorkflowIcon.WFWorkflowIconStartColor];
    }
    iconContainer.appendChild(icon);

    const title = document.createElement('div');
    title.className = 'sp-header-title';
    title.innerText = name ?? data.WFWorkflowName ?? 'Shortcut';
    iconContainer.appendChild(title);

    header.appendChild(iconContainer);

    preview.appendChild(header);

    renderShortcut(data.WFWorkflowActions);
}
