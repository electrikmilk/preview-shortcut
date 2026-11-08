import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";
import {capitalize, renderUnstyledValue, renderValue} from "~/value";

interface AskLLMParameters {
    WFLLMPrompt: string | object
    WFLLMModel: string | object
    FollowUp: boolean | object
    WFAllowWebSearch: boolean | object
    WFGenerativeResultType: string | object
}

export default {
    title: 'Use',
    icon: '',
    render: (container: HTMLElement, params: AskLLMParameters) => {
        container.classList.add('sp-intelligence-action')

        const action = document.createElement('div');

        let model = params.WFLLMModel;
        if (model && typeof model === 'string') {
            if (model.includes('Device')) {
                model = 'On-Device'
            } else {
                model = model.replace("Apple Intelligence", 'Cloud')
            }
        }

        const header = renderActionHeader(actions['askllm'], renderValue(model ?? 'Cloud'), actionText('model'));
        action.appendChild(header);

        const content = document.createElement('div');
        content.className = 'sp-action-content';

        const text = document.createElement('div');
        text.className = 'sp-scrollable-action-content';
        text.appendChild(renderUnstyledValue(params.WFLLMPrompt, 'Text'));

        content.appendChild(text);
        action.appendChild(content);

        action.appendChild(renderParameters(actions['askllm'], {
            'Use Broad World Knowledge': params.WFAllowWebSearch ?? false,
            'Output': params.WFGenerativeResultType ?? "Automatic",
            'Follow Up': params.FollowUp ?? false
        }));

        return action;
    }
}
