import {Colors} from "~/colors";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface GetVariableParameters {
    WFVariable: object | string
}

export default {
    title: 'Get',
    icon: "f_cursive",
    background: Colors.Orange,
    render: (container: HTMLElement, params: GetVariableParameters) => {
        return renderActionHeader(actions['getvariable'], renderValue(params.WFVariable))
    }
}