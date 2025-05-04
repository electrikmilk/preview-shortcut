import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface DeleteFilesParameters {
    WFDeleteFileConfirmDeletion: object | string
    WFInput: object | string
}

export default {
    title: 'Delete',
    icon: 'trash_fill',
    render(container: HTMLElement, params: DeleteFilesParameters) {
        container.classList.add('sp-blue-action')

        const action = renderActionHeader(actions['file.delete'],
            renderValue(params['WFInput'], 'Files'),
        );
        action.appendChild(renderParameters(actions['file.delete'], {
            'Delete Immediately': params.WFDeleteFileConfirmDeletion ?? false,
        }));

        return action;
    }
}