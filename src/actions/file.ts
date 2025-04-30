import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface FileParameters {
    WFFile: WFFile
}

export interface WFFile {
    fileLocation: FileLocation
    displayName: string
    filename: string
}

interface FileLocation {
    WFFileLocationType: string
    relativeSubpath: string
}

export function fileValue(file: WFFile) {
    return [
        renderValue(file.fileLocation.WFFileLocationType),
        actionText('/'),
        renderValue(file.fileLocation.relativeSubpath)
    ]
}

export default {
    icon: 'doc_fill',
    render: (container: HTMLElement, params: FileParameters) => {
        container.classList.add('sp-blue-action')

        return renderActionHeader(actions['file'], ...fileValue(params.WFFile))
    }
}
