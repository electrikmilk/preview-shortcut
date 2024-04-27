import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";

interface GetIPAddress {
    WFIPAddressTypeOption: string | object
    WFIPAddressSourceOption: string | object
}

export default {
    title: "Get current IP address",
    color: 'white',
    background: '#007aff',
    icon: 'globe',
    render: (container: HTMLElement, params: GetIPAddress) => {
        const action = renderActionHeader(actions['getipaddress']);
        action.appendChild(renderParameters(actions['getipaddress'], {
            'Address': params.WFIPAddressSourceOption ?? 'IPv4',
            'Type': params.WFIPAddressTypeOption ?? 'External'
        }));

        return action;
    }
}
