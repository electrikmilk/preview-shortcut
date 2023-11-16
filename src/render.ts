import {ActionData, container} from "~/main";
import {ActionDefinition, actions} from "~/actions";
import {renderValue} from "~/value";

interface ActionParameters {
    [key: string]: any
}

export function renderShortcut(actions: Array<ActionData>) {
    console.group('Render Shortcut');
    actions.forEach((action: ActionData) => {
        container?.appendChild(
            renderAction(action)
        );
    });
    console.groupEnd();
}

function renderAction(action: ActionData): Node {
    console.group(`Render ${action.WFWorkflowActionIdentifier}`);

    const card = document.createElement('div');
    card.className = 'card';

    const content = document.createElement('div');
    content.className = 'card-content';

    const list = document.createElement('div');
    list.className = 'list';

    const ul = document.createElement('ul');

    let identifier = action.WFWorkflowActionIdentifier.replace('is.workflow.actions.', '');

    let actionData = null;
    if (actions[identifier]) {
        console.log('Found definition.');
        actionData = actions[identifier];
        if (actionData.title) {
            identifier = actionData.title;
        }
    }
    if (actionData && actionData.render) {
        const items = actionData.render(card, action.WFWorkflowActionParameters ?? []);
        ul.innerHTML = items.innerHTML;
        list.appendChild(ul);
        content.appendChild(list);
        card.appendChild(content);

        console.log('Rendered by definition function.');
        console.groupEnd();
        return card;
    }
    const header = actionData ? renderActionHeader(actionData) : renderHeader(renderActionIcon('gear', 'white', 'darkgray'), identifier);
    ul.appendChild(header);

    if (action.WFWorkflowActionParameters) {
        ul.appendChild(renderParameters(actionData, action.WFWorkflowActionParameters));
    }
    list.appendChild(ul);
    content.appendChild(list);
    card.appendChild(content);

    console.log('Automatically rendered.');
    console.groupEnd();

    return card;
}

export function renderActionIcon(icon: string = 'gear', color?: string, background?: string): string {
    const actionIcon = document.createElement('div');
    actionIcon.className = 'sp-action-icon';
    if (background) {
        actionIcon.style.background = background;
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
