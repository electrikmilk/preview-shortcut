import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface ShowResultParameters {
    Text: string | object
}

export default {
    render: (container: HTMLElement, params: ShowResultParameters) => {
        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';
        action.style.gap = '0 10px';

        const header = document.createElement('div');
        header.className = 'sp-action-title';
        header.innerText = 'Show';
        action.appendChild(header);

        const varValue = document.createElement('div');
        varValue.style.display = 'inline-block';
        varValue.innerHTML = renderValue(params['Text'] ?? null, 'Result');
        action.appendChild(varValue);

        return renderListItem(renderActionIcon('text_bubble', 'white', '#ffc200'), action.outerHTML);
    }
}
