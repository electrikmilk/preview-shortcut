import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface ShowWebpageParameters {
    WFURL: object | string
}

export default {
    title: 'Show webpage at',
    icon: '',
    render: (container: HTMLElement, params: ShowWebpageParameters) => {
        container.classList.add('sp-safari-action')
        return renderActionHeader(actions['showwebpage'], renderValue(params.WFURL ?? null, 'URL'));
    }
}
