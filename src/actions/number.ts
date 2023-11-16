import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

interface NumberParameters {
    WFNumberActionNumber: string | object
}

export default {
    icon: 'number',
    background: '#8e8e93',
    render: (container: HTMLElement, params: NumberParameters) => {
        return renderActionHeader(actions['number'], renderValue(params['WFNumberActionNumber'], 'Number'));
    }
}
