import 'framework7/css/bundle';
import 'framework7-icons';

import './style.css';

import {renderInputs, renderShortcut} from "~/render";

// @ts-ignore
import {parse} from 'plist/dist/plist-parse.js';

import Framework7 from 'framework7/lite/bundle';

let preview: HTMLDivElement | null;
export let container: HTMLElement;

export let containers: HTMLElement[] = [];
export let containerIndex: number = 0;

export const dev = import.meta.env.DEV ?? false;

export function resetContainers() {
    containers = [];
    containers.push(container);
}

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

export interface PreviewOptions {
    selector: string
    name: string
    url: string
    data: object
    header: boolean
    meta: boolean
    framework7: Framework7
}

export interface ActionData {
    WFWorkflowActionIdentifier: string
    WFWorkflowActionParameters: object
}

export interface ShortcutData {
    WFWorkflowName?: string
    WFWorkflowIcon?: ShortcutIcon
    WFWorkflowActions?: Array<ActionData>
    WFWorkflowHasShortcutInputVariables?: boolean,
    WFWorkflowInputContentItemClasses?: Array<String>
    WFWorkflowOutputContentItemClasses?: Array<String>
    WFQuickActionSurfaces?: Array<String>
    WFWorkflowTypes?: Array<String>
}

interface ShortcutIcon {
    WFWorkflowIconStartColor: number
    WFWorkflowIconGlyphNumber: number
}

export const Log = {
    info(...message: string[]) {
        Log.log('info', ...message);
    },
    error(...message: string[]) {
        Log.log('err', ...message);
    },
    fail(...message: string[]) {
        Log.log('fail', ...message);
    },
    warn(...message: string[]) {
        Log.log('warn', ...message);
    },
    debug(...message: string[]) {
        Log.log('debug', ...message);
    },
    log(type: string, ...message: string[]) {
        const prefix = '[preview-shortcut]';
        switch (type) {
            case 'info':
                console.info(prefix, ...message);
                break;
            case 'err':
                console.error(prefix, ...message);
                break;
            case 'fail':
                throw new Error([prefix, ...message].join(' '));
            case 'warn':
                console.warn(prefix, ...message);
                break;
            case 'debug':
                if (!dev) {
                    return;
                }
                console.log(prefix, ...message);
                break;
        }
    }
};

export class ShortcutPreview {
    selector: string
    name: string
    url: string
    data: ShortcutData = {};
    header: boolean
    meta: boolean
    framework7: Framework7

    constructor(options: PreviewOptions) {
        if (dev) {
            Log.debug('Running in development mode.');
        }

        this.selector = options.selector ?? '#shortcut-preview';
        this.name = options.name ?? null;
        this.url = options.url ?? null;
        this.data = options.data ?? null;
        this.header = options.header ?? true;
        this.meta = options.meta ?? true;
        this.framework7 = options.framework7 ?? new Framework7({
            theme: 'ios',
        });

        if (options.framework7) {
            Log.debug('Inherited Framework7 instance.');
        }

        if (this.data) {
            this.preview();
            return;
        }
        if (this.url) {
            this.loadURL();
            return;
        }
        Log.fail('Missing `data` or `url` option.');
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
                Log.fail(`Unable to load shortcut (${response.status}): ${this.url}`);
            }

            return response.text();
        }).then(response => {
            this.load(response);
        }).catch(error => {
            Log.error(error.message, error);
        });
    }

    preview() {
        preview = document.querySelector<HTMLDivElement>(this.selector);
        preview?.classList.add('sp-preview');
        if (!preview) {
            Log.fail(`Selector '${this.selector}' selects nothing.`);
            return;
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

        containers = [];
        containers.push(container);

        if (this.meta) {
            renderInputs(this.data);
        }

        if (this.data.WFWorkflowActions && this.data.WFWorkflowActions.length !== 0) {
            renderShortcut(this.data.WFWorkflowActions);
        } else {
            const empty = document.createElement('div');
            empty.className = 'sp-actions-empty';
            empty.innerText = 'This Shortcut contains 0 actions.';
            container.appendChild(empty);
        }

        preview.appendChild(container);
    }
}
