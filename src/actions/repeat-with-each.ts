import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface RepeatWithEachParameters {
    WFInput: string | object,
    WFControlFlowMode: number,
}

export default {
    render: (container: HTMLElement, params: RepeatWithEachParameters) => {
        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';
        action.style.gap = '0 10px';
        if (params['WFControlFlowMode'] !== 0) {
            const header = document.createElement('div');
            header.className = 'sp-action-title';
            header.innerText = 'End Repeat';
            action.appendChild(header);
        } else {
            const header = document.createElement('div');
            header.className = 'sp-action-title';
            header.innerText = 'Repeat with each item in';
            action.appendChild(header);

            const varValue = document.createElement('div');
            varValue.style.display = 'inline-block';
            varValue.appendChild(renderValue(params['WFInput'] ?? null, 'Items'));
            action.appendChild(varValue);
        }

        return renderListItem(renderActionIcon('arrow_2_circlepath_circle_fill', 'white', '#8e8e93'), action.outerHTML);
    }
}
