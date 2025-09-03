import {renderActionHeader, renderDictionary} from "~/render";
import {actions} from "~/actions";
import {renderClass, renderElement} from "~/element";

import {Colors} from "~/colors";

interface DictionaryParameters {
    WFItems: WFItems
}

export interface WFItems {
    Value: Value
}

export interface Value {
    WFDictionaryFieldValueItems: DictionaryItem[]
    Aggrandizements: Aggrandizement[]
}

export interface Aggrandizement {
    DictionaryKey: string
    PropertyName: string
    Type: string
    OutputUUID: string
}

export interface DictionaryItem {
    WFKey: object,
    WFItemType: Number,
    WFValue: WFValue,
}

interface WFValue {
    Value: object,
    WFSerializationType: string
}

export default {
    title: 'Dictionary',
    background: Colors.Orange,
    icon: 'book_fill',
    render: (container: HTMLElement, params: DictionaryParameters) => {
        const action = document.createElement('div');
        const header = renderActionHeader(actions['dictionary']);

        action.append(
            header,
            renderClass('table-container', renderDictionary(params.WFItems.Value.WFDictionaryFieldValueItems)),
            renderElement('br')
        );

        return action;
    }
}
