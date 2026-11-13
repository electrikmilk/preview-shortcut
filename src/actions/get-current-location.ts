import {Colors} from "~/colors";
import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";

interface GetCurrentLocationParams {
    Accuracy: object | string
}

export default {
    title: 'Get Current Location',
    icon: 'location_fill',
    background: Colors.Blue,
    render: (container: HTMLElement, params: GetCurrentLocationParams) => {
        const definition = actions['getcurrentlocation'];
        const content = document.createElement('div');
        content.appendChild(renderActionHeader(definition));
        content.appendChild(renderParameters(definition, {
            'Precision': params.Accuracy ?? 'Nearest Hundred Meters'
        }));

        return content;
    }
}