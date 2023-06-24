import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface IfElseParameters {
    WFInput: string | object,
    WFConditionalActionString: string | object
    WFNumberValue: number | string | object
    WFControlFlowMode: number,
    WFCondition: number,
}

export default {
    render: (container: HTMLElement, params: IfElseParameters) => {
        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';
        action.style.gap = '0 10px';
        if (params['WFControlFlowMode'] == 2) {
            const header = document.createElement('div');
            header.className = 'sp-action-title';
            header.innerText = 'End If';
            action.appendChild(header);
        } else if (params['WFControlFlowMode'] == 1) {
            const header = document.createElement('div');
            header.className = 'sp-action-title';
            header.innerText = 'Otherwise';
            action.appendChild(header);
        } else {
            const header = document.createElement('div');
            header.className = 'sp-action-title';
            header.innerText = 'If';
            action.appendChild(header);

            const input = document.createElement('div');
            input.style.display = 'inline-block';
            input.innerHTML = renderValue(params['WFInput'] ?? null, 'Items');
            action.appendChild(input);

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
            const condition = document.createElement('div');
            condition.style.display = 'inline-block';
            condition.className = 'sp-value';
            condition.innerText = String(conditionType);
            action.appendChild(condition);

            if (params['WFConditionalActionString']) {
                const value = document.createElement('div');
                value.style.display = 'inline-block';
                value.innerHTML = renderValue(params['WFConditionalActionString'] ?? null, 'Text');
                action.appendChild(value);
            }

            if (params['WFNumberValue']) {
                const value = document.createElement('div');
                value.style.display = 'inline-block';
                value.innerHTML = renderValue(params['WFNumberValue'] ?? null, 'Number');
                action.appendChild(value);
            }
        }

        return renderListItem(renderActionIcon('arrow_branch', 'white', '#8e8e93'), action.outerHTML);
    }
}
