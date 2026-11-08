import {AutomationDefinition, renderAutomationContent, renderEnumValue} from "~/automations";
import {Colors} from "~/colors";
import {renderValue} from "~/value";

interface DisplayTriggerParameters {
    WFConnectionType?: string
}

const connectionTitles = {
    connect: 'Is Connected',
    disconnect: 'Is Disconnected',
    both: 'Is Connected or Disconnected',
};

const definition: AutomationDefinition = {
    title: 'When',
    icon: 'tv',
    color: Colors.Blue,
    background: 'transparent',
    render: (_container: HTMLElement, params: DisplayTriggerParameters) => {
        return renderAutomationContent(
            definition,
            params,
            ['WFConnectionType'],
            renderValue('Display'),
            renderEnumValue(connectionTitles, params.WFConnectionType, 'connect'),
        );
    }
}

export default definition;
