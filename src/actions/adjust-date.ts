import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface AdjustDateParams {
    WFAdjustOperation: string
    WFDuration: object | string
    WFDate: object | string
}

export default {
    icon: 'calendar',
    render: (container: HTMLElement, params: AdjustDateParams) => {
        container.classList.add('sp-date-action');

        return renderActionHeader(actions['adjustdate'], renderValue(params.WFAdjustOperation ?? 'Add'), renderValue(params.WFDuration, '0'), renderValue(params.WFDate, 'Date'));
    }
}