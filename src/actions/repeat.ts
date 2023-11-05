import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface RepeatParameters {
    WFRepeatCount: string | object,
    WFControlFlowMode: number
}

export default {
    render: (container: HTMLElement, params: RepeatParameters) => {
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
            header.innerText = 'Repeat';
            action.appendChild(header);

            const varValue = document.createElement('div');
            varValue.style.display = 'inline-block';
            varValue.appendChild(renderValue(params['WFRepeatCount'] ?? null, 'Times'));
            action.appendChild(varValue);

            const to = document.createElement('div');
            to.innerText = 'times';
            to.className = 'sp-action-text';
            action.appendChild(to);
        }

        return renderListItem(renderActionIcon('arrow_2_squarepath', 'white', '#8e8e93'), action.outerHTML);
    }
}
