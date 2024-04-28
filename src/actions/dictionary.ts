import {renderActionHeader, renderDictionary} from "~/render";
import {actions} from "~/actions";
import {renderClass} from "~/element";

interface DictionaryParameters {
    WFItems: WFItems
}

export interface WFItems {
    Value: Value
}

interface Value {
    WFDictionaryFieldValueItems: DictionaryItem[]
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
    color: 'white',
    background: '#fc880f',
    icon: 'book_fill',
    render: (container: HTMLElement, params: DictionaryParameters) => {
        const action = document.createElement('div');
        const header = renderActionHeader(actions['dictionary']);
        action.appendChild(header);

        action.appendChild(renderClass('table-container', renderDictionary(params.WFItems.Value.WFDictionaryFieldValueItems)));

        const br = document.createElement('br');
        action.appendChild(br);

        return action;
    }
}
