import 'framework7/css/bundle';
import 'framework7-icons';

import './style.css';

import {renderShortcut} from "~/render";

// @ts-ignore
import {parse} from 'plist/dist/plist-parse.js';

let preview: HTMLDivElement | null;
export let container: HTMLDivElement;

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

interface PreviewOptions {
    selector: string
    name: string
    url: string
    data: object
    header: boolean
    meta: boolean
}

export interface ActionData {
    WFWorkflowActionIdentifier: string
    WFWorkflowActionParameters: object
}

interface ShortcutData {
    WFWorkflowName?: string
    WFWorkflowIcon?: ShortcutIcon
    WFWorkflowActions?: Array<ActionData>
}

interface ShortcutIcon {
    WFWorkflowIconStartColor: number
}

export class ShortcutPreview {
    selector: string
    name: string
    url: string
    data: ShortcutData
    header: boolean
    meta: boolean

    constructor(options: PreviewOptions) {
        this.selector = options.selector ?? '#shortcut-preview';
        this.name = options.name ?? null;
        this.url = options.url ?? null;
        this.data = options.data ?? null;
        this.header = options.header ?? true;
        this.meta = options.meta ?? true;
        if (this.data) {
            this.preview();
            return;
        }
        if (this.url) {
            this.loadURL();
            return;
        }
        throw new Error('[preview-shortcut] Missing `data` or `url` option.');
    }

    load(data: string | ShortcutData) {
        if (typeof data === 'object') {
            this.data = data;
            this.preview();
            return;
        }
        try {
            this.data = JSON.parse(String(data));
        } catch (e) {
            this.data = parse(data);
        }
        this.preview();
    }

    loadURL(url?: string) {
        if (url) {
            this.url = url;
        }
        fetch(this.url).then(response => {
            if (response.status !== 200) {
                throw new Error(`Unable to load shortcut (${response.status}): ${this.url}`);
            }
            return response.text();
        }).then(response => {
            this.load(response);
            this.preview();
        }).catch(error => {
            console.error(`[preview-shortcut] ${error}`);
        });
    }

    preview() {
        preview = document.querySelector<HTMLDivElement>(this.selector);
        if (!preview) {
            throw new Error(`[preview-shortcut] Selector '${this.selector}' selects nothing.`);
        }
        preview.innerHTML = '';

        if (this.header) {
            const header = document.createElement('div');
            header.className = 'sp-header';

            const iconContainer = document.createElement('div');
            iconContainer.className = 'sp-info';

            const icon = document.createElement('div');
            icon.className = 'sp-icon';
            if (this.data.WFWorkflowIcon) {
                const iconColor: number = this.data.WFWorkflowIcon.WFWorkflowIconStartColor;
                // @ts-ignore
                icon.style.backgroundColor = colors[iconColor];
            }
            iconContainer.appendChild(icon);

            const title = document.createElement('div');
            title.className = 'sp-header-title';
            title.innerText = this.name ?? this.data.WFWorkflowName ?? 'Shortcut';
            iconContainer.appendChild(title);

            header.appendChild(iconContainer);

            preview.appendChild(header);
        }

        if (this.data.WFWorkflowActions && this.data.WFWorkflowActions.length !== 0) {
            container = document.createElement('div');
            container.className = 'sp-container ios';
            renderShortcut(this.data.WFWorkflowActions);
            preview.appendChild(container);
        } else {
            const empty = document.createElement('div');
            empty.className = 'sp-actions-empty';
            empty.innerText = 'This Shortcut contains 0 actions.';
            preview.appendChild(empty);
        }
    }
}
