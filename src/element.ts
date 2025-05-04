export function renderElement(tag: string = 'div', attributes: object = {}, ...elements: HTMLElement[]) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        // @ts-ignore
        element[key] = attributes[key];
    }

    element.append(...elements);

    return element;
}

export function applyStyles(element: HTMLElement, styles: object) {
    for (let property in styles) {
        // @ts-ignore
        element.style[property] = styles[property]
    }
}

export function renderText(text: string) {
    return document.createTextNode(text);
}

export function renderClass(cssClass: string, ...elements: HTMLElement[]) {
    return renderElement('div', {className: cssClass}, ...elements);
}
