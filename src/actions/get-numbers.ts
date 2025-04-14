import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

interface GetNumbersParameters {
    WFInput: string | object
}

export default {
    title: "Get numbers from",
    icon: "number_circle_fill",
    background: "#8e8e93",
    render: (container: HTMLElement, params: GetNumbersParameters) => {
        return renderActionHeader(actions['detect.number'],
            renderValue(params['WFInput'] ?? null, 'Input'),
        );
    }
}
