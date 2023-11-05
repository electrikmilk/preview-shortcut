import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface DateParameters {
    WFDateActionMode: string
    WFDateActionDate: string | object
}

export default {
    render: (container: HTMLElement, params: DateParameters) => {
        container.className += ' sp-date-action';

        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';
        action.style.gap = '0 10px';

        const varName = document.createElement('div');
        if (params['WFDateActionMode'] == 'Specified Date') {
            varName.appendChild(renderValue(params['WFDateActionDate'], 'Date'));
        } else {
            const varName = document.createElement('div');
            varName.appendChild(renderValue('Current Date', 'Date'));
        }
        action.appendChild(varName);

        return renderListItem(renderActionIcon('calendar', '#fb3a30', '#feeced'), action.outerHTML);
    }
}
