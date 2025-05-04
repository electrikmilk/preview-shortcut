import {Colors} from "~/colors";
import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface ReplaceTextParameters {
    WFReplaceTextFind: object | string
    WFReplaceTextReplace: object | string
    WFInput: object | string
    WFReplaceTextCaseSensitive: object | boolean
    WFReplaceTextRegularExpression: object | boolean
}

export default {
    title: 'Replace',
    background: Colors.Yellow,
    icon: 'icon-text_alignleft',
    render(container: HTMLElement, params: ReplaceTextParameters) {

        const action = renderActionHeader(actions['text.replace'],
            renderValue(params.WFReplaceTextFind),
            actionText('with'),
            renderValue(params.WFReplaceTextReplace),
            actionText('in'),
            renderValue(params.WFInput)
        );
        action.appendChild(renderParameters(actions['text.replace'], {
            'Case Sensitive': params.WFReplaceTextCaseSensitive ?? true,
            'Regular Expression': params.WFReplaceTextRegularExpression ?? false,
        }));

        return action
    }
}