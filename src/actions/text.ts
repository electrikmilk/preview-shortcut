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
        const text = document.createElement('div');
        text.className = 'sp-scrollable-action-content';
        const value = renderValue(params['WFTextActionText'], 'Text');
        value.classList.add('sp-value', 'sp-unstyled-value');
        text.appendChild(value);
        action.appendChild(renderActionContent(text.outerHTML));

        return action;
    }
}
