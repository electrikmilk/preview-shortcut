import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

interface GetBatteryStatusParameters {
    Subject: object | string
}

export default {
    title: 'Get',
    background: Colors.Green,
    icon: 'battery_100',
    render: (_container: HTMLElement, params: GetBatteryStatusParameters) => {
        return renderActionHeader(actions['getbatterylevel'], renderValue(params.Subject ?? 'Battery Level', 'Subject'));
    }
}
