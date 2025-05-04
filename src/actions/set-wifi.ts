import {Colors} from "~/colors";
import {actions, renderToggleSetAction, ToggleSetParameters} from "~/actions";

export default {
    icon: 'wifi',
    background: Colors.Blue,
    render(container: HTMLElement, params: ToggleSetParameters) {
        return renderToggleSetAction(actions['wifi.set'], 'Wi-Fi', params)
    }
}