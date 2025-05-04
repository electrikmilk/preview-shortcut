import {WFFile} from "~/actions/file";
import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface SaveFileParameters {
    WFAskWhereToSave: boolean
    WFSaveFileOverwrite: boolean
    WFFileDestinationPath: string
    WFFolder: WFFile
    WFInput: object | string
}

export default {
    title: 'Save',
    icon: 'arrow_down_doc_fill',
    render: (container: HTMLElement, params: SaveFileParameters) => {
        container.classList.add('sp-blue-action');

        let header = [renderValue(params.WFInput)];

        if (params.WFFolder && params.WFFolder.displayName) {
            header.push(actionText('to'), renderValue(params.WFFolder.displayName))
        }

        const action = renderActionHeader(actions['documentpicker.save'], ...header);
        action.appendChild(renderParameters(actions['documentpicker.save'], {
            'Ask Where to Save': params.WFAskWhereToSave ?? true,
            'Subpath': params.WFFileDestinationPath,
            'Overwrite If File Exists': params.WFSaveFileOverwrite ?? false
        }));

        return action;
    }
}
