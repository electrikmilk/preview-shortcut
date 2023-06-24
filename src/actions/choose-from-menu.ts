import {renderValue} from "~/value";
import {renderActionIcon, renderListItem} from "~/render";

interface ChooseFromMenuParameters {
    WFMenuPrompt: string | object,
    WFControlFlowMode: number,
    WFMenuItems: Array<object>,
    WFMenuItemTitle: string | object,
    WFMenuItemAttributedTitle: string | object
}

interface ChooseFromMenuItem {
    WFItemType: number,
    WFValue: string | object
}

export default {
    render: (container: HTMLElement, params: ChooseFromMenuParameters) => {
        const action = document.createElement('div');
        if (params['WFControlFlowMode'] == 0) {
            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.justifyItems = 'inline-flex';
            header.style.gap = '0 10px';
            header.className = 'sp-action-title';
            header.innerText = 'Choose from menu with ';

            const input = document.createElement('div');
            input.style.display = 'inline-block';
            input.innerHTML = renderValue(params['WFMenuPrompt'] ?? null, 'Prompt');
            header.appendChild(input);

            const item = renderListItem(renderActionIcon('square_list', 'white', '#55bef0'), header.outerHTML);
            action.appendChild(item);

            const list = document.createElement('div');
            list.className = 'sp-action-list-content';
            const ul = document.createElement('ul');
            if (params['WFMenuItems'].length !== 0) {
                for (let item in params['WFMenuItems']) {
                    const li = document.createElement('li');
                    // @ts-ignore
                    li.innerHTML = renderValue(params['WFMenuItems'][item].WFValue, 'Menu Item');
                    ul.appendChild(li);
                }
            }
            const footer = document.createElement('div');
            footer.className = 'sp-action-list-footer';
            footer.innerText = params["WFMenuItems"].length + ' item';
            if (params["WFMenuItems"].length !== 1) {
                footer.innerText += 's';
            }

            list.appendChild(ul);
            list.appendChild(footer);
            action.appendChild(list);

            const br = document.createElement('br');
            action.appendChild(br);

            return action;
        } else {
            if (params['WFControlFlowMode'] == 2) {
                const header = document.createElement('div');
                header.className = 'sp-action-title';
                header.innerText = 'End Menu';
                action.appendChild(header);
            } else if (params['WFControlFlowMode'] == 1) {
                const header = document.createElement('div');
                header.className = 'sp-action-title';
                header.innerHTML = renderValue(params['WFMenuItemTitle'] ?? params['WFMenuItemAttributedTitle'] ?? null, 'Item');
                action.appendChild(header);
            }
            return renderListItem(renderActionIcon('square_list', 'white', '#55bef0'), action.outerHTML);
        }
    }
}
