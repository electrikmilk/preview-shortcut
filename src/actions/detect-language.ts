import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface DetectLanguageParameters {
    WFInput: object | string
}

export default {
    title: 'Detect language of',
    icon: '',
    render(container: HTMLElement, params: DetectLanguageParameters) {
        container.classList.add('sp-translate-action');

        return renderActionHeader(actions['detectlanguage'], renderValue(params.WFInput))
    }
}