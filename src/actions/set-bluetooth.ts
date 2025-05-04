import {Colors} from "~/colors";
import {actions, renderToggleSetAction, ToggleSetParameters} from "~/actions";

export default {
    icon: 'bluetooth',
    background: Colors.Blue,
    render(container: HTMLElement, params: ToggleSetParameters) {
        container.classList.add('sp-bluetooth-action');
        return renderToggleSetAction(actions['bluetooth.set'], 'Bluetooth', params)
    }
}
