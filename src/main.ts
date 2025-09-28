import 'framework7/css/bundle';
import 'framework7-icons';

import './style.css';

import {
    container,
    renderDetails,
    renderInputs,
    renderShortcut,
    renderVariables,
    resetContainers,
    setContainer,
    WFWorkflowNoInputBehavior
} from "~/render";

import {parse} from '@plist/plist';

import Framework7 from 'framework7/lite/bundle';
import {renderClass, renderElement} from "~/element";

let preview: HTMLDivElement | null;

export const dev = import.meta.env.DEV ?? false;

export interface PreviewOptions {
    selector: string
    name: string
    url: string
    data: object
    header: boolean
    meta: boolean
    variables: boolean
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
    WFWorkflowImportQuestions?: Array<WFWorkflowImportQuestion>
    WFWorkflowNoInputBehavior?: WFWorkflowNoInputBehavior
}

interface WFWorkflowImportQuestion {
    ActionIndex: number
    Category: string
    DefaultValue: string
    ParameterKey: string
    Text: string
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
    variables: boolean
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
        this.variables = options.variables ?? false;
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
        if (data instanceof ArrayBuffer) {
            // @ts-ignore
            this.data = parse(data);
            this.preview();
            return;
        } else if (typeof data === 'object') {
            this.data = data;
            this.preview();
            return;
        }
        try {
            this.data = JSON.parse(String(data));
        } catch (e) {
            // @ts-ignore
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
            Log.error(error);
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

        setContainer(renderClass('sp-container ios'))

        resetContainers()

        if (this.variables && this.data.WFWorkflowActions && this.data.WFWorkflowActions.length !== 0) {
            renderVariables(this.data.WFWorkflowActions)
        }
        if (this.meta) {
            renderDetails(this.data)
        }

        if (this.header) {
            const header = renderClass('sp-header');

            const icon = renderClass('shortcut-icon s64');
            if (this.data.WFWorkflowIcon) {
                const iconColor: number = this.data.WFWorkflowIcon.WFWorkflowIconStartColor;
                const iconGlyph: number = this.data.WFWorkflowIcon.WFWorkflowIconGlyphNumber;
                icon.classList.add('c' + iconColor)
                icon.classList.add('g' + iconGlyph)
            }
            header.appendChild(icon);

            const title = renderElement('div', {
                className: 'sp-header-title',
                innerText: this.name ?? this.data.WFWorkflowName ?? 'Shortcut',
            });
            header.appendChild(title);

            const count = renderElement('div', {
                className: 'sp-header-action-count',
                innerText: this.data.WFWorkflowActions?.length + ' actions'
            });
            header.appendChild(count);

            preview.appendChild(header);
        }

        if (this.meta) {
            renderInputs(this.data);
        }

        if (this.data.WFWorkflowActions && this.data.WFWorkflowActions.length !== 0) {
            renderShortcut(this.data.WFWorkflowActions);
        } else {
            const empty = renderElement('div', {
                className: 'sp-actions-empty',
                innerText: 'This Shortcut contains 0 actions.'
            });
            container.appendChild(empty);
        }

        preview.appendChild(container);
    }
}
