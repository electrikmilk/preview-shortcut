import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

import {Colors} from "~/colors";

interface NumberParameters {
    WFNumberActionNumber: string | object
}

export default {
    icon: 'number',
    background: Colors.Gray,
    render: (container: HTMLElement, params: NumberParameters) => {
        return renderActionHeader(actions['number'], renderValue(params['WFNumberActionNumber'], 'Number'));
    }
}
