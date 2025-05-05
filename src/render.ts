import {ActionData, dev, ShortcutData} from "~/main";
import {ActionDefinition, actions, actionText, missingFormalDefinition} from "~/actions";
import {renderUnstyledValue, renderValue} from "~/value";
import {DictionaryItem} from "~/actions/dictionary";
import {applyStyles, renderClass, renderElement, renderText} from "~/element";
import {Colors} from "~/colors";

export let container: HTMLElement;
export let containers: HTMLElement[] = [];
export let containerIndex: number = 0;

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
    actionIndex = 0;
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
            newContainer();
        }
    }
    if (dev) {
        console.groupEnd();
    }
}

export function resetContainers() {
    containers = [];
    containers.push(container);
}

export function newContainer() {
    const renderContainer = renderClass('sp-sub-container')
    container.appendChild(renderContainer);
    containers[++containerIndex] = renderContainer;
    container = renderContainer;
}

export function prevContainer() {
    if (containers.length === 1) {
        return;
    }
    container = containers[--containerIndex];
}

export function setContainer(newContainer: HTMLElement) {
    container = newContainer;
}

function renderCardContent(element: HTMLElement) {
    return renderClass('card-content',
        renderList(element)
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
    if (!actionData && action.WFWorkflowActionIdentifier) {
        missingFormalDefinition(action.WFWorkflowActionIdentifier)
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
            if (paramValue.Value && paramValue.Value.attachmentsByRange) {
                for (const attachment in paramValue.Value.attachmentsByRange) {
                    outputUUIDs.push(paramValue.Value.attachmentsByRange[attachment].OutputUUID);
                }
            }
        }
        if (outputUUIDs.length !== 0) {
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

export function renderContainer(...content: HTMLElement[]) {
    const container = document.createElement('div');

    if (content) {
        const flexbox = document.createElement('div');
        flexbox.style.display = 'flex';
        flexbox.style.gap = '0.3rem 0.5rem';
        flexbox.style.alignItems = 'center';
        flexbox.style.flexWrap = 'wrap';

        flexbox.append(...content);

        container.appendChild(flexbox);
    }

    return renderElement('div', {}, container);
}

export function renderHeader(media: string | null, title: string): HTMLElement {
    const actionTitle = document.createElement('div');
    actionTitle.className = 'sp-action-title';
    actionTitle.innerHTML = title;

    return renderListItem(media, title ? actionTitle.outerHTML : '');
}

export function renderActionContent(...content: HTMLElement[]): HTMLElement {
    return renderClass('sp-action-content', ...content);
}

export function renderList(...content: HTMLElement[]): HTMLElement {
    return renderClass('list',
        renderElement('ul', {}, ...content)
    )
}

export function renderInsetList(...content: HTMLElement[]): HTMLElement {
    return renderClass('list list-strong inset list-dividers',
        renderElement('ul', {}, ...content)
    )
}

export function renderListItem(image?: HTMLElement | string | null, title?: HTMLElement | string, after?: HTMLElement | string): HTMLElement {
    const item = document.createElement('li');
    const content = document.createElement('div');
    content.className = 'item-content';
    content.style.alignItems = 'baseline';

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
            if (title instanceof HTMLElement) {
                inner.appendChild(title);
            } else {
                const titleText = document.createElement('div');
                titleText.className = 'item-title';
                titleText.innerHTML = title;
                inner.appendChild(titleText)
            }
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

const workflows = {
    MenuBar: "MenuBar",
    QuickActions: "QuickActions",
    ActionExtension: "ActionExtension",
    NCWidget: "NCWidget",
    Sleep: "Sleep",
    Watch: "Watch",
    ReceivesOnScreenContent: "ReceivesOnScreenContent",
}

const quickActions = {
    Finder: "Finder",
    Services: "Services",
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
            color: Colors.Blue,
            background: 'transparent',
        },
        renderValue(inputs.length !== 0 ? inputs.filter(i => i).join(', ') : null, 'No'),
        actionText('input from'),
        renderValue(workflows.length !== 0 ? workflows.filter(i => i).join(', ') : null, 'Nowhere')
    );

    render.appendChild(renderShortcutOutputSurfaceBehavior(shortcut))

    card.innerHTML = renderCardContent(render).outerHTML;

    container.appendChild(card);
}

function toggleModal() {
    const modal = document.querySelector('.sp-modal') as HTMLElement;
    if (modal) {
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
    }
}

export function renderDetails(shortcut: ShortcutData): void {
    container.appendChild(renderElement('div', {},
        renderElement('div', {
                className: 'link text-color-blue sp-open-details',
                onclick: toggleModal,
                ariaLabel: 'View Shortcut Details',
                title: 'Shortcut Details',
            },
            renderInlineIcon('info_circle'),
        ),

        renderClass('sp-modal',
            renderClass('sp-modal-content',
                renderElement('div', {style: 'margin:1rem'},
                    renderElement('div', {style: 'text-align:right'},
                        renderElement('div', {
                                className: 'link text-color-blue',
                                onclick: toggleModal,
                            },
                            renderInlineIcon('xmark'),
                        ),
                    ),
                    renderSegmentedControl([
                        {
                            text: 'Details',
                        },
                        {
                            text: 'Setup',
                        },
                    ]),
                ),
                renderClass('tabs',
                    renderElement('div', {
                        className: 'tab tab-active',
                        id: 'tab-details'
                    }, ...renderDetailsTab(shortcut)),
                    renderElement('div', {
                        className: 'tab',
                        id: 'tab-setup',
                    }, ...renderSetupTab(shortcut)),
                ),
            )
        ),
    ))
}

function renderDetailsTab(shortcut: ShortcutData): HTMLElement[] {
    return [
        renderInsetList(
            renderListItem(renderActionIcon('square_arrow_up', 'white', Colors.Blue), 'Show in Share Sheet',
                renderValue(shortcut.WFWorkflowTypes ?
                    shortcut.WFWorkflowTypes.includes(workflows.ActionExtension) : false)
            ),
        ),
        renderBlockHeader('Mac'),
        renderInsetList(
            renderListItem(renderActionIcon('macwindow', 'white', Colors.Gray), 'Pin in Menu Bar',
                renderValue(shortcut.WFWorkflowTypes ?
                    shortcut.WFWorkflowTypes.includes(workflows.MenuBar) : false)
            ),
            renderListItem(renderActionIcon('doc_text_viewfinder', 'white', Colors.Red), 'Receive What\'s On Screen',
                renderValue(shortcut.WFWorkflowTypes ?
                    shortcut.WFWorkflowTypes.includes(workflows.ReceivesOnScreenContent) : false)
            ),
            renderListItem(renderActionIcon('gear_alt_fill', 'white', Colors.Gray), 'Use as a Quick Action',
                renderValue(shortcut.WFWorkflowTypes ?
                    shortcut.WFWorkflowTypes.includes(workflows.QuickActions) : false)
            ),
            renderActionContent(
                renderListItem(null, 'Finder',
                    renderValue(shortcut.WFQuickActionSurfaces ?
                        shortcut.WFQuickActionSurfaces.includes(quickActions.Finder) : false)
                ),
                renderListItem(null, 'Services Menu',
                    renderValue(shortcut.WFQuickActionSurfaces ?
                        shortcut.WFQuickActionSurfaces.includes(quickActions.Finder) : false)
                )
            )
        ),
        renderBlockHeader('Apple Watch'),
        renderInsetList(
            renderListItem(null, 'Show on Apple Watch',
                renderValue(shortcut.WFWorkflowTypes ?
                    shortcut.WFWorkflowTypes.includes(workflows.QuickActions) : false)
            ),
        )
    ];
}

export function renderBlockHeader(header: string): HTMLElement {
    return renderElement('div', {
        className: 'block-header',
        innerText: header.toUpperCase(),
        style: 'text-align:left'
    })
}

function renderSetupTab(shortcut: ShortcutData): HTMLElement[] {
    let questions: HTMLElement[] = [];
    if (shortcut.WFWorkflowActions && shortcut.WFWorkflowImportQuestions) {
        for (let question of shortcut.WFWorkflowImportQuestions) {
            const shortcutAction = shortcut.WFWorkflowActions[question.ActionIndex]
            if (shortcutAction) {
                const identifier = shortcutAction.WFWorkflowActionIdentifier.replace('is.workflow.actions.', '');
                const action = actions[identifier]

                questions.push(renderListItem(
                    renderActionIcon(action.icon, action.color, action.background),
                    renderElement('div', {style: 'text-align: left'},
                        renderElement('div', {className: 'item-title-row'},
                            renderElement('div', {
                                className: 'item-title',
                                innerHTML: `<strong>${action.title}</strong>`
                            })
                        ),
                        actionText('Question:'),
                        renderScrollableContent(
                            renderUnstyledValue(question.Text, 'Question')
                        ),
                        actionText('Default Answer:'),
                        renderScrollableContent(
                            renderUnstyledValue(question.DefaultValue, 'Default Value')
                        )
                    )
                ))
            }
        }
        if (!shortcut.WFWorkflowImportQuestions.length) {
            questions.push(renderListItem(null,
                // @ts-ignore
                renderElement('div', {}, renderText('No import questions')),
            ))
        }
    }

    return [
        renderElement('div', {
                className: 'block',
                style: 'text-align:left;min-width:20rem',
            },
            renderElement('h3', {innerText: 'Import Questions'}),
        ),
        renderInsetList(...questions)
    ];
}

export function renderScrollableContent(...content: HTMLElement[]) {
    return renderClass('sp-scrollable-action-content', ...content)
}

interface SegmentedButton {
    text: string
}

export function renderSegmentedControl(buttons: Array<SegmentedButton>) {
    const segmented = renderElement('p', {className: 'segmented segmented-strong'});
    for (const i in buttons) {
        const props = buttons[i];
        const button = renderElement('a', {
            href: '#tab-' + props.text.toLowerCase(),
            className: 'button tab-link',
            innerText: props.text
        })
        if (i === "0") {
            button.classList.add('button-active');
        }
        button.onclick = () => {
            segmented.querySelectorAll('a')?.forEach(b => b.classList.remove('button-active'));
            button.classList.add('button-active');
        };
        segmented.appendChild(button);
    }
    segmented.appendChild(renderElement('span', {className: 'segmented-highlight'}))

    return segmented
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

    const footer = document.createElement('div');
    footer.className = 'sp-action-list-footer';
    const itemsSize = data.length;
    footer.innerText = itemsSize + ' item' + (itemsSize ? 's' : '');

    return renderElement('div', {},
        table,
        renderClass('treeview', ...renderTreeItems(data)),
        footer
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
            key = renderUnstyledValue(item.WFKey, 'Key')
        } else {
            // @ts-ignore
            key = renderElement('div', {className: 'fade'}, renderText(`Item ${idx}`));
        }

        let values = renderUnstyledValue(item.WFValue, 'Value');
        if (item.WFValue) {
            if (typeof item.WFValue.Value !== 'object') {
                values = renderUnstyledValue(item.WFValue.Value, 'Value');
            }
        }

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


        if (!itemType) {
            itemType = typeof item;
            values = renderUnstyledValue(item);
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

export function renderLabel(label: string, ...children: HTMLElement[]) {

    return renderElement('div',
        {className: 'sp-label'},
        // @ts-ignore
        renderText(label + ':'),
        ...children
    );
}

export function renderInlineIcon(icon: string) {
    return renderElement('i', {className: 'icon f7-icons'},
        // @ts-ignore
        renderText(icon),
    )
}

enum NoInputBehavior {
    ShowError = 'WFWorkflowNoInputBehaviorShowError',
    GetClipboard = 'WFWorkflowNoInputBehaviorGetClipboard',
    AskForInput = 'WFWorkflowNoInputBehaviorAskForInput',
}

export interface WFWorkflowNoInputBehavior {
    Name: NoInputBehavior
    Parameters?: NoInputBehaviorParameters
}

interface NoInputBehaviorParameters {
    Error?: string
    ItemClass?: string
}

export interface StopAndOutputParameters {
    WFOutput: string | object
    WFNoOutputSurfaceBehavior: string
    WFResponse: string | object
}

export function renderOutputSurfaceBehavior(WFNoOutputSurfaceBehavior: any, WFResponse: any = null): HTMLElement {
    const flexbox = renderElement('div')
    applyStyles(flexbox, {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        margin: '0 16px',
        height: '3rem',
    })

    flexbox.appendChild(renderValue(WFNoOutputSurfaceBehavior ?? 'Continue', 'Behavior'));
    if (WFResponse) {
        flexbox.appendChild(renderValue(WFResponse, 'Result'));
    }


    return renderElement('div', {}, renderElement('div', {
        innerText: 'If there\'s nowhere to output:',
        className: 'sp-output-surface-behavior'
    }), flexbox);
}

export function renderShortcutOutputSurfaceBehavior(shortcut: ShortcutData): HTMLElement {
    let behavior: string = "Continue"
    let response: string = ""
    if (shortcut.WFWorkflowNoInputBehavior?.Parameters) {
        switch (shortcut.WFWorkflowNoInputBehavior.Name) {
            case NoInputBehavior.ShowError:
                behavior = 'Stop and Respond'
                if (shortcut.WFWorkflowNoInputBehavior.Parameters?.Error) {
                    response = shortcut.WFWorkflowNoInputBehavior.Parameters.Error
                }
                break;
            case NoInputBehavior.AskForInput:
                behavior = 'Ask For';
                if (shortcut.WFWorkflowNoInputBehavior.Parameters?.ItemClass) {
                    // @ts-ignore
                    response = contentItemTypes[shortcut.WFWorkflowNoInputBehavior.Parameters.ItemClass]
                }
                break;
            case NoInputBehavior.GetClipboard:
                behavior = 'Get Clipboard'
        }
    }

    return renderOutputSurfaceBehavior(behavior, response)
}
