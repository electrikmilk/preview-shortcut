import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

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
    icon: 'square_list',
    background: '#55bef0',
    render: (container: HTMLElement, params: ChooseFromMenuParameters) => {
        let action;
        if (params['WFControlFlowMode'] == 0) {
            action = renderActionHeader(actions['choosefrommenu'],
                actionText('Choose from menu with'),
                renderValue(params['WFMenuPrompt'] ?? null, 'Prompt')
            );

            const list = document.createElement('div');
            list.className = 'sp-action-list-content sp-unstyled-value';
            const ul = document.createElement('ul');
            if (params['WFMenuItems'].length !== 0) {
                for (let item in params['WFMenuItems']) {
                    const li = document.createElement('li');
                    // @ts-ignore
                    const value = renderValue(params['WFMenuItems'][item].WFValue, 'Menu Item');
                    value.classList.add('sp-unstyled-value');
                    li.appendChild(value);
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

            action.appendChild(document.createElement('br'));
        } else {
            const header: HTMLElement[] = [];

            if (params['WFControlFlowMode'] == 2) {
                header.push(actionText('End Menu'));
            } else if (params['WFControlFlowMode'] == 1) {
                const value = renderValue(params['WFMenuItemTitle'] ?? params['WFMenuItemAttributedTitle'] ?? null, 'Item');
                value.classList.add('sp-unstyled-value');
                value.setAttribute('style', 'font-weight: bold');
                header.push(value);
            }

            action = renderActionHeader(actions['choosefrommenu'], ...header);
        }

        return action;
    }
}
