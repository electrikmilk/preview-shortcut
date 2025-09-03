import {contentItemTypes, getActionByUUID, renderDictionary, renderInlineIcon} from "~/render";
import {Aggrandizement, Value} from "~/actions/dictionary";
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

export function renderUnstyledValue(value?: any, placeholder: string = 'Value') {
    const renderedValue = renderValue(value, placeholder);
    renderedValue.classList.add('sp-value', 'sp-unstyled-value');
    return renderedValue;
}

function getAggrandizements(aggrandizements: Aggrandizement[]): string {
    let varRef = ""
    if (aggrandizements && arguments.length) {
        let getAs: string = ""
        let coerce: string = ""
        for (let aggr of aggrandizements) {
            if (aggr.PropertyName) {
                getAs = aggr.PropertyName
            }

            switch (aggr.Type) {
                case 'WFDictionaryValueVariableAggrandizement':
                    // @ts-ignore
                    getAs = aggr.DictionaryKey
                    break;
                case 'WFCoercionVariableAggrandizement':
                    // @ts-ignore
                    coerce = contentItemTypes[aggr.CoercionItemClass]
                    break;
            }
        }
        if (getAs.length) {
            varRef += ` (${getAs})`
        }
        if (coerce.length) {
            varRef += ` (${coerce})`
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
    let varUUID;
    let prompt;
    let aggrandizements: Aggrandizement[] = []
    if (value.Value) {
        if (value.Value.attachmentsByRange) {
            let str = escapeHTML(String(value.Value.string));
            for (let v in value.Value.attachmentsByRange) {
                let attachment = value.Value.attachmentsByRange[v];
                let varTypeName = attachment.OutputName ?? attachment.Variable ?? attachment.VariableName ?? attachment.PropertyName;

                const inlineVar = renderInlineRef(attachment.Aggrandizements, varTypeName, attachment.Type, attachment.OutputUUID);
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
        varUUID = value.Value.OutputUUID ?? value.Value.UUID;
        prompt = value.Value?.Prompt;

        if (value.Value.Aggrandizements) {
            aggrandizements = value.Value.Aggrandizements
        }

        if (value.Value.Value && value.Value.Value.WFDictionaryFieldValueItems) {
            container.appendChild(renderDictionary(value.Value.Value.WFDictionaryFieldValueItems))
            return;
        }
    } else if (value.Variable) {
        const variableValue = value.Variable.Value;
        varName = variableValue.VariableName ?? variableValue.OutputName ?? variableValue.PropertyName;
        varType = variableValue.Type;
        varUUID = variableValue.OutputUUID
        if (value.Variable.Value.Aggrandizements) {
            aggrandizements = value.Variable.Value.Aggrandizements
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
        renderInlineRef(aggrandizements, varName, varType, varUUID, prompt),
    );
}

function escapeHTML(unsafe: string): string {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

function globalIcon(valueType: string) {
    let icon = 'f_cursive';
    if (valueType !== 'Variable') {
        icon = 'globe';
    }
    switch (valueType) {
        case 'DeviceDetails':
            return 'desktopcomputer';
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

const globals = ['DeviceDetails', 'ExtensionInput', 'CurrentDate', 'Ask', 'Clipboard'];

function renderInlineRef(aggrandizements: Aggrandizement[], varName: string, type?: string, uuid?: string, prompt?: string) {
    let char = 'f_cursive';

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
    const icon = renderElement('div', {className: 'sp-action-icon sp-variable-icon'});

    if (type) {
        switch (type) {
            case 'DeviceDetails':
                varName = 'Device Details';
                break;
            case 'ActionOutput':
                char = 'wand_stars';
                if (uuid) {
                    const attachmentAction = getActionByUUID(uuid)
                    if (attachmentAction?.icon) {
                        char = attachmentAction.icon;
                    }
                    if (attachmentAction?.background) {
                        icon.style.backgroundColor = attachmentAction?.background;
                    }
                }
                break;
            case 'ExtensionInput':
                varName = 'Shortcut Input';
                break;
            case 'CurrentDate':
                varName = 'Current Date';
                break;
            default:
                if (!varName) {
                    varName = type
                }
        }
        if (globals.includes(type)) {
            char = globalIcon(type);
        }
    }

    icon.appendChild(renderInlineIcon(char));

    if (char) {
        icon.classList.add(char);
    }
    if (prompt) {
        varName += `: "${prompt}"`;
    }
    if (aggrandizements) {
        varName += getAggrandizements(aggrandizements)
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

export function toPercentage(value: number = 0) {
    return `${Math.floor(value * 100)}%`
}

export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}
