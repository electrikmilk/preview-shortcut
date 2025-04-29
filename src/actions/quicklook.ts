import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

import {Colors} from "~/colors";

interface QuicklookParameters {
    WFInput: string | object
}

export default {
    title: "Show",
    icon: "eye_fill",
    background: Colors.Yellow,
    render: (container: HTMLElement, params: QuicklookParameters) => {
        return renderActionHeader(actions['previewdocument'], renderValue(params['WFInput'] ?? null, 'Result'), actionText('in Quick Look'));
    }
}
