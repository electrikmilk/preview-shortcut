import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface WaitParameters {
    WFDelayTime: number | object
}

export default {
    title: 'Wait',
    icon: 'clock_fill',
    background: '#8e8e93',
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
