import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

interface AskForInputParameters {
    WFInputType: object | string,
    WFAskActionPrompt: object | string,
    WFAskActionDefaultAnswer: object | string,
    WFAskActionDefaultAnswerNumber: object | string,
}

export default {
    title: "Ask for",
    icon: "plus_bubble_fill",
    background: Colors.LightBlue,
    render: (container: HTMLElement, params: AskForInputParameters) => {
        const action = renderActionHeader(actions['ask'],
            renderValue(params['WFInputType'] ?? 'Text'),
            actionText("with"),
            renderValue(params['WFAskActionPrompt'], 'Informational message')
        );
        action.appendChild(renderParameters(actions['ask'], {
            'Default Answer': params['WFAskActionDefaultAnswer'] ?? params['WFAskActionDefaultAnswerNumber'],
        }));

        return action;
    }
}
