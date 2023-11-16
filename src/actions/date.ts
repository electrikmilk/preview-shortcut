import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

interface DateParameters {
    WFDateActionMode: string
    WFDateActionDate: string | object
}

export default {
    icon: 'calendar',
    render: (container: HTMLElement, params: DateParameters) => {
        container.className += ' sp-date-action';

        return renderActionHeader(actions['date'],
            renderValue(params['WFDateActionMode'] == 'Specified Date' ? params['WFDateActionDate'] : 'Current Date', 'Date'),
        );
    }
}
