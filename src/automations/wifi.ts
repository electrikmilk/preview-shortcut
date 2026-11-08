import {actionText} from "~/actions";
import {AutomationDefinition, renderAutomationContent, renderEnumValue} from "~/automations";
import {Colors} from "~/colors";
import {escapeHTML, renderValue} from "~/value";

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

function renderNetworks(networks?: string | string[]): HTMLElement {
    const networkNames = Array.isArray(networks) ? networks : [networks];
    const names = networkNames.filter(name => name).map(name => escapeHTML(String(name)));
    if (!names.length) {
        return renderValue(undefined, 'Any Network');
    }

    return renderValue(names.join(', '));
}

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
            renderNetworks(params.WFNetworks),
            actionText('is'),
            renderEnumValue(connectionTitles, params.WFConnectionType, 'joined'),
        );
    }
}

export default definition;
