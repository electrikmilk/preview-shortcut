import {Colors} from "~/colors";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface OpenURLParameters {
    WFInput: string | object
}

export default {
    title: 'Open',
    color: Colors.Blue,
    icon: 'arrow_up_right_square_fill',
    render: (container: HTMLElement, params: OpenURLParameters) => {
        container.classList.add('sp-blue-action');

        return renderActionHeader(actions['openurl'], renderValue(params.WFInput))
    }
}