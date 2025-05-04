import {Colors} from "~/colors";
import {actions, renderToggleSetAction, ToggleSetParameters} from "~/actions";

export default {
    icon: 'airplane',
    background: Colors.Orange,
    render(container: HTMLElement, params: ToggleSetParameters) {
        return renderToggleSetAction(actions['airplanemode.set'], 'Airplane Mode', params)
    }
}