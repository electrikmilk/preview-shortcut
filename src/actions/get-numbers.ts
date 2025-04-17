import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

import {Colors} from "~/colors";

interface GetNumbersParameters {
    WFInput: string | object
}

export default {
    title: "Get numbers from",
    icon: "number_circle_fill",
    background: Colors.Gray,
    render: (container: HTMLElement, params: GetNumbersParameters) => {
        return renderActionHeader(actions['detect.number'],
            renderValue(params['WFInput'] ?? null, 'Input'),
        );
    }
}
