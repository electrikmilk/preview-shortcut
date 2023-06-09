interface AttachmentValue {
    string: string
    OutputName: string
    attachmentsByRange: object
}

export function renderValue(value?: any, placeholder?: string): string {
    const container = document.createElement('div');
    if (value || typeof value === 'boolean' || value === 0) {
        container.className = 'sp-value';
        switch (typeof value) {
            case 'string':
                container.innerHTML = value;
                break;
            case 'number':
                container.innerHTML = `${value}`;
                break;
            case 'boolean':
                container.className = '';

                const label = document.createElement('label');
                label.className = 'toggle';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                if (value) {
                    checkbox.setAttribute('checked', '');
                }
                label.appendChild(checkbox);

                const icon = document.createElement('span');
                icon.className = 'toggle-icon';
                label.appendChild(icon);

                container.appendChild(label);
                break
            case 'object':
                if (Array.isArray(value)) {
                    container.innerText = '[Array]';
                } else if (value && value.Value && value.Value.attachmentsByRange) {
                    let str = String(value.Value.string);
                    for (let v in value.Value.attachmentsByRange) {
                        let variable = value.Value.attachmentsByRange[v];
                        if (variable.Type === 'Variable') {
                            const inlineVar = renderInlineVariable(variable.VariableName);
                            str = str.replace('\uFFFC', inlineVar.outerHTML);
                        } else {
                            const inlineVar = renderInlineVariable(variable.VariableName, 'globe');
                            str = str.replace('\uFFFC', inlineVar.outerHTML);
                        }
                    }
                    container.innerHTML = str;
                } else if (value && value.Value && value.Value.OutputName) {
                    const inlineVar = renderInlineVariable(value.Value.OutputName);
                    container.appendChild(inlineVar);
                } else if (value && value.Variable) {
                    const inlineVar = renderInlineVariable(value.Variable.Value.VariableName);
                    container.appendChild(inlineVar);
                } else {
                    container.innerText = '[Object]';
                }
                break;
            default:
                container.innerText = '[Object]';
        }
    } else if (placeholder) {
        container.className = 'sp-placeholder-value';
        container.innerHTML = placeholder;
    }
    return container.outerHTML;
}

function renderInlineVariable(v: string, char?: string) {
    const variable = document.createElement('div');
    variable.className = 'sp-variable-value';

    const icon = document.createElement('div');
    icon.className = 'sp-action-icon sp-variable-icon';
    const i = document.createElement('i');
    i.className = 'icon f7-icons';
    i.innerText = char ?? 'f_cursive';
    icon.appendChild(i);

    variable.appendChild(icon);
    const name = document.createElement('div');
    name.innerText = v;
    variable.appendChild(name);

    return variable;
}
