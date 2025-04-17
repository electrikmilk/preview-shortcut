import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

import {Colors} from "~/colors";

interface MathParameters {
    WFInput: string | object
    WFMathOperation: string | object
    WFMathOperand: string | object
}

export default {
    icon: "plus_slash_minus",
    background: Colors.Gray,
    render: (container: HTMLElement, params: MathParameters) => {
        return renderActionHeader(actions['math'],
            renderValue(params['WFInput'], 'Number'),
            renderValue(params['WFMathOperation'] ?? '+', 'Operation'),
            renderValue(params['WFMathOperand'], 'Number'),
        );
    }
}
