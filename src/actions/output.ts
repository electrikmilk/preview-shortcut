import {renderActionHeader, renderOutputSurfaceBehavior, StopAndOutputParameters} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

export default {
    title: "Stop and output",
    icon: "square_arrow_left",
    background: Colors.Blue,
    render: (container: HTMLElement, params: StopAndOutputParameters) => {
        container.classList.add('sp-output-action');
        const action = renderActionHeader(actions['output'], renderValue(params.WFOutput, 'Output'));

        action.appendChild(
            renderOutputSurfaceBehavior(
                params.WFNoOutputSurfaceBehavior,
                params.WFResponse
            )
        );

        return action;
    }
}
