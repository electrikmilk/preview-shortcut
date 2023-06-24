import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface CountParameters {
    WFCountType: string | object
    Input: string | object
}

export default {
    render: (container: HTMLElement, params: CountParameters) => {
        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';
        action.style.gap = '0 10px';

        const header = document.createElement('div');
        header.className = 'sp-action-title';
        header.innerText = 'Count';
        action.appendChild(header);

        const countType = document.createElement('div');
        countType.innerHTML = renderValue(params['WFCountType'], 'Type');
        action.appendChild(countType);

        const to = document.createElement('div');
        to.innerText = 'in';
        to.className = 'sp-action-text';
        action.appendChild(to);

        const input = document.createElement('div');
        input.style.display = 'inline-block';
        input.innerHTML = renderValue(params['Input'] ?? null, 'Input');
        action.appendChild(input);

        return renderListItem(renderActionIcon('sum', 'white', '#8e8e93'), action.outerHTML);
    }
}
