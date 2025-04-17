import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

import {Colors} from "~/colors";

interface CalculateExpressionParameters {
    Input: string | object
}

export default {
    title: "Calculate expression",
    icon: 'f_cursive_circle',
    background: Colors.Gray,
    render: (container: HTMLElement, params: CalculateExpressionParameters) => {
        return renderActionHeader(actions['calculateexpression'],
            renderValue(params['Input'], '7 + 7'),
        );
    }
}