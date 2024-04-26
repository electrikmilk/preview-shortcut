import {renderActionHeader, renderTable} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface DictionaryParameters {
    WFItems: WFItems
}

interface WFItems {
    Value: Value
}

interface Value {
    WFDictionaryFieldValueItems: DictionaryItem[]
}

interface DictionaryItem {
    WFKey: Object,
    WFItemType: Number,
    WFValue: WFValue,

    Key: Object,
    Type: Number,
    Value: WFValue,
}

interface WFValue {
    Value: Object,
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

        for (let item of params.WFItems.Value.WFDictionaryFieldValueItems) {
            item.Key = item.WFKey
            item.Type = item.WFItemType
            item.Value = item.WFValue
            // @ts-ignore
            delete item.WFKey;
            // @ts-ignore
            delete item.WFItemType;
            // @ts-ignore
            delete item.WFValue;
        }

        action.appendChild(renderTable(params.WFItems.Value.WFDictionaryFieldValueItems, function (key: any, value: any) {
            if (key === 'Type') {
                switch (value) {
                    case 0:
                        return 'Text';
                    case 3:
                        return 'Number';
                    case 2:
                        return 'Array';
                    case 1:
                        return 'Dictionary';
                    case 4:
                        return 'Boolean';
                }
            }

            const valueElement = renderValue(value, key);
            valueElement.classList.add('sp-unstyled-value');

            return valueElement;
        }));

        const br = document.createElement('br');
        action.appendChild(br);

        return action;
    }
}

function dictToJSON() {

}