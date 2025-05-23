import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderUnstyledValue} from "~/value";

import {Colors} from "~/colors";

interface TextActionParameters {
    WFTextActionText: any
}

export default {
    title: 'Text',
    background: Colors.Yellow,
    icon: 'icon-text_alignleft',
    render: (container: HTMLElement, params: TextActionParameters) => {
        const action = document.createElement('div');
        const header = renderActionHeader(actions['gettext']);
        action.appendChild(header);

        const content = document.createElement('div');
        content.className = 'sp-action-content';

        const text = document.createElement('div');
        text.className = 'sp-scrollable-action-content';

        text.appendChild(renderUnstyledValue(params['WFTextActionText'], 'Text'));

        content.appendChild(text);
        action.appendChild(content);
        action.appendChild(document.createElement('br'));

        return action;
    }
}
