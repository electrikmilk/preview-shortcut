import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

interface GetDictionaryValueParameters {
    WFGetDictionaryValueType: string
    WFInput: string | object
    WFDictionaryKey: string | object
}

export default {
    title: 'Get',
    color: 'white',
    background: '#fc880f',
    icon: 'book_fill',
    render: (container: HTMLElement, params: GetDictionaryValueParameters) => {
        let content: HTMLElement[] = [renderValue(params.WFGetDictionaryValueType)];
        if (params.WFGetDictionaryValueType === 'Value') {
            content.push(actionText('for'), renderValue(params['WFDictionaryKey'], 'Key'));
        }
        content.push(actionText('in'), renderValue(params['WFInput'], 'Dictionary'))

        return renderActionHeader(actions['getvalueforkey'], ...content);
    }
}