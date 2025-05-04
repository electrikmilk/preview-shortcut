import {renderActionHeader} from "~/render";
import {renderValue} from "~/value";
import {actions, actionText} from "~/actions";

interface CreateFolderParameters {
    WFFilePath: object | string
}

export default {
    title: 'Create folder in',
    icon: 'folder_fill_badge_plus',
    render: (container: HTMLElement, params: CreateFolderParameters) => {
        container.className += ' sp-blue-action';

        return renderActionHeader(actions['file.createfolder'],
            renderValue('Shortcuts'), actionText('at'), renderValue(params.WFFilePath))
    }
}
