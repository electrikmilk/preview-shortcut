import {contentItemTypes} from "~/render";

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
    if (!value) {
        container.innerText = '';
        return;
    }

    let varName;
    let varType;
    if (value.Value) {
        if (value.Value.attachmentsByRange) {
            let str = String(value.Value.string);
            for (let v in value.Value.attachmentsByRange) {
                let variable = value.Value.attachmentsByRange[v];
                let varTypeName = variable.OutputName ?? variable.Variable ?? variable.VariableName ?? variable.PropertyName;
                if (variable.Aggrandizements && variable.Aggrandizements.length) {
                    const aggrandizements = variable.Aggrandizements[0];
                    switch (aggrandizements.Type) {
                        case 'WFDictionaryValueVariableAggrandizement':
                            // @ts-ignore
                            varTypeName += ` (${aggrandizements.DictionaryKey})`;
                            break;
                        case 'WFCoercionVariableAggrandizement':
                            // @ts-ignore
                            varTypeName += ` (${contentItemTypes[aggrandizements.CoercionItemClass]})`;
                            break;
                    }
                    if (aggrandizements.PropertyName) {
                        varTypeName = aggrandizements.PropertyName;
                    }
                }
                const inlineVar = renderInlineVariable(varTypeName, variable.Type);
                str = str.replace('\uFFFC', inlineVar.outerHTML);
            }
            container.innerHTML = str;
            return;
        }

        if (value.Value["string"]) {
            container.innerHTML = value.Value["string"];
            return;
        }

        varName = value.Value.VariableName ?? value.Value.OutputName ?? value.Value.PropertyName;
        varType = value.Value.Type;
    } else if (value.Variable) {
        const variableValue = value.Variable.Value;
        varName = variableValue.VariableName ?? variableValue.OutputName ?? variableValue.PropertyName;
        varType = variableValue.Type;
    } else if (value.workflowName) {
        container.innerText = value.workflowName;
        return;
    } else {
        container.innerText = '[Unsupported Object]';
        return;
    }

    if (!varName && varType === 'ExtensionInput') {
        varName = "Shortcut Input"
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
        case 'Ask':
            return 'text_bubble';
        case 'Clipboard':
            return 'doc_on_clipboard';
        case 'CurrentDate':
            return 'calendar';
        default:
            return icon;
    }
}

function renderInlineVariable(varName: string, char?: string) {
    switch (varName) {
        case 'ShortcutInput':
            varName = 'Shortcut Input';
            break;
        case 'DeviceDetails':
            varName = 'Device Details';
            break;
        case 'CurrentDate':
            varName = 'Current Date';
            break;
        case 'Ask':
            varName = 'Ask Each Time';
    }

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

    if (char) {
        icon.classList.add(char);
    }

    variable.appendChild(icon);
    const name = document.createElement('div');
    name.innerText = varName;
    variable.appendChild(name);

    return variable;
}
