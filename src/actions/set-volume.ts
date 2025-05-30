import {renderValue, toPercentage} from "~/value";
import {Colors} from "~/colors";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

interface SetVolumeParameters {
    WFVolume: object | number
}

export default {
    title: 'Set Volume to',
    icon: 'speaker_3_fill',
    background: Colors.Red,
    render: function (container: HTMLElement, params: SetVolumeParameters) {
        let volume = params.WFVolume;
        if (typeof volume === 'number') {
            // @ts-ignore
            volume = toPercentage(params.WFVolume)
        }

        return renderActionHeader(actions['setvolume'], renderValue(volume))
    }
}
