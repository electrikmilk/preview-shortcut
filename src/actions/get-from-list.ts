import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface GetFromListParameters {
    WFInput: string | object,
    WFItemSpecifier: string
}


export default {
    title: 'Get',
    color: 'white',
    background: '#fc880f',
    icon: 'list_bullet',
    render: (container: HTMLElement, params: GetFromListParameters) => {
        return renderActionHeader(actions['getitemfromlist'],
            renderValue(params['WFItemSpecifier'], 'Item Specifier'),
            actionText('from'),
            renderValue(params['WFInput'] ?? null, 'Input'),
        );
    }
}
