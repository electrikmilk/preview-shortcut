import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

import {Colors} from "~/colors";

interface GetDictionaryValueParameters {
    WFGetDictionaryValueType: string
    WFInput: string | object
    WFDictionaryKey: string | object
}

export default {
    title: 'Get',
    background: Colors.Orange,
    icon: 'book_fill',
    render: (container: HTMLElement, params: GetDictionaryValueParameters) => {
        let content: HTMLElement[] = [renderValue(params.WFGetDictionaryValueType ?? 'Value')];
        if (params.WFDictionaryKey) {
            content.push(actionText('for'), renderValue(params.WFDictionaryKey, 'Key'));
        }
        content.push(actionText('in'), renderValue(params.WFInput, 'Dictionary'))

        return renderActionHeader(actions['getvalueforkey'], ...content);
    }
}
