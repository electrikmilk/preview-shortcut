import {renderActionHeader, renderParameters} from "~/render";
import {renderValue} from "~/value";
import {actions} from "~/actions";

interface RunShortcutParameters {
    WFInput: string | object
    WFWorkflowName: string | Object
    WFWorkflow: string | object
    output: string | object
}

export default {
    title: "Run",
    icon: "",
    render: (container: HTMLElement, params: RunShortcutParameters) => {
        let shortcut = params['WFWorkflowName'];

        container.classList.add('sp-shortcut-action');

        const action = renderActionHeader(actions['runworkflow'], renderValue(shortcut, 'Shortcut'));
        action.appendChild(renderParameters(actions['alert'], {
            'Input': params.WFInput,
        }));

        return action;
    }
}
