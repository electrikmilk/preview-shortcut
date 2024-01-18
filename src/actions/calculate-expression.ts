import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

interface CalculateExpressionParameters {
    Input: string | object
}

export default {
    title: "Calculate expression",
    icon: 'f_cursive_circle',
    background: '#8e8e93',
    render: (container: HTMLElement, params: CalculateExpressionParameters) => {
        return renderActionHeader(actions['calculateexpression'],
            renderValue(params['Input'], '7 + 7'),
        );
    }
}