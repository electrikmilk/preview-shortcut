import {AutomationDefinition, renderAutomationContent, renderEnumValue} from "~/automations";
import {Colors} from "~/colors";
import {renderValue} from "~/value";

interface StageManagerTriggerParameters {
    WFStageManagerType?: string
}

const stateTitles = {
    on: 'Is Turned On',
    off: 'Is Turned Off',
    both: 'Is Turned On or Off',
};

const definition: AutomationDefinition = {
    title: 'When',
    icon: 'rectangle_3_offgrid_fill',
    color: Colors.Blue,
    background: 'transparent',
    render: (_container: HTMLElement, params: StageManagerTriggerParameters) => {
        return renderAutomationContent(
            definition,
            params,
            ['WFStageManagerType'],
            renderValue('Stage Manager'),
            renderEnumValue(stateTitles, params.WFStageManagerType, 'on'),
        );
    }
}

export default definition;
