import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderUnstyledValue} from "~/value";

import {Colors} from "~/colors";
import {renderClass, renderElement} from "~/element";

interface ListParameters {
    WFItems: []
}

export default {
    title: 'List',
    color: 'white',
    background: Colors.Orange,
    icon: 'list_bullet',
    render: (container: HTMLElement, params: ListParameters) => {
        const action = renderElement();
        const header = renderActionHeader(actions['list']);
        action.appendChild(header);
        const list = renderClass('sp-action-list-content');
        const ul = renderElement('ul');
        if (params.WFItems.length !== 0) {
            for (let item in params.WFItems) {
                const li = renderElement('li');
                let itemValue = params.WFItems[item];
                if (typeof itemValue !== 'string') {
                    itemValue = itemValue['WFValue']
                }
                li.appendChild(renderUnstyledValue(itemValue, 'List Item'));
                ul.appendChild(li);
            }
        }
        const itemsSize = params.WFItems.length;
        const footer = renderElement('div', {
            className: 'sp-action-list-footer',
            innerText: itemsSize + ' item' + (itemsSize ? 's' : '')
        })

        list.appendChild(ul);
        list.appendChild(footer);
        action.appendChild(list);

        action.appendChild(renderElement('br'));

        return action;
    }
}
