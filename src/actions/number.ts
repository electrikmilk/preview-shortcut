import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface NumberParameters {
    WFNumberActionNumber: string | object
}

export default {
    render: (container: HTMLElement, params: NumberParameters) => {
        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';
        action.style.gap = '0 10px';

        const varName = document.createElement('div');
        varName.appendChild(renderValue(params['WFNumberActionNumber'], 'Number'));
        action.appendChild(varName);

        return renderListItem(renderActionIcon('number', 'white', 'gray'), action.outerHTML);
    }
}
