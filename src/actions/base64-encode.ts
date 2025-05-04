import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface Base64Parameters {
    WFEncodeMode: object | string
    WFInput: object | string
    WFBase64LineBreakMode: object | string
}

export default {
    icon: 'hexagon_fill',
    render(container: HTMLElement, params: Base64Parameters) {
        const action = renderActionHeader(actions['base64encode'],
            renderValue(params.WFEncodeMode),
            renderValue(params.WFInput),
            actionText('with base64')
        )
        action.appendChild(renderParameters(actions['base64encode'], {
            'Line Breaks': params.WFBase64LineBreakMode
        }));

        return action
    }
}