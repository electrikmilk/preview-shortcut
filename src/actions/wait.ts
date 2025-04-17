import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

interface WaitParameters {
    WFDelayTime: number | object
}

export default {
    title: 'Wait',
    icon: 'clock_fill',
    background: Colors.Gray,
    render: (container: HTMLElement, params: WaitParameters) => {
        let value
        if (typeof params['WFDelayTime'] == 'number') {
            value = renderValue(params['WFDelayTime'] + ' second' + (params['WFDelayTime'] !== 1 ? 's' : ''), '1 second');
        } else {
            value = renderValue(params['WFDelayTime']);
        }

        return renderActionHeader(actions['delay'],
            value,
        );
    }
}
