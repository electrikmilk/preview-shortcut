import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface AskForInputParameters {
    WFInputType: string,
    WFAskActionPrompt: boolean,
    WFAskActionDefaultAnswer: string,
    WFAskActionDefaultAnswerNumber: string,
}

export default {
    title: "Ask for",
    icon: "plus_bubble_fill",
    background: '#55bef0',
    render: (container: HTMLElement, params: AskForInputParameters) => {
        const action = renderActionHeader(actions['ask'],
            renderValue(params['WFInputType'], 'Input Type'),
            actionText("with"),
            renderValue(params['WFAskActionPrompt'], 'Informational message')
        );
        action.appendChild(renderParameters(actions['ask'], {
            'Default Answer': params['WFAskActionDefaultAnswer'] ?? params['WFAskActionDefaultAnswerNumber'],
        }));

        return action;
    }
}