import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

interface ShowResultParameters {
    Text: string | object
}

export default {
    title: "Show",
    icon: "doc_text_search",
    background: "#fec303",
    render: (container: HTMLElement, params: ShowResultParameters) => {
        return renderActionHeader(actions['showresult'], renderValue(params['Text'] ?? null, 'Result'));
    }
}
