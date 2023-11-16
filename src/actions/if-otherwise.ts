import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {ActionDefinition} from "~/actions";

interface IfElseParameters {
    WFInput: string | object,
    WFConditionalActionString: string | object
    WFNumberValue: number | string | object
    WFControlFlowMode: number,
    WFCondition: number,
}

export default {
    render: (container: HTMLElement, params: IfElseParameters) => {
        let actionData: ActionDefinition = {
            icon: 'arrow_branch',
            background: '#8e8e93',
        };
        let header: HTMLElement[] = [];

        if (params['WFControlFlowMode'] == 2) {
            actionData.title = 'End If';
        } else if (params['WFControlFlowMode'] == 1) {
            actionData.title = 'Otherwise';
        } else {
            actionData.title = 'If';

            header.push(renderValue(params['WFInput'] ?? null, 'Input'));

            let conditionType;
            switch (params['WFCondition']) {
                case 4:
                    conditionType = 'is';
                    break;
                case 5:
                    conditionType = 'is not';
                    break;
                case 100:
                    conditionType = 'has any value';
                    break;
                case 101:
                    conditionType = 'does not have any value';
                    break;
                case 99:
                    conditionType = 'contains';
                    break;
                case 999:
                    conditionType = 'does not contain';
                    break;
                case 8:
                    conditionType = 'begins with';
                    break;
                case 9:
                    conditionType = 'ends with';
                    break;
                case 2:
                    conditionType = 'greater than';
                    break;
                case 3:
                    conditionType = 'greater or equal to';
                    break;
                case 0:
                    conditionType = 'less than';
                    break;
                case 1:
                    conditionType = 'less or equal to';
                    break;
                case 1003:
                    conditionType = 'between';
                    break;
            }
            header.push(renderValue(conditionType, 'Condition'));

            if (params['WFConditionalActionString']) {
                header.push(renderValue(params['WFConditionalActionString'] ?? null, 'Text'));
            }
            if (params['WFNumberValue']) {
                header.push(renderValue(params['WFNumberValue'] ?? null, 'Number'));
            }
        }

        return renderActionHeader(actionData, ...header);
    }
}
