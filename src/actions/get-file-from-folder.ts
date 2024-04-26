import {renderActionHeader, renderParameters} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface GetIPAddress {
    WFGetFilePath: string | object
    WFFile: string | object
    WFGetFolderContents: boolean
    WFShowFilePicker: boolean
    WFFileErrorIfNotFound: boolean
}

export default {
    title: "Get file from",
    icon: 'house_fill',
    render: (container: HTMLElement, params: GetIPAddress) => {
        container.className += ' sp-blue-action';

        const action = renderActionHeader(actions['documentpicker.open'],
            renderValue(params.WFFile, 'Shortcuts'),
            actionText('at path'),
            renderValue(params.WFGetFilePath, 'example.txt'),
        );
        action.appendChild(renderParameters(actions['documentpicker.open'], {
            'Error If Not Found': params.WFFileErrorIfNotFound,
        }));

        return action;
    }
}
