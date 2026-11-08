import {actionText} from "~/actions";
import {AutomationDefinition, renderAutomationContent, renderEnumValue} from "~/automations";
import {Colors} from "~/colors";
import {renderValue} from "~/value";

interface BluetoothTriggerParameters {
    WFBluetoothConnectionType?: string
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
    params: {
        WFSelectedDevices: 'Devices',
    },
    render: (container: HTMLElement, params: BluetoothTriggerParameters) => {
        container.classList.add('sp-bluetooth-action');

        return renderAutomationContent(
            definition,
            params,
            ['WFBluetoothConnectionType'],
            renderValue('Bluetooth'),
            actionText('is'),
            renderEnumValue(connectionTitles, params.WFBluetoothConnectionType, 'connect'),
        );
    }
}

export default definition;
