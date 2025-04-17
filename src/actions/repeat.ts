import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {ActionDefinition, actionText} from "~/actions";

import {Colors} from "~/colors";

interface RepeatParameters {
    WFRepeatCount: string | object,
    WFControlFlowMode: number
}

export default {
    render: (container: HTMLElement, params: RepeatParameters) => {
        let actionData: ActionDefinition = {
            icon: 'arrow_2_squarepath',
            background: Colors.Gray,
        };
        let header: HTMLElement[] = [];

        if (params['WFControlFlowMode'] === 0) {
            actionData.title = 'Repeat';
            header.push(renderValue(params['WFRepeatCount'] ?? null, 'Times'), actionText('times'));
        } else {
            actionData.title = 'End Repeat';
        }

        return renderActionHeader(actionData, ...header);
    }
}
