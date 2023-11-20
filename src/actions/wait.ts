import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface WaitParameters {
    WFDelayTime: number
}

export default {
    title: 'Wait',
    icon: 'clock_fill',
    background: '#8e8e93',
    render: (container: HTMLElement, params: WaitParameters) => {
        return renderActionHeader(actions['delay'],
            renderValue(params['WFDelayTime'] + ' second' + (params['WFDelayTime'] !== 1 ? 's' : ''), '1 second'),
        );
    }
}
