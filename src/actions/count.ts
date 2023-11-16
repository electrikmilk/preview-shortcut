import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

interface CountParameters {
    WFCountType: string | object
    Input: string | object
}

export default {
    title: "Count",
    icon: "sum",
    background: "#8e8e93",
    render: (container: HTMLElement, params: CountParameters) => {
        return renderActionHeader(actions['count'],
            renderValue(params['WFCountType'], 'Type'),
            actionText('in'),
            renderValue(params['Input'] ?? null, 'Input'),
        );
    }
}
