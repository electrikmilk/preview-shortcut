import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface RunShortcutParameters {
    WFInput: string | object
    WFWorkflow: string | object
    output: string | object
}

export default {
    title: "Run",
    icon: "",
    render: (container: HTMLElement, params: RunShortcutParameters) => {
        container.classList.add('sp-shortcut-action');

        const action = renderActionHeader(actions['runworkflow'], renderValue(params['WFInput'], 'Informational message'));
        action.appendChild(renderParameters(actions['alert'], {
            'Input': params['WFInput'],
        }));

        return action;
    }
}
