import {AutomationDefinition, renderAutomationContent, renderEnumValue} from "~/automations";
import {Colors} from "~/colors";
import {renderValue} from "~/value";
import {actionText} from "~/actions";

interface ChargerTriggerParameters {
    WFConnectionType?: string
}

const connectionTitles = {
    connect: 'Connects',
    disconnect: 'Disconnects',
    both: 'Connects or Disconnects',
};

const definition: AutomationDefinition = {
    title: 'When power',
    icon: 'bolt_fill',
    color: Colors.Green,
    background: 'transparent',
    render: (_container: HTMLElement, params: ChargerTriggerParameters) => {
        return renderAutomationContent(
            definition,
            params,
            ['WFConnectionType'],
            renderEnumValue(connectionTitles, params.WFConnectionType, 'connect'),
        );
    }
}

export default definition;
