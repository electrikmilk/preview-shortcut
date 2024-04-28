export function renderElement(tag: string, attributes: object, ...elements: HTMLElement[]) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        // @ts-ignore
        element[key] = attributes[key];
    }

    element.append(...elements);

    return element;
}

export function renderText(text: string) {
    return document.createTextNode(text);
}

export function renderClass(cssClass: string, ...elements: HTMLElement[]) {
    return renderElement('div', {className: cssClass}, ...elements);
}
