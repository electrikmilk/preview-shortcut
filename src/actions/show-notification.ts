import {Colors} from "~/colors";
import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface ShowNotificationParameters {
    WFInput: object | string
    WFNotificationActionBody: object | string
    WFNotificationActionTitle: object | string
    WFNotificationActionSound: object | boolean
}

export default {
    title: 'Show notification',
    icon: 'bell_fill',
    background: Colors.Red,
    render(container: HTMLElement, params: ShowNotificationParameters) {
        const action = renderActionHeader(actions['notification'],
            renderValue(params.WFNotificationActionBody, 'Content'),
        );
        action.appendChild(renderParameters(actions['notification'], {
            'Title': params.WFNotificationActionTitle,
            'Play Sound': params.WFNotificationActionSound ?? true,
            'Attachment': params.WFInput
        }));

        return action;
    }
}
