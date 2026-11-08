import {actionText} from "~/actions";
import {AutomationDefinition, renderAutomationContent, renderEnumValue, renderNameList} from "~/automations";
import {Colors} from "~/colors";

interface WifiTriggerParameters {
    WFConnectionType?: string
    WFNetworks?: string | string[]
    WFRunAfterConnectionInterruption?: boolean
}

const connectionTitles = {
    joined: 'Joined',
    disconnected: 'Disconnected',
    both: 'Joined or Disconnected',
};

const definition: AutomationDefinition = {
    title: 'When',
    icon: 'wifi',
    color: Colors.Blue,
    background: 'transparent',
    params: {
        WFNetworks: 'Network',
        WFRunAfterConnectionInterruption: 'Run After Connection Interruption',
    },
    render: (_container: HTMLElement, params: WifiTriggerParameters) => {
        return renderAutomationContent(
            definition,
            params,
            ['WFConnectionType', 'WFNetworks'],
            renderNameList(params.WFNetworks, 'Any Network'),
            actionText('is'),
            renderEnumValue(connectionTitles, params.WFConnectionType, 'joined'),
        );
    }
}

export default definition;
