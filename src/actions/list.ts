import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface ListParameters {
    WFItems: Array<string>
}

export default {
    title: 'List',
    color: 'white',
    background: '#fc880f',
    icon: 'list_bullet',
    render: (container: HTMLElement, params: ListParameters) => {
        const action = document.createElement('div');
        const header = renderActionHeader(actions['list']);
        action.appendChild(header);
        const list = document.createElement('div');
        list.className = 'sp-action-list-content';
        const ul = document.createElement('ul');
        if (params['WFItems'].length !== 0) {
            for (let item in params['WFItems']) {
                const li = document.createElement('li');
                let itemValue = params['WFItems'][item];
                if (typeof itemValue !== 'string') {
                    itemValue = itemValue['WFValue']
                }
                const value = renderValue(itemValue, 'List Item');
                value.classList.add('sp-unstyled-value');
                li.appendChild(value);
                ul.appendChild(li);
            }
        }
        const footer = document.createElement('div');
        footer.className = 'sp-action-list-footer';
        const itemsSize = params["WFItems"].length;
        footer.innerText = itemsSize + ' item' + (itemsSize ? 's' : '');

        list.appendChild(ul);
        list.appendChild(footer);
        action.appendChild(list);

        const br = document.createElement('br');
        action.appendChild(br);

        return action;
    }
}
