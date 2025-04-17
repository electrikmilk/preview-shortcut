import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";

import {Colors} from "~/colors";

interface GetIPAddress {
    WFIPAddressTypeOption: string | object
    WFIPAddressSourceOption: string | object
}

export default {
    title: "Get current IP address",
    color: 'white',
    background: Colors.Blue,
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
