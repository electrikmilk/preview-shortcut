import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

import {Colors} from "~/colors";

interface CountParameters {
    WFCountType: string | object
    Input: string | object
}

export default {
    title: "Count",
    icon: "sum",
    background: Colors.Gray,
    render: (container: HTMLElement, params: CountParameters) => {
        return renderActionHeader(actions['count'],
            renderValue(params['WFCountType'], 'Type'),
            actionText('in'),
            renderValue(params['Input'] ?? null, 'Input'),
        );
    }
}
