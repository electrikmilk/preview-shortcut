import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

interface GetFromListParameters {
    WFInput: string | object,
    WFItemSpecifier: string
}


export default {
    title: 'Get',
    background: Colors.Orange,
    icon: 'list_bullet',
    render: (container: HTMLElement, params: GetFromListParameters) => {
        return renderActionHeader(actions['getitemfromlist'],
            renderValue(params['WFItemSpecifier'], 'Item Specifier'),
            actionText('from'),
            renderValue(params['WFInput'] ?? null, 'Input'),
        );
    }
}
