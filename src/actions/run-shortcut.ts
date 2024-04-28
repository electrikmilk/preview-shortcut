import {renderActionHeader, renderParameters} from "~/render";
import {renderValue} from "~/value";
import {actions} from "~/actions";

interface RunShortcutParameters {
    WFInput: string | object
    WFWorkflowName: string | Object
    WFWorkflow: WFWorkflow
    output: string | object
}

interface WFWorkflow {
    workflowName: string
    isSelf: boolean
}

export default {
    title: "Run",
    icon: "",
    render: (container: HTMLElement, params: RunShortcutParameters) => {
        let shortcut = params.WFWorkflowName ?? params.WFWorkflow.workflowName;

        container.classList.add('sp-shortcut-action');

        const action = renderActionHeader(actions['runworkflow'], renderValue(shortcut, 'Shortcut'));
        action.appendChild(renderParameters(actions['runworkflow'], {
            'Input': params.WFInput,
        }));

        return action;
    }
}
