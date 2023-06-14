import {renderValue} from "~/value";
import {renderActionIcon, renderListItem, renderParameters} from "~/render";
import {actions} from "~/actions";

interface ShowAlertParameters {
    WFAlertActionTitle: string | object
    WFAlertActionMessage: string | object
    WFAlertActionCancelButtonShown: boolean
}

export default {
    render: (container: HTMLElement, params: ShowAlertParameters) => {
        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';
        action.style.gap = '0 10px';

        const header = document.createElement('div');
        header.className = 'sp-action-title';
        header.innerText = 'Show alert';
        action.appendChild(header);

        const varName = document.createElement('div');
        varName.innerHTML = renderValue(params['WFAlertActionMessage'], 'Informational message');
        action.appendChild(varName);

        const list = document.createElement('div');

        const headerItem = renderListItem(renderActionIcon('macwindow', 'white', '#fec303'), action.outerHTML);
        list.appendChild(headerItem);

        const li = document.createElement('li');
        const ul = document.createElement('ul');
        renderParameters(actions['alert'], {
            'Title': params['WFAlertActionTitle'],
            'Show Cancel Button': params['WFAlertActionCancelButtonShown']
        }).forEach(param => ul.appendChild(param));
        li.appendChild(ul);
        list.appendChild(li);

        return list;
    }
}
