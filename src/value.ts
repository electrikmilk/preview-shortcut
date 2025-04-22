import {contentItemTypes, renderDictionary, renderInlineIcon} from "~/render";
import {Aggrandizement} from "~/actions/dictionary";
import {renderElement} from "~/element";

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

function getAggrandizements(aggrandizements: Aggrandizement[]): string {
    let varRef = ""
    if (aggrandizements && arguments.length) {
        for (let aggr of aggrandizements) {
            if (aggr.PropertyName) {
                varRef += aggr.PropertyName;
            }

            switch (aggr.Type) {
                case 'WFDictionaryValueVariableAggrandizement':
                    // @ts-ignore
                    varRef += ` (${aggr.DictionaryKey})`;
                    break;
                case 'WFCoercionVariableAggrandizement':
                    // @ts-ignore
                    varRef += ` (${contentItemTypes[aggr.CoercionItemClass]})`;
                    break;
            }
        }
    }

    return varRef
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
            let str = escapeHTML(String(value.Value.string));
            for (let v in value.Value.attachmentsByRange) {
                let attachment = value.Value.attachmentsByRange[v];
                let varTypeName = attachment.OutputName ?? attachment.Variable ?? attachment.VariableName ?? attachment.PropertyName;
                varTypeName += getAggrandizements(attachment.Aggrandizements)

                const inlineVar = renderInlineVariable(varTypeName, attachment.Type);
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

        if (value.Value.Aggrandizements) {
            varName += getAggrandizements(value.Value.Aggrandizements)
        }

        if (value.Value.Value && value.Value.Value.WFDictionaryFieldValueItems) {
            container.appendChild(renderDictionary(value.Value.Value.WFDictionaryFieldValueItems))
        }
    } else if (value.Variable) {
        const variableValue = value.Variable.Value;
        varName = variableValue.VariableName ?? variableValue.OutputName ?? variableValue.PropertyName;
        varType = variableValue.Type;
        if (value.Variable.Value.Aggrandizements) {
            varName += getAggrandizements(value.Variable.Value.Aggrandizements)
        }
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

function escapeHTML(unsafe: string): string {
    return unsafe.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
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

    const variable = renderElement('div', {className: 'sp-variable-value'});

    if (char) {
        switch (char) {
            case 'DeviceDetails':
                varName = 'Device';
                break;
            case 'ActionOutput':
                break;
            case'ExtensionInput':
                varName = 'Shortcut Input';
                break;
            case 'CurrentDate':
                varName = 'Current Date';
                break;
            default:
                if (varName === "") {
                    varName = char
                }
        }
        char = variableIcon(char);
    }
    const icon = renderElement('div', {className: 'sp-action-icon sp-variable-icon'});
    icon.appendChild(renderInlineIcon(char ?? 'f_cursive'));

    if (char) {
        icon.classList.add(char);
    }

    variable.append(icon, renderElement('div', {innerText: varName}));

    return variable;
}

export interface ContactValue {
    EntryType: Number
    SerializedEntry: object
}

const EmailAddressEntry = 2;
const PhoneNumberEntry = 1;

export function renderContactValue(value: object, entryType: Number): HTMLElement {
    let key: string
    switch (entryType) {
        case EmailAddressEntry:
            key = "link.contentkit.emailaddress";
            break;
        case PhoneNumberEntry:
            key = "link.contentkit.phonenumber";
            break;
    }

    // @ts-ignore
    return renderValue(value[key]);
}
