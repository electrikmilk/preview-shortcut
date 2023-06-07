import {preview} from "~/main";
import {ActionDefinition, actions} from "~/actions";
import {renderValue} from "~/value";

interface Action {
    WFWorkflowActionIdentifier: string
    WFWorkflowActionParameters: object
}

export function renderShortcut(actions: Array<Action>) {
    console.group('Render Shortcut');
    actions.forEach((action: Action) => {
        preview?.appendChild(
            renderAction(action)
        );
    });
    console.groupEnd();
}

function renderAction(action: Action): Node {
    console.group(`Render ${action.WFWorkflowActionIdentifier}`);

    const card = document.createElement('div');
    card.className = 'sp-action';

    const content = document.createElement('div');
    content.className = 'sp-action-content';

    const list = document.createElement('div');
    list.className = 'sp-list';

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
    const header = actionData ? renderActionHeader(actionData) : renderHeader(null, identifier);
    ul.appendChild(header);

    if (action.WFWorkflowActionParameters) {
        const paramsli = document.createElement('li');
        const paramsul = document.createElement('ul');
        const params = renderParameters(actionData, action.WFWorkflowActionParameters);
        params.forEach(p => paramsul.appendChild(p));
        paramsli.appendChild(paramsul);
        ul.appendChild(paramsli);
        // ul.appendChild(subul);
        // const li = document.createElement('li');
        // params.forEach(p => subul.appendChild(p));
        // ul.appendChild(li);
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

export function renderActionHeader(actionData: ActionDefinition) {
    const icon = renderActionIcon(actionData.icon ?? 'gear', actionData.color ?? undefined, actionData.background ?? undefined);
    const actionTitle = document.createElement('div');
    actionTitle.className = 'sp-action-title';
    actionTitle.innerHTML = actionData.title ?? '';

    return renderListItem(icon, actionTitle.outerHTML);
}

export function renderHeader(media: string | null, title: string): HTMLElement {
    const actionTitle = document.createElement('div');
    actionTitle.className = 'sp-font-bold';
    actionTitle.innerHTML = title;

    return renderListItem(media, actionTitle.outerHTML);
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
    content.className = 'sp-item-content';

    if (image) {
        const media = document.createElement('div');
        media.className = 'sp-item-media';
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
        inner.className = 'sp-item-inner';
        if (title) {
            const titleText = document.createElement('div');
            titleText.className = 'sp-item-title';
            // @ts-ignore
            titleText.innerHTML = title.innerHTML ?? title;
            inner.appendChild(titleText);
        }
        if (after) {
            const afterText = document.createElement('div');
            afterText.className = 'sp-item-after';
            // @ts-ignore
            afterText.innerHTML = after.innerHTML ?? after;
            inner.appendChild(afterText);
        }
        content.appendChild(inner);
    }

    item.appendChild(content);

    return item;
}

interface ActionParameters {
    [key: string]: any
}

export function renderParameters(actionData: ActionDefinition | null, parameters: ActionParameters): HTMLElement[] {
    let params = [];
    for (let key in parameters) {
        let value = parameters[key];
        if (actionData && actionData.params && actionData.params[key]) {
            // @ts-ignore
            key = actionData.params[key];
        }
        params.push(renderListItem(null, key, renderValue(value)));
    }

    return params;
}
