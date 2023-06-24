interface AttachmentValue {
    string: string
    OutputName: string
    attachmentsByRange: object
}

export function renderValue(value?: any, placeholder?: string): string {
    const container = document.createElement('div');
    console.log(typeof value, value);
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
                    container.innerText = String(value.Value.string);
                } else if (value && value.Value && value.Value.OutputName) {
                    const variable = document.createElement('div');
                    variable.className = 'sp-variable-value';

                    const icon = document.createElement('div');
                    icon.className = 'sp-action-icon sp-variable-icon';
                    const i = document.createElement('i');
                    i.className = 'icon f7-icons';
                    i.innerText = 'f_cursive';
                    icon.appendChild(i);
                    variable.appendChild(icon);

                    const name = document.createElement('div');
                    name.innerText = value.Value.OutputName;
                    variable.appendChild(name);

                    container.appendChild(variable);
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