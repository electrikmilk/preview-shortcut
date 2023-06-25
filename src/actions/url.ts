import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface URLParameters {
    WFURLActionURL: Array<object | string>
}

export default {
    render: (container: HTMLElement, params: URLParameters) => {
        container.className += ' sp-url-action';

        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';
        action.style.gap = '0 10px';
        if (params['WFURLActionURL'].length == 0) {
            params['WFURLActionURL'] = [""];
        }
        params['WFURLActionURL'].forEach(url => {
            const URLValue = document.createElement('div');
            URLValue.innerHTML = renderValue(url, 'URL');
            action.appendChild(URLValue);
        });

        return renderListItem(renderActionIcon('link', '#1d7bff', '#e6f2ff'), action.outerHTML);
    }
}
