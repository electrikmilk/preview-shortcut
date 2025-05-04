import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

import {Colors} from "~/colors";

interface SetDictionaryValueParameters {
    WFDictionary: string | object
    WFDictionaryKey: string | object
    WFDictionaryValue: string | object
}

export default {
    title: 'Set',
    color: 'white',
    background: Colors.Orange,
    icon: 'book_fill',
    render: (container: HTMLElement, params: SetDictionaryValueParameters) => {
        return renderActionHeader(actions['setvalueforkey'],
            renderValue(params['WFDictionaryKey'], 'Key'),
            actionText('to'),
            renderValue(params['WFDictionaryValue'], 'Value'),
            actionText('in'),
            renderValue(params['WFDictionary'], 'Dictionary'),
        );
    }
}
