import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

interface MathParameters {
    WFInput: string | object
    WFMathOperation: string | object
    WFMathOperand: string | object
}

export default {
    icon: "plus_slash_minus",
    background: "#8e8e93",
    render: (container: HTMLElement, params: MathParameters) => {
        return renderActionHeader(actions['math'],
            renderValue(params['WFInput'], 'Number'),
            renderValue(params['WFMathOperation'] ?? '+', 'Operation'),
            renderValue(params['WFMathOperand'], 'Number'),
        );
    }
}
