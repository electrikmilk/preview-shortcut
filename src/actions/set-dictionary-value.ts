import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

interface SetDictionaryValueParameters {
    WFInput: string | object
    WFDictionaryKey: string | object
    WFGetDictionaryValueType: string | object
}

export default {
    title: 'Set',
    color: 'white',
    background: '#fc880f',
    icon: 'book_fill',
    render: (container: HTMLElement, params: SetDictionaryValueParameters) => {
        return renderActionHeader(actions['setvalueforkey'],
            renderValue(params['WFInput'], 'Key'),
            actionText('to'),
            renderValue(params['WFGetDictionaryValueType'], 'Value'),
            actionText('in'),
            renderValue(params['WFInput'], 'Dictionary'),
        );
    }
}