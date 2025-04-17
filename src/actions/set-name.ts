import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

interface SetNameParameters {
    WFInput: string,
    WFName: string,
    WFDontIncludeFileExtension: boolean,
}

export default {
    title: "Set name",
    icon: "text_cursor",
    background: Colors.Gray,
    render: (container: HTMLElement, params: SetNameParameters) => {
        const action = renderActionHeader(actions['setitemname'],
            renderValue(params['WFInput'], 'Input'),
            actionText("to"),
            renderValue(params['WFName'], 'Name')
        );
        action.appendChild(renderParameters(actions['setitemname'], {
            'Don\'t Include File Extension': params['WFDontIncludeFileExtension'] ?? false,
        }));

        return action;
    }
}