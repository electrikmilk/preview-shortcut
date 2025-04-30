import {actions} from "~/actions";
import {renderActionHeader, renderDictionary, renderLabel} from "~/render";
import {renderValue} from "~/value";

import {Colors} from "~/colors";
import {renderClass, renderElement} from "~/element";
import {Value} from "~/actions/dictionary";

enum WFHTTPBodyType {
    JSON = "JSON",
    Form = "Form",
    File = "File"
}

interface DownloadURLParameters {
    WFURL: string | object
    WFHTTPMethod: string | object
    WFHTTPBodyType: WFHTTPBodyType
    WFHTTPHeaders: DictionaryValue
    WFFormValues: DictionaryValue
    WFJSONValues: DictionaryValue
    WFRequestVariable: object
}

interface DictionaryValue {
    Value: Value
}

export default {
    title: 'Get contents of',
    icon: 'square_arrow_down',
    background: Colors.Green,
    render: (container: HTMLElement, params: DownloadURLParameters) => {
        const action = document.createElement('div');
        const header = renderActionHeader(actions['downloadurl'], renderValue(params.WFURL));
        action.appendChild(header);

        if (params.WFHTTPMethod) {
            action.appendChild(renderLabel('Method', renderValue(params.WFHTTPMethod ?? 'GET')))
        }

        if (params.WFHTTPHeaders) {
            const headers = document.createElement('div');
            headers.style.textAlign = 'left';
            headers.style.marginLeft = '2.5rem';
            headers.innerText = 'Headers:';

            action.append(
                headers,
                renderElement('br'),
                renderClass('table-container', renderDictionary(params.WFHTTPHeaders.Value.WFDictionaryFieldValueItems))
            );
        }

        if (params.WFHTTPMethod && params.WFHTTPMethod !== 'GET' && params.WFHTTPBodyType) {
            action.append(renderElement('br'), renderLabel('Request Body', renderValue(params.WFHTTPBodyType ?? 'JSON')), renderElement('br'),)
        }

        if (params.WFFormValues) {
            action.appendChild(renderClass('table-container', renderDictionary(params.WFFormValues.Value.WFDictionaryFieldValueItems)));
        }

        if (params.WFJSONValues) {
            action.appendChild(renderClass('table-container', renderDictionary(params.WFJSONValues.Value.WFDictionaryFieldValueItems)));
        }

        if (params.WFRequestVariable) {
            action.appendChild(renderLabel('File', renderValue(params.WFRequestVariable, 'Variable')))
        }

        action.appendChild(renderElement('br'));

        return action
    }
}