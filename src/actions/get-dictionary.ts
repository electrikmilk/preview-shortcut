import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

import {Colors} from "~/colors";

interface GetDictionaryParameters {
    WFInput: string | object
}

export default {
    title: 'Get dictionary from',
    color: 'white',
    background: Colors.Orange,
    icon: 'book_fill',
    render: (container: HTMLElement, params: GetDictionaryParameters) => {
        return renderActionHeader(actions['detect.dictionary'],
            renderValue(params['WFInput'], 'Input'),
        );
    }
}