import {renderValue} from "~/value";
import {renderActionContent, renderActionHeader, renderActionIcon, renderListItem, renderParameters} from "~/render";
import {actions} from "~/actions";

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
                li.innerText = params['WFItems'][item];
                ul.appendChild(li);
            }
        }
        list.appendChild(ul);
        action.appendChild(list);
        const footer = document.createElement('div');
        footer.className = 'sp-action-list-footer';
        footer.innerText = params["WFItems"].length + ' item';
        if (params["WFItems"].length !== 1) {
            footer.innerText += 's';
        }
        list.appendChild(footer);
        const br = document.createElement('br');
        action.appendChild(br);
        return action;
    }
}
