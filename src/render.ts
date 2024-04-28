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
    console.group('Render Shortcut');
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
    console.group(`(${actionIndex}/${actionTotal}) Render ${action.WFWorkflowActionIdentifier}`);

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

function setDictionaryTypeStrings(items: Array<DictionaryItem>) {
    for (let item of items) {
        switch (item.WFItemType) {
            case 0:
                // @ts-ignore
                item.Type = 'Text';
                break;
            case 3:
                // @ts-ignore`
                item.Type = 'Number';
                break;
            case 2:
                // @ts-ignore
                item.Type = 'Array';
                break;
            case 1:
                // @ts-ignore
                item.Type = 'Dictionary';
                break;
            case 4:
                // @ts-ignore
                item.Type = 'Boolean';
        }

        item.Key = item.WFKey;
        item.Value = item.WFValue;
        // @ts-ignore
        delete item.WFKey;
        // @ts-ignore
        delete item.WFItemType;
        // @ts-ignore
        delete item.WFValue;

        // @ts-ignore
        if (item.Value.Value["WFDictionaryFieldValueItems"]) {
            // @ts-ignore
            item.Value.Value["WFDictionaryFieldValueItems"] = setDictionaryTypeStrings(item.Value.Value["WFDictionaryFieldValueItems"]);
        }

        if (item.Type === 'Array') {
            // @ts-ignore
            item.Value.Value = setDictionaryTypeStrings(item.Value.Value);
        }
    }

    return items;
}

export function renderDictionary(data: Array<DictionaryItem>) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Key</th><th>Type</th><th>Value</th></tr>';
    table.appendChild(thead);

    data = setDictionaryTypeStrings(data);

    return renderElement('div', {},
        table,
        renderClass('treeview', ...renderTreeItems(data))
    )
}

export function renderTreeItems(data: Array<DictionaryItem>) {
    let items: HTMLElement[] = [];
    for (let item of data) {
        let children: HTMLElement[] = [];

        const key = renderValue(item.Key)
        key.classList.add('sp-unstyled-value');

        let values = renderValue(item.Value);
        if (item.Value) {
            if (typeof item.Value.Value !== 'object') {
                values = renderValue(item.Value.Value);
            }
        }
        values.classList.add('sp-unstyled-value');

        if (item.Type === 'Dictionary' || item.Type === 'Array') {
            let items: DictionaryItem[] = [];

            if (item.Type === 'Dictionary') {
                // @ts-ignore
                items = item.Value.Value["Value"]["WFDictionaryFieldValueItems"];
            }
            if (item.Type === 'Array') {
                // @ts-ignore
                items = item.Value.Value;
            }

            // @ts-ignore
            children.push(...renderTreeItems(items));
            // @ts-ignore
            values = renderElement('div', {className: 'fade'}, renderText(`${items.length} items`));
        }

        items.push(renderTreeItem([
            renderElement('div', {className: 'tree-row'},
                key,
                // @ts-ignore
                renderElement('div', {className: 'fade'}, renderText(item.Type)),
                values,
            ),
        ], ...children));
    }

    return items;
}

export function renderTreeItem(contents: HTMLElement[], ...children: HTMLElement[]): HTMLElement {
    const toggle = renderClass('treeview-toggle');
    toggle.onclick = (e) => {
        console.log(e);
    };

    return renderClass('treeview-item',
        renderClass('treeview-item-root',
            toggle,
            renderClass('treeview-item-content',
                renderClass('treeview-item-label', ...contents)
            )
        ),
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
