import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface SelectFileParameters {
    WFPickingMode: string | object
    SelectMultiple: boolean | object
}

export default {
    title: 'Select',
    icon: 'doc_fill',
    render: (container: HTMLElement, params: SelectFileParameters) => {
        container.classList.add('sp-blue-action')

        const action = renderActionHeader(actions['file.select'], renderValue(params.WFPickingMode ?? 'Files'))
        action.appendChild(renderParameters(actions['file.select'], {
            'Select Multiple': params.SelectMultiple ?? false,
        }));

        return action;
    }
}
