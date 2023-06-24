import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface IfElseParameters {
    WFInput: string | object,
    WFControlFlowMode: number,
}

export default {
    render: (container: HTMLElement, params: IfElseParameters) => {
        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';
        action.style.gap = '0 10px';
        if (params['WFControlFlowMode'] == 2) {
            const header = document.createElement('div');
            header.className = 'sp-action-title';
            header.innerText = 'End If';
            action.appendChild(header);
        } else if (params['WFControlFlowMode'] == 1) {
            const header = document.createElement('div');
            header.className = 'sp-action-title';
            header.innerText = 'Otherwise';
            action.appendChild(header);
        } else {
            const header = document.createElement('div');
            header.className = 'sp-action-title';
            header.innerText = 'If';
            action.appendChild(header);

            // const condition = document.createElement('div');
            // condition.style.display = 'inline-block';
            // condition.innerHTML = renderValue(params['WFInput'] ?? null, 'Items');
            // action.appendChild(condition);

            const input = document.createElement('div');
            input.style.display = 'inline-block';
            input.innerHTML = renderValue(params['WFInput'] ?? null, 'Items');
            action.appendChild(input);
        }

        return renderListItem(renderActionIcon('arrow_branch', 'white', '#8e8e93'), action.outerHTML);
    }
}
