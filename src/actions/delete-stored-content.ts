import {renderValue} from "~/value";
import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";

import {Colors} from "~/colors";

interface DeleteStoredContentParameters {
    WFStoredContentKey: object | string
    WFStoredContentGlobalValue: boolean
}

export default {
    title: "Delete",
    icon: "floppy_disk",
    background: Colors.LightBlue,
    render: (container: HTMLElement, params: DeleteStoredContentParameters) => {
        const action = renderActionHeader(actions['deletestoredcontent'],
            renderValue(params['WFStoredContentKey'], 'Key'),
        )

        action.appendChild(renderParameters(actions['deletestoredcontent'], {
            'Global Value': params.WFStoredContentGlobalValue ?? false,
        }));

        return action;
    }
}
