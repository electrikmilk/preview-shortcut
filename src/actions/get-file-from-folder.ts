import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface GetFileFromFolderParams {
    WFGetFilePath: string | object
    WFFile: string | object
    WFGetFolderContents: boolean
    WFShowFilePicker: boolean
    WFFileErrorIfNotFound: boolean
}

export default {
    title: "Get file from",
    icon: 'folder_fill',
    render: (container: HTMLElement, params: GetFileFromFolderParams) => {
        container.className += ' sp-blue-action';

        const action = renderActionHeader(actions['documentpicker.open'],
            renderValue(params.WFFile ?? 'Shortcuts'),
            actionText('at path'),
            renderValue(params.WFGetFilePath, 'example.txt'),
        );
        action.appendChild(renderParameters(actions['documentpicker.open'], {
            'Error If Not Found': params.WFFileErrorIfNotFound,
        }));

        return action;
    }
}
