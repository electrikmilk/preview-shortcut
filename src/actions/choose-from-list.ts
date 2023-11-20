import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface ChooseFromListParamteers {
    WFInput: string,
    WFChooseFromListActionPrompt: string,
    WFChooseFromListActionSelectMultiple: boolean,
    WFChooseFromListActionSelectAll: boolean,
}

export default {
    title: "Choose from",
    icon: "square_list_fill",
    background: '#55bef0',
    render: (container: HTMLElement, params: ChooseFromListParamteers) => {
        const action = renderActionHeader(actions['choosefromlist'], renderValue(params['WFInput'], 'Informational message'));
        action.appendChild(renderParameters(actions['choosefromlist'], {
            'Prompt': params['WFChooseFromListActionPrompt'],
            'Select Multiple': params['WFChooseFromListActionSelectMultiple'] ?? true,
            'Select All Initially': params['WFChooseFromListActionSelectMultiple'] ?? true
        }));

        return action;
    }
}