import {renderActionHeader, renderParameters} from "~/render";
import {actions} from "~/actions";

interface SelectPhotoParameters {
    SelectMultiple: boolean | object
}

export default {
    title: 'Select photos',
    icon: '',
    render: (container: HTMLElement, params: SelectPhotoParameters) => {
        container.classList.add('sp-photos-action');

        const action = renderActionHeader(actions['selectphoto'])

        action.appendChild(renderParameters(actions['selectphoto'], {
            'Select Multiple': params.SelectMultiple ?? false,
        }));

        return action;
    }
}
