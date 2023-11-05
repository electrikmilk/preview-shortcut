import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface ShowAlertParameters {
    WFAlertActionTitle: string | object
    WFAlertActionMessage: string | object
    WFAlertActionCancelButtonShown: boolean
}

export default {
    title: "Show alert",
    icon: "macwindow",
    background: "#fec303",
    render: (container: HTMLElement, params: ShowAlertParameters) => {
        const list = renderActionHeader(actions['alert'], renderValue(params['WFAlertActionMessage'], 'Informational message'));
        const li = document.createElement('li');
        const ul = document.createElement('ul');
        renderParameters(actions['alert'], {
            'Title': params['WFAlertActionTitle'],
            'Show Cancel Button': params['WFAlertActionCancelButtonShown'] ?? true
        }).forEach(param => ul.appendChild(param));
        li.appendChild(ul);
        list.appendChild(li);

        return list;
    }
}
