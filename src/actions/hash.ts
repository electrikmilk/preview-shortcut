import {Colors} from "~/colors";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";
import {renderText} from "~/element";

interface HashParameters {
    WFInput: object | string
    WFHashType: object | string
}

export default {
    title: 'Generate',
    icon: "hexagon_fill",
    background: Colors.Gray,
    render: (container: HTMLElement, params: HashParameters) => {
        return renderActionHeader(actions['hash'],
            renderValue(params.WFHashType ?? 'MD5'),
            // @ts-ignore
            renderText('hash of'),
            renderValue(params.WFInput)
        )
    }
}
