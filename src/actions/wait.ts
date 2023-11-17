import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface WaitParameters {
    WFDelayTime: number
}

export default {
    icon: 'clock_fill',
    background: '#8e8e93',
    render: (container: HTMLElement, params: WaitParameters) => {
        return renderActionHeader(actions['delay'],
            actionText('Wait'),
            renderValue(params['WFDelayTime'] + ' second' + (params['WFDelayTime'] !== 1 ? 's' : ''), '1 second'),
        );
    }
}
