import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface URLEncodeParameters {
    WFInput: object
    WFEncodeMode: string
}

export default {
    title: 'URL',
    icon: 'link',
    render: (container: HTMLElement, params: URLEncodeParameters) => {
        container.className += ' sp-blue-action';

        return renderActionHeader(actions['urlencode'], renderValue(params.WFEncodeMode ?? 'Encode'), renderValue(params.WFInput));
    }
}