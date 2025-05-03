import {Colors} from "~/colors";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface GetDeviceDetailsParameters {
    WFDeviceDetail: object | string
}

export default {
    title: 'Get the',
    background: Colors.Blue,
    icon: 'desktopcomputer',
    render(container: HTMLElement, params: GetDeviceDetailsParameters) {
        return renderActionHeader(actions['getdevicedetails'], renderValue(params.WFDeviceDetail))
    }
}