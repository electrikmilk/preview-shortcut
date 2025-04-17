import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

export interface SetVariableParameters {
    WFVariableName: string | object
    WFInput: string | object
}

export default {
    title: "Set variable",
    icon: "f_cursive",
    background: Colors.Orange,
    render: (container: HTMLElement, params: SetVariableParameters) => {
        return renderActionHeader(actions['setvariable'],
            renderValue(params['WFVariableName'], 'Variable Name'),
            actionText('to'),
            renderValue(params['WFInput'] ?? null, 'Input'),
        );
    }
}
