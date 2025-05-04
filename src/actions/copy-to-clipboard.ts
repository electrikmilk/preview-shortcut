import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface CopyToClipboardParameters {
    WFInput: string | object
    WFLocalOnly: boolean
    WFExpirationDate: string | object
}

export default {
    title: "Copy",
    icon: "doc_on_doc_fill",
    render: (container: HTMLElement, params: CopyToClipboardParameters) => {
        container.className += ' sp-blue-action';

        const action = renderActionHeader(actions['setclipboard'],
            renderValue(params['WFInput'], 'Content'),
            actionText('to clipboard'),
        );
        action.appendChild(renderParameters(actions['setclipboard'], {
            'Local Only': params['WFLocalOnly'] ?? false,
            'Expire At': params['WFExpirationDate']
        }));

        return action;
    }
}
