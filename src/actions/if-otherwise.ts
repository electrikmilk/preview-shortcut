import {renderValue} from "~/value";
import {renderActionContent, renderActionHeader, renderContainer} from "~/render";
import {actions, actionText} from "~/actions";

import {Colors} from "~/colors";
import {renderElement} from "~/element";

interface IfOtherwiseParameters {
    WFInput: string | object
    WFConditionalActionString: string | object
    WFNumberValue: number | string | object
    WFControlFlowMode: number
    WFCondition: number
    WFConditions: WFConditions
}

interface WFConditions {
    Value: WFCondition
}

interface WFCondition {
    WFActionParameterFilterPrefix: ParameterFilterPrefix
    WFActionParameterFilterTemplates: IfOtherwiseParameters[]
}

enum ParameterFilterPrefix {
    None = -1,
    Any = 0,
    All = 1
}

export default {
    icon: 'arrow_branch',
    background: Colors.Gray,
    render: (container: HTMLElement, params: IfOtherwiseParameters) => {
        let header: HTMLElement[] = [];
        let conditionals: HTMLElement[] = [];

        switch (params.WFControlFlowMode) {
            case 2:
                actions['conditional'].title = 'End If';
                break;
            case 1:
                actions['conditional'].title = 'Otherwise';
                break;
            default:
                actions['conditional'].title = 'If';

                if (params.WFConditions) {
                    if (params.WFConditions.Value.WFActionParameterFilterPrefix !== ParameterFilterPrefix.None) {
                        switch (params.WFConditions.Value.WFActionParameterFilterPrefix) {
                            case ParameterFilterPrefix.Any:
                                header.push(renderValue("Any"))
                                break;
                            case ParameterFilterPrefix.All:
                                header.push(renderValue("All"))
                                break;
                        }
                        header.push(actionText("are true"))
                    }
                    if (params.WFConditions.Value.WFActionParameterFilterTemplates) {
                        if (params.WFConditions.Value.WFActionParameterFilterTemplates.length === 1) {
                            header.push(...renderConditional(params.WFConditions.Value.WFActionParameterFilterTemplates[0]))
                        } else {
                            for (const condition of params.WFConditions.Value.WFActionParameterFilterTemplates) {
                                conditionals.push(renderElement('div', {className: 'sp-condition'}, renderContainer(...renderConditional(condition))))
                            }
                        }
                    }
                } else {
                    header.push(...renderConditional(params));
                }
        }

        const root = renderElement('div', {}, renderActionHeader(actions['conditional'], ...header));
        if (conditionals.length !== 0) {
            root.append(renderActionContent(
                ...conditionals
            ))
        }

        return root;
    }
}

function renderConditional(params: IfOtherwiseParameters): HTMLElement[] {
    let conditional: HTMLElement[] = [];
    conditional.push(renderValue(params.WFInput ?? null, 'Input'));

    let conditionType;
    switch (params.WFCondition) {
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
    conditional.push(renderValue(conditionType, 'Condition'));

    if (params.WFConditionalActionString && (params.WFCondition !== 100 && params.WFCondition !== 101)) {
        conditional.push(renderValue(params.WFConditionalActionString, 'Text'));
    }
    if (params.WFNumberValue) {
        conditional.push(renderValue(params.WFNumberValue ?? null, 'Number'));
    }

    return conditional;
}
