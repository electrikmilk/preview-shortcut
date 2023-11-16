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
        const action = renderActionHeader(actions['alert'], renderValue(params['WFAlertActionMessage'], 'Informational message'));
        action.appendChild(renderParameters(actions['alert'], {
            'Title': params['WFAlertActionTitle'],
            'Show Cancel Button': params['WFAlertActionCancelButtonShown'] ?? true
        }));

        return action;
    }
}
