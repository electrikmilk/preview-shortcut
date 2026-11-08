import {actionText} from "~/actions";
import {AutomationDefinition, renderAutomationContent, renderEnumValue, renderNameList} from "~/automations";
import {Colors} from "~/colors";

interface BluetoothTriggerParameters {
    WFBluetoothConnectionType?: string
    WFSelectedDevices?: string | string[]
}

const connectionTitles = {
    connect: 'Connected',
    disconnect: 'Disconnected',
    both: 'Connected or Disconnected',
};

const definition: AutomationDefinition = {
    title: 'When',
    icon: '',
    color: Colors.Blue,
    background: 'transparent',
    render: (container: HTMLElement, params: BluetoothTriggerParameters) => {
        container.classList.add('sp-bluetooth-action');

        return renderAutomationContent(
            definition,
            params,
            ['WFBluetoothConnectionType', 'WFSelectedDevices'],
            renderNameList(params.WFSelectedDevices, 'Any Device'),
            actionText('is'),
            renderEnumValue(connectionTitles, params.WFBluetoothConnectionType, 'connect'),
        );
    }
}

export default definition;
