import {renderActionContent, renderActionHeader} from "~/render";
import {renderValue} from "~/value";
import {actions} from "~/actions";

interface TextActionParameters {
    WFTextActionText: any
}

export default {
    title: 'Text',
    color: 'white',
    background: '#ffc200',
    icon: 'icon-text_alignleft',
    render: (container: HTMLElement, params: TextActionParameters) => {
        const action = document.createElement('div');
        const header = renderActionHeader(actions['gettext']);
        action.appendChild(header);
        const value = document.createElement('div');
        value.className = 'sp-scrollable-action-content';
        value.innerHTML = renderValue(params['WFTextActionText'], 'Text');
        action.appendChild(renderActionContent(value.outerHTML));

        return action;
    }
}
