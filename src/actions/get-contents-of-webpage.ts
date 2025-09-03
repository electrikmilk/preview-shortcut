import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface GetContentsOfWebpageParameters {
    WFInput: object | string
}

export default {
    title: 'Get contents of webpage at',
    icon: '',
    render: (container: HTMLElement, params: GetContentsOfWebpageParameters) => {
        container.classList.add('sp-safari-action')
        return renderActionHeader(actions['getwebpagecontents'], renderValue(params.WFInput ?? null, 'URL'));
    }
}
