import {renderValue, toPercentage} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {Colors} from "~/colors";

interface SetBrightnessParameters {
    WFBrightness: object | number
}

export default {
    title: 'Set Brightness to',
    background: Colors.Red,
    icon: 'sun_max_fill',
    render(container: HTMLElement, params: SetBrightnessParameters) {
        let brightness = params.WFBrightness;
        if (typeof brightness === 'number') {
            // @ts-ignore
            brightness = toPercentage(params.WFBrightness)
        }

        return renderActionHeader(actions['setbrightness'], renderValue(brightness))
    }
}