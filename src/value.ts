export function renderValue(value?: any, placeholder: string = 'Value'): HTMLElement {
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
                renderObjectValue(container, value);
                break;
            default:
                container.innerText = '[Unsupported Value]';
        }
    } else if (placeholder) {
        container.className = 'sp-placeholder-value';
        container.innerHTML = placeholder;
    }
    return container;
}

function renderObjectValue(container: HTMLElement, value?: any) {
    if (!value || !value.Value) {
        container.innerText = '[Empty Value]';
        return;
    }

    let varName;
    let varType;
    if (value.Value.attachmentsByRange) {
        let str = String(value.Value.string);
        for (let v in value.Value.attachmentsByRange) {
            let variable = value.Value.attachmentsByRange[v];
            let varTypeName = variable.OutputName ?? variable.VariableName ?? variable.PropertyName;
            if (variable.Aggrandizements) {
                const aggrandizements = variable.Aggrandizements[0];
                switch (aggrandizements.Type) {
                    case 'WFCoercionVariableAggrandizement':
                        varTypeName += `as ${aggrandizements.CoercionItemClass}`;
                        break;
                }
            }
            const inlineVar = renderInlineVariable(varTypeName, variable.Type);
            str = str.replace('\uFFFC', inlineVar.outerHTML);
        }
        container.innerHTML = str;
        return;
    } else if (value.Value) {
        varName = value.Value.VariableName ?? value.Value.OutputName;
        varType = value.Value.Type;
    } else if (value.Variable) {
        varName = value.Variable.Value.VariableName;
        varType = value.Variable.Value.Type;
    } else {
        container.innerText = '[Unsupported Object]';
        return;
    }

    container.appendChild(
        renderInlineVariable(varName, varType),
    );
}

function variableIcon(valueType: string) {
    let icon = 'f_cursive';
    if (valueType !== 'Variable') {
        icon = 'globe';
    }
    switch (valueType) {
        case 'DeviceDetails':
            return 'desktopcomputer';
        case 'ActionOutput':
            return 'wand_stars';
        case'ExtensionInput':
            return 'layers_fill';
        default:
            return icon;
    }
}

function renderInlineVariable(v: string, char?: string) {
    const variable = document.createElement('div');
    variable.className = 'sp-variable-value';

    if (char) {
        char = variableIcon(char);
    }
    const icon = document.createElement('div');
    icon.className = 'sp-action-icon sp-variable-icon';
    const i = document.createElement('i');
    i.className = 'icon f7-icons';
    i.innerText = char ?? 'f_cursive';
    icon.appendChild(i);

    if (char && char === 'wand_stars') {
        icon.style.backgroundColor = '#8e8e93';
    }

    variable.appendChild(icon);
    const name = document.createElement('div');
    name.innerText = v;
    variable.appendChild(name);

    return variable;
}
