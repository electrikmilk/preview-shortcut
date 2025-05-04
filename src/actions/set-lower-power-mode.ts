import {Colors} from "~/colors";
import {actions, renderToggleSetAction, ToggleSetParameters} from "~/actions";

export default {
    icon: 'battery_25',
    background: Colors.Yellow,
    render(container: HTMLElement, params: ToggleSetParameters) {
        return renderToggleSetAction(actions['lowpowermode.set'], 'Low Power Mode', params)
    }
}
