import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {ActionDefinition} from "~/actions";

import {Colors} from "~/colors";

interface RepeatWithEachParameters {
    WFInput: string | object,
    WFControlFlowMode: number,
}

export default {
    render: (container: HTMLElement, params: RepeatWithEachParameters) => {
        let actionData: ActionDefinition = {
            icon: 'arrow_2_circlepath_circle_fill',
            background: Colors.Gray,
        };
        let header: HTMLElement[] = [];

        if (params['WFControlFlowMode'] === 0) {
            actionData.title = 'Repeat with each item in';
            header.push(renderValue(params['WFInput'] ?? null, 'Items'));
        } else {
            actionData.title = 'End Repeat';
        }

        return renderActionHeader(actionData, ...header);
    }
}
