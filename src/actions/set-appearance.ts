import {Colors} from "~/colors";
import {actions, actionText, ToggleSetParameters} from "~/actions";
import {capitalize, renderValue} from "~/value";
import {renderActionHeader} from "~/render";

interface SetAppearanceParameters extends ToggleSetParameters {
    style: object | string
}

export default {
    icon: 'circle_lefthalf_fill',
    background: Colors.Blue,
    render(container: HTMLElement, params: SetAppearanceParameters) {
        return renderActionHeader(actions['appearance'],
            renderValue(capitalize(String(params.operation ?? 'turn'))),
            actionText('appearance'),
            renderValue(params.style ?? 'Dark')
        )
    }
}
