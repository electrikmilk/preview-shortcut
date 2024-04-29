import {
    ActionData,
    container,
    containerIndex,
    dev,
    newContainer,
    prevContainer,
    resetContainers,
    ShortcutData
} from "~/main";
import {ActionDefinition, actions, actionText} from "~/actions";
import {renderValue} from "~/value";
import {DictionaryItem} from "~/actions/dictionary";
import {renderClass, renderElement, renderText} from "~/element";

interface ActionParameters {
    [key: string]: any
}

export const controlFlowStart = 0;
export const controlFlowItem = 1;
export const controlFlowEnd = 2;

let actionIndex = 0;
let actionTotal = 0;

export function renderShortcut(shortcutActions: Array<ActionData>) {
    if (dev) {
        console.group('Render Shortcut');
    }
    actionTotal = shortcutActions.length;
    for (const action of shortcutActions) {
        actionIndex++;

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
    if (dev) {
        console.groupEnd();
    }
}

function renderCardContent(element: HTMLElement) {
    return renderClass('card-content',
        renderClass('list',
            renderElement('ul', {},
                element,
            )
        )
    )
}

function renderAction(identifier: string, action: ActionData): Node {
    if (dev) {
        console.group(`(${actionIndex}/${actionTotal}) Render ${action.WFWorkflowActionIdentifier}`);
    }

    const card = document.createElement('div');
    card.className = 'card';

    renderActionConnection(card, action);

    let actionData = null;
    if (actions[identifier]) {
        if (dev) {
            console.log('Found definition.');
        }
        actionData = actions[identifier];
        if (actionData.title) {
            identifier = actionData.title;
        }
    }
    if (actionData && actionData.render) {
        card.innerHTML = renderCardContent(actionData.render(card, action.WFWorkflowActionParameters ?? [])).outerHTML;

        if (dev) {
            console.log('Rendered by definition function.');
            console.groupEnd();
        }

        return card;
    }
    const auto = document.createElement('div');
    const header = actionData ? renderActionHeader(actionData) : renderHeader(renderActionIcon('gear', 'white', 'darkgray'), identifier);
    auto.appendChild(header);
    if (action.WFWorkflowActionParameters) {
        auto.appendChild(renderParameters(actionData, action.WFWorkflowActionParameters));
    }
    card.appendChild(renderCardContent(auto));

    if (dev) {
        console.log('Automatically rendered.');
        console.groupEnd();
    }

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
        flexbox.style.gap = '0.3rem 0.5rem';
        flexbox.style.alignItems = 'center';
        flexbox.style.flexWrap = 'wrap';

        if (actionData.title) {
            flexbox.appendChild(actionTitle);
        }
        flexbox.append(...content);

        container.appendChild(flexbox);
    } else if (actionData.title) {
        container.appendChild(actionTitle);
    }

    const headerListItem = renderListItem(icon, container.innerHTML);
    headerListItem.classList.add('action-header');

    return headerListItem;
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

export const contentItemTypes = {
    "WFAppStoreAppContentItem": "App store app",
    "WFArticleContentItem": "Article",
    "WFContactContentItem": "Contact",
    "WFDateContentItem": "Date",
    "WFEmailAddressContentItem": "Email address",
    "WFDictionaryContentItem": "Dictionary",
    "WFFolderContentItem": "Folder",
    "WFGenericFileContentItem": "File",
    "WFImageContentItem": "Image",
    "WFiTunesProductContentItem": "iTunes Product",
    "WFLocationContentItem": "Location",
    "WFDCMapsLinkContentItem": "Map link",
    "WFAVAssetContentItem": "Media",
    "WFPDFContentItem": "PDF",
    "WFPhoneNumberContentItem": "Phone number",
    "WFRichTextContentItem": "Rich Text",
    "WFSafariWebPageContentItem": "Safari web page",
    "WFStringContentItem": "Text",
    "WFNumberContentItem": "Number",
    "WFURLContentItem": "URL",
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

enum ItemType {
    Text = 0,
    Number = 3,
    Array = 2,
    Dictionary = 1,
    Boolean = 4
}

export function renderDictionary(data: Array<DictionaryItem>) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Key</th><th>Type</th><th>Value</th></tr>';
    table.appendChild(thead);

    return renderElement('div', {},
        table,
        renderClass('treeview', ...renderTreeItems(data))
    )
}

export function renderTreeItems(data: Array<DictionaryItem>) {
    let items: HTMLElement[] = [];
    let idx = 0;
    for (let item of data) {
        idx++;

        let children: HTMLElement[] = [];

        let key = null;
        if (item.WFKey) {
            key = renderValue(item.WFKey, 'Key')
            key.classList.add('sp-unstyled-value');
        } else {
            // @ts-ignore
            key = renderElement('div', {className: 'fade'}, renderText(`Item ${idx}`));
        }

        let values = renderValue(item.WFValue, 'Value');
        if (item.WFValue) {
            if (typeof item.WFValue.Value !== 'object') {
                values = renderValue(item.WFValue.Value, 'Value');
            }
        }
        values.classList.add('sp-unstyled-value');

        if (item.WFItemType === ItemType.Dictionary || item.WFItemType === ItemType.Array) {
            let items: DictionaryItem[] = [];

            if (item.WFItemType === ItemType.Dictionary) {
                // @ts-ignore
                items = item.WFValue.Value.Value["WFDictionaryFieldValueItems"];
            }
            if (item.WFItemType === ItemType.Array) {
                // @ts-ignore
                items = item.WFValue.Value;
            }

            // @ts-ignore
            children.push(...renderTreeItems(items));
            // @ts-ignore
            values = renderElement('div', {className: 'fade'}, renderText(`${items.length} items`));
        }

        let itemType;
        switch (item.WFItemType) {
            case ItemType.Number:
                itemType = 'Number';
                break;
            case ItemType.Dictionary:
                itemType = 'Dictionary';
                break;
            case ItemType.Boolean:
                itemType = 'Boolean';
                break;
            case ItemType.Array:
                itemType = 'Array';
                break;
            case ItemType.Text:
                itemType = 'Text';
                break;
        }

        items.push(renderTreeItem([
            renderElement('div', {className: 'tree-row'},
                key,
                // @ts-ignore
                renderElement('div', {}, renderText(itemType)),
                values,
            ),
        ], ...children));
    }

    return items;
}

export function renderTreeItem(contents: HTMLElement[], ...children: HTMLElement[]): HTMLElement {
    let itemRoot: HTMLElement[] = [];
    if (children.length !== 0) {
        itemRoot.push(renderClass('treeview-toggle'));
    }

    itemRoot.push(renderClass('treeview-item-content',
        renderClass('treeview-item-label', ...contents)
    ));

    return renderClass('treeview-item',
        renderClass('treeview-item-root', ...itemRoot),
        renderClass('treeview-item-children', ...children)
    );
}

export function renderTable(data: Array<Object>, callback: Function) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const theadRow = document.createElement('tr');
    const keys = Object.keys(data[0]);
    for (const key of keys) {
        const th = document.createElement('th');
        th.innerHTML = key;
        theadRow.appendChild(th);
    }
    thead.appendChild(theadRow);
    table.appendChild(thead);


    const tbody = document.createElement('tbody');
    for (let item of data) {
        const tr = document.createElement('tr');

        for (const key in item) {
            // @ts-ignore
            tr.appendChild(renderElement('td', callback(key, item[key])));
        }

        tbody.appendChild(tr);
    }

    const footer = document.createElement('tr');
    footer.className = 'sp-action-list-footer';
    const itemsSize = data.length;
    const s = itemsSize ? 's' : null;
    footer.innerHTML = `<td>${itemsSize} item${s}</td><td></td><td></td>`;
    tbody.appendChild(footer);

    table.appendChild(tbody);

    const container = document.createElement('div');
    container.className = 'table-container';
    container.appendChild(table);

    return container;
}
