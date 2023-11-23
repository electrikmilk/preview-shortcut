import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface ShowAlertParameters {
    WFOutput: string | object
    WFNoOutputSurfaceBehavior: string
    WFResponse: string | object
}

export default {
    title: "Stop and output",
    icon: "square_arrow_left",
    background: "#007aff",
    render: (container: HTMLElement, params: ShowAlertParameters) => {
        container.classList.add('sp-output-action');
        const action = renderActionHeader(actions['output'], renderValue(params['WFOutput'], 'Output'));

        const outputSurfaceBehavior = document.createElement('div');
        outputSurfaceBehavior.innerText = 'If there\'s nowhere to output:';
        outputSurfaceBehavior.className = 'sp-output-surface-behavior';
        action.appendChild(outputSurfaceBehavior);

        const flexbox = document.createElement('div');
        flexbox.style.display = 'flex';
        flexbox.style.gap = '10px';
        flexbox.style.alignItems = 'center';
        flexbox.style.margin = '0 16px';
        flexbox.style.height = '3rem';

        flexbox.appendChild(renderValue(params['WFNoOutputSurfaceBehavior'] ?? 'Do Nothing', 'Behavior'));
        if (params['WFResponse']) {
            flexbox.appendChild(renderValue(params['WFResponse'] ?? null, 'Result'));
        }
        action.appendChild(flexbox);

        return action;
    }
}
