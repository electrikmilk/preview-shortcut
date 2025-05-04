import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

interface ChooseFromListParamteers {
    WFInput: string,
    WFChooseFromListActionPrompt: string,
    WFChooseFromListActionSelectMultiple: boolean,
    WFChooseFromListActionSelectAll: boolean,
}

export default {
    title: "Choose from",
    icon: "square_list_fill",
    background: Colors.LightBlue,
    render: (container: HTMLElement, params: ChooseFromListParamteers) => {
        const action = renderActionHeader(actions['choosefromlist'], renderValue(params['WFInput'], 'List'));
        action.appendChild(renderParameters(actions['choosefromlist'], {
            'Prompt': params['WFChooseFromListActionPrompt'],
            'Select Multiple': params['WFChooseFromListActionSelectMultiple'] ?? false,
            'Select All Initially': params['WFChooseFromListActionSelectMultiple'] ?? false
        }));

        return action;
    }
}
