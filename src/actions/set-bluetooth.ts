import {Colors} from "~/colors";
import {actions, renderToggleSetAction, ToggleSetParameters} from "~/actions";

export default {
    icon: 'bluetooth',
    background: Colors.Blue,
    render(container: HTMLElement, params: ToggleSetParameters) {
        return renderToggleSetAction(actions['airplanemode.set'], 'Bluetooth', params)
    }
}