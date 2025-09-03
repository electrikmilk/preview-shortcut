import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";
import {Colors} from "~/colors";

interface GetLocationParameters {
    WFLocation: WFLocation
}

interface WFLocation {
    isCurrentLocation: boolean
}

export default {
    icon: 'map_pin',
    color: Colors.Green,
    render: (container: HTMLElement, params: GetLocationParameters) => {
        container.classList.add('sp-location-action');
        let location: any;
        if (params.WFLocation?.isCurrentLocation) {
            location = "Current Location"
        } else {
            location = params.WFLocation
        }

        return renderActionHeader(actions['location'], renderValue(location, 'Location'));
    }
}
