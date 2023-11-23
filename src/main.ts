import 'framework7/css/bundle';
import 'framework7-icons';

import './style.css';

import {renderShortcut} from "~/render";

// @ts-ignore
import {parse} from 'plist/dist/plist-parse.js';

let preview: HTMLDivElement | null;
export let container: HTMLElement;

let containers: HTMLElement[] = [];
let containerIndex: number = 0;

export function newContainer() {
    const renderContainer = document.createElement('div');
    renderContainer.className = 'sp-sub-container';
    container.appendChild(renderContainer);

    containers.push(renderContainer);
    containerIndex++;

    container = renderContainer;
}

export function prevContainer() {
    if (containers.length === 1) {
        return;
    }
    containerIndex--;
    container = containers[containerIndex];
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
    WFWorkflowIconGlyphNumber: number
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
        preview?.classList.add('sp-preview');
        if (!preview) {
            throw new Error(`[preview-shortcut] Selector '${this.selector}' selects nothing.`);
        }
        preview.innerHTML = '';

        if (this.header) {
            const header = document.createElement('div');
            header.className = 'sp-header';

            const icon = document.createElement('div');
            icon.className = 'shortcut-icon s64';
            if (this.data.WFWorkflowIcon) {
                const iconColor: number = this.data.WFWorkflowIcon.WFWorkflowIconStartColor;
                const iconGlyph: number = this.data.WFWorkflowIcon.WFWorkflowIconGlyphNumber;
                icon.classList.add('c' + iconColor)
                icon.classList.add('g' + iconGlyph)
            }

            header.appendChild(icon);

            const title = document.createElement('div');
            title.className = 'sp-header-title';
            title.innerText = this.name ?? this.data.WFWorkflowName ?? 'Shortcut';
            header.appendChild(title);

            const count = document.createElement('div');
            count.className = 'sp-header-action-count';
            count.innerText = this.data.WFWorkflowActions?.length + ' actions';
            header.appendChild(count);

            preview.appendChild(header);
        }

        container = document.createElement('div');
        container.className = 'sp-container ios';
        preview.appendChild(container);

        containers = [];
        containers.push(container);

        if (this.data.WFWorkflowActions && this.data.WFWorkflowActions.length !== 0) {
            renderShortcut(this.data.WFWorkflowActions);
        } else {
            const empty = document.createElement('div');
            empty.className = 'sp-actions-empty';
            empty.innerText = 'This Shortcut contains 0 actions.';
            container.appendChild(empty);
        }

    }
}
