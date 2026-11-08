import {renderValue} from "~/value";
import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";

import {Colors} from "~/colors";

interface SetStoredContentParameters {
    WFStoredContentKey: object | string
    WFInput: object | string
    WFStoredContentGlobalValue: boolean
}

export default {
    title: "Store",
    icon: "floppy_disk",
    background: Colors.LightBlue,
    render: (container: HTMLElement, params: SetStoredContentParameters) => {
        const action = renderActionHeader(actions['setstoredcontent'],
            renderValue(params['WFInput'], 'Content'),
            actionText('as'),
            renderValue(params['WFStoredContentKey'], 'Key'));

        action.appendChild(renderParameters(actions['setstoredcontent'], {
            'Global Value': params.WFStoredContentGlobalValue ?? false,
        }));

        return action;
    }
}
