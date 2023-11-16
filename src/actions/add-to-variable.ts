import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {SetVariableParameters} from "~/actions/set-variable";
import {actions, actionText} from "~/actions";

export default {
    title: "Add",
    icon: "f_cursive",
    background: "#fc880f",
    render: (container: HTMLElement, params: SetVariableParameters) => {
        return renderActionHeader(actions['appendvariable'],
            renderValue(params['WFInput'], 'Input'),
            actionText('to'),
            renderValue(params['WFVariableName'], 'Variable Name'));
    }
}
