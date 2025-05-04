import {Colors} from "~/colors";
import {actions, renderToggleSetAction, ToggleSetParameters} from "~/actions";

export default {
    icon: 'antenna_radiowaves_left_right',
    background: Colors.Green,
    render(container: HTMLElement, params: ToggleSetParameters) {
        return renderToggleSetAction(actions['cellulardata.set'], 'Cellular Data', params)
    }
}