import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

interface DetectTextParameters {
    WFInput: object | string
}

export default {
    title: 'Get text from',
    background: Colors.Yellow,
    icon: 'icon-text_alignleft',
    render: (_container: HTMLElement, params: DetectTextParameters) => {
        return renderActionHeader(actions['detect.text'], renderValue(params.WFInput, 'Input'));
    }
}
