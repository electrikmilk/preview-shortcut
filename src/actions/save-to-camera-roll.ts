import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

interface SaveToCameraRollParameters {
    WFInput: object
    WFCameraRollSelectedGroup: string | object
}

export default {
    title: 'Save',
    icon: '',
    render: (container: HTMLElement, params: SaveToCameraRollParameters) => {
        container.classList.add('sp-photos-action');

        return renderActionHeader(actions['savetocameraroll'],
            renderValue(params.WFInput),
            actionText('To'),
            renderValue(params.WFCameraRollSelectedGroup ?? 'Recents'),
        )
    }
}
