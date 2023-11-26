import {
    ActionData,
    container,
    containerIndex,
    newContainer,
    prevContainer,
    resetContainers,
    ShortcutData
} from "~/main";
import {ActionDefinition, actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface ActionParameters {
    [key: string]: any
}

export const controlFlowStart = 0;
export const controlFlowItem = 1;
export const controlFlowEnd = 2;

export function renderShortcut(shortcutActions: Array<ActionData>) {
    console.group('Render Shortcut');
    for (const action of shortcutActions) {
        let identifier = action.WFWorkflowActionIdentifier.replace('is.workflow.actions.', '');
        let params = action.WFWorkflowActionParameters;
        // @ts-ignore
        const controlFlowMode = params['WFControlFlowMode'];
        if (controlFlowMode === controlFlowEnd || controlFlowMode == controlFlowItem) {
            prevContainer();
        }
        if (containerIndex === 0) {
            resetContainers();
        }

        container.appendChild(
            renderAction(identifier, action)
        );

        if (controlFlowMode === controlFlowStart || controlFlowMode === controlFlowItem) {
            if (controlFlowMode === controlFlowStart && identifier === 'choosefrommenu') {
                continue;
            }
            newContainer();
        }
    }
    console.groupEnd();
}

function renderCardContent(element: HTMLElement) {
    const content = document.createElement('div');
    content.className = 'card-content';

    const list = document.createElement('div');
    list.className = 'list';

    const ul = document.createElement('ul');
    ul.innerHTML = element.outerHTML;

    list.appendChild(ul);
    content.appendChild(list);

    return content;
}

function renderAction(identifier: string, action: ActionData): Node {
    console.group(`Render ${action.WFWorkflowActionIdentifier}`);

    const card = document.createElement('div');
    card.className = 'card';

    renderActionConnection(card, action);

    let actionData = null;
    if (actions[identifier]) {
        console.log('Found definition.');
        actionData = actions[identifier];
        if (actionData.title) {
            identifier = actionData.title;
        }
    }
    if (actionData && actionData.render) {
        card.innerHTML = renderCardContent(actionData.render(card, action.WFWorkflowActionParameters ?? [])).outerHTML;

        console.log('Rendered by definition function.');
        console.groupEnd();

        return card;
    }
    const auto = document.createElement('div');
    const header = actionData ? renderActionHeader(actionData) : renderHeader(renderActionIcon('gear', 'white', 'darkgray'), identifier);
    auto.appendChild(header);
    if (action.WFWorkflowActionParameters) {
        auto.appendChild(renderParameters(actionData, action.WFWorkflowActionParameters));
    }
    card.appendChild(renderCardContent(auto));

    console.log('Automatically rendered.');
    console.groupEnd();

    return card;
}

let lastAction: ActionData;

function renderActionConnection(card: HTMLElement, action: ActionData) {
    if (lastAction && lastAction.WFWorkflowActionParameters) {
        let outputUUIDs = [];
        for (const i in action.WFWorkflowActionParameters) {
            // @ts-ignore
            const paramValue = action.WFWorkflowActionParameters[i];
            if (paramValue.Value && paramValue.Value.OutputUUID) {
                outputUUIDs.push(paramValue.Value.OutputUUID);
            }
        }
        if (outputUUIDs.length !== 0) {
            // @ts-ignore
            for (let j in lastAction.WFWorkflowActionParameters) {
                if (j !== "UUID") {
                    continue;
                }
                // @ts-ignore
                const UUID = lastAction.WFWorkflowActionParameters[j];
                if (!outputUUIDs.includes(UUID)) {
                    continue;
                }
                card.classList.add('sp-linked-action');
            }
        }
    }
    lastAction = action;
}

export function renderActionIcon(icon: string = 'gear', color?: string, background?: string): string {
    const actionIcon = document.createElement('div');
    actionIcon.className = 'sp-action-icon';
    if (background) {
        actionIcon.style.backgroundColor = background;
    }
    if (color) {
        actionIcon.style.color = color;
    }

    const i = document.createElement('i');
    i.className = 'icon f7-icons';
    i.innerText = icon;
    actionIcon.appendChild(i);

    return actionIcon.outerHTML;
}

export function renderActionHeader(actionData: ActionDefinition, ...content: HTMLElement[]) {
    const icon = renderActionIcon(actionData.icon ?? 'gear', actionData.color ?? 'white', actionData.background ?? 'darkgray');

    const container = document.createElement('div');

    const actionTitle = document.createElement('div');
    if (actionData.title) {
        actionTitle.className = 'sp-action-title';
        actionTitle.innerHTML = actionData.title ?? '';
    }

    if (content) {
        const flexbox = document.createElement('div');
        flexbox.style.display = 'flex';
        flexbox.style.gap = '10px';
        flexbox.style.alignItems = 'center';

        if (actionData.title) {
            flexbox.appendChild(actionTitle);
        }
        flexbox.append(...content);

        container.appendChild(flexbox);
    } else if (actionData.title) {
        container.appendChild(actionTitle);
    }

    return renderListItem(icon, container.innerHTML);
}

export function renderHeader(media: string | null, title: string): HTMLElement {
    const actionTitle = document.createElement('div');
    actionTitle.className = 'sp-action-title';
    actionTitle.innerHTML = title;

    return renderListItem(media, title ? actionTitle.outerHTML : '');
}

export function renderActionContent(content: HTMLElement | string): HTMLElement {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    ul.appendChild(renderListItem(null, content));
    li.appendChild(ul);

    return li;
}

export function renderListItem(image?: HTMLElement | string | null, title?: HTMLElement | string, after?: HTMLElement | string): HTMLElement {
    const item = document.createElement('li');
    const content = document.createElement('div');
    content.className = 'item-content';

    if (image) {
        const media = document.createElement('div');
        media.className = 'item-media';
        // @ts-ignore
        if (image.innerHTML) {
            // @ts-ignore
            media.innerHTML = image.innerHTML;
        } else {
            media.innerHTML = String(image);
        }
        content.appendChild(media);
    }

    if (title || after) {
        const inner = document.createElement('div');
        inner.className = 'item-inner';
        if (title) {
            const titleText = document.createElement('div');
            titleText.className = 'item-title';
            // @ts-ignore
            titleText.innerHTML = title.innerHTML ?? title;
            inner.appendChild(titleText);
        }
        if (after) {
            const afterText = document.createElement('div');
            afterText.className = 'item-after';
            // @ts-ignore
            afterText.appendChild(after);
            inner.appendChild(afterText);
        }
        content.appendChild(inner);
    }

    item.appendChild(content);

    return item;
}

export function renderParameters(actionData: ActionDefinition | null, parameters: ActionParameters): HTMLElement {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    for (let key in parameters) {
        if (key === 'CustomOutputName' || key === 'UUID') {
            continue;
        }
        let value = parameters[key];
        if (actionData && actionData.params && actionData.params[key]) {
            // @ts-ignore
            key = actionData.params[key];
        }
        ul.appendChild(renderListItem(null, key, renderValue(value, key)));
    }
    li.appendChild(ul);

    return li;
}

const contentItemTypes = {
    "WFAppStoreAppContentItem": "App store apps",
    "WFArticleContentItem": "Articles",
    "WFContactContentItem": "Contacts",
    "WFDateContentItem": "Dates",
    "WFEmailAddressContentItem": "Email addresses",
    "WFFolderContentItem": "Folder",
    "WFGenericFileContentItem": "Files",
    "WFImageContentItem": "Images",
    "WFiTunesProductContentItem": "iTunes Products",
    "WFLocationContentItem": "Locations",
    "WFDCMapsLinkContentItem": "Map links",
    "WFAVAssetContentItem": "Media",
    "WFPDFContentItem": "PDFs",
    "WFPhoneNumberContentItem": "Phone numbers",
    "WFRichTextContentItem": "Rich Text",
    "WFSafariWebPageContentItem": "Safari web pages",
    "WFStringContentItem": "Text",
    "WFNumberContentItem": "Number",
    "WFURLContentItem": "URLs",
};

const workflowTypes = {
    "MenuBar": "Menubar",
    "QuickActions": "Quick Actions",
    "ActionExtension": "Share Sheet",
    "NCWidget": "Notifications Center",
    "Sleep": "Sleep Mode",
    "Watch": "Apple Watch",
    "ReceivesOnScreenContent": "What's On Screen",
}

export function renderInputs(shortcut: ShortcutData) {
    if (!shortcut.WFWorkflowHasShortcutInputVariables) {
        return;
    }
    const card = document.createElement('div');
    card.className = 'card sp-linked-action';

    let inputs = [];
    if (shortcut.WFWorkflowInputContentItemClasses) {
        if (shortcut.WFWorkflowInputContentItemClasses.length === Object.keys(contentItemTypes).length) {
            inputs = ['Any'];
        } else {
            if (shortcut.WFWorkflowInputContentItemClasses) {
                for (const input of shortcut.WFWorkflowInputContentItemClasses) {
                    // @ts-ignore
                    inputs.push(contentItemTypes[input]);
                }
            }
        }
    }

    let workflows = [];
    if (shortcut.WFWorkflowTypes) {
        for (const workflow of shortcut.WFWorkflowTypes) {
            // @ts-ignore
            workflows.push(workflowTypes[workflow]);
        }
    }

    const render = renderActionHeader({
            title: 'Receives',
            icon: 'layers_fill',
            color: '#007aff',
            background: 'transparent',
        },
        renderValue(inputs.length !== 0 ? inputs.join(', ') : null, 'No'),
        actionText('input from'),
        renderValue(workflows.length !== 0 ? workflows.join(', ') : null, 'Nowhere')
    );

    card.innerHTML = renderCardContent(render).outerHTML;

    container.appendChild(card);
}
