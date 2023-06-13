import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface SetVariableParameters {
    WFVariableName: string | object
    WFInput: string | object
}

export default {
    title: 'Set Variable',
    params: {
        'WFTextActionText': 'Text'
    },
    render: (container: HTMLElement, params: SetVariableParameters) => {
        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';
        action.style.gap = '0 10px';

        const header = document.createElement('div');
        header.innerText = 'Set variable';
        action.appendChild(header);

        const varName = document.createElement('div');
        varName.innerHTML = renderValue(params['WFVariableName'], 'Variable Name');
        action.appendChild(varName);

        const to = document.createElement('div');
        to.innerText = 'to';
        to.className = 'shortcut-action-text';
        action.appendChild(to);

        const varValue = document.createElement('div');
        varValue.style.display = 'inline-block';
        varValue.innerHTML = renderValue(params['WFInput'] ?? null, 'Input');
        action.appendChild(varValue);

        return renderListItem(renderActionIcon('f_cursive', 'white', '#fc880f'), action.outerHTML);
    }
}