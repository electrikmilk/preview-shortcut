import {renderValue} from "~/value";
import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";

import {Colors} from "~/colors";

interface GetStoredContentParameters {
    WFStoredContentKey: object | string
    WFStoredContentGlobalValue: boolean
}

export default {
    title: "Get",
    icon: "floppy_disk",
    background: Colors.LightBlue,
    render: (container: HTMLElement, params: GetStoredContentParameters) => {
        const action = renderActionHeader(actions['getstoredcontent'],
            renderValue(params['WFStoredContentKey'], 'Key'),
        )
        action.appendChild(renderParameters(actions['getstoredcontent'], {
            'Global Value': params.WFStoredContentGlobalValue ?? false,
        }));

        return action;
    },
}
