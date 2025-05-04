import {Colors} from "~/colors";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface OpenAppParameters {
    WFAppIdentifier: object | string
}

export default {
    title: 'Open',
    icon: 'arrow_up_right',
    background: Colors.Purple,
    render(container: HTMLElement, params: OpenAppParameters) {
        return renderActionHeader(actions['openapp'], renderValue(params.WFAppIdentifier))
    }
}
