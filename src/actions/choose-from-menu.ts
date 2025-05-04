import {renderUnstyledValue, renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";

import {Colors} from "~/colors";
import {renderClass, renderElement} from "~/element";

interface ChooseFromMenuParameters {
    WFMenuPrompt: string | object,
    WFControlFlowMode: number,
    WFMenuItems: Array<object>,
    WFMenuItemTitle: string | object,
    WFMenuItemAttributedTitle: string | object
}

export default {
    icon: 'square_list',
    background: Colors.LightBlue,
    render: (container: HTMLElement, params: ChooseFromMenuParameters) => {
        let action;
        if (params.WFControlFlowMode == 0) {
            action = renderActionHeader(actions['choosefrommenu'],
                actionText('Choose from menu with'),
                renderValue(params.WFMenuPrompt ?? null, 'Prompt')
            );

            const list = renderClass('sp-action-list-content sp-unstyled-value');
            const ul = renderElement('ul');
            if (params.WFMenuItems.length !== 0) {
                for (let item in params.WFMenuItems) {
                    const li = renderElement('li');
                    // @ts-ignore
                    const value = renderUnstyledValue(params.WFMenuItems[item].WFValue ?? params.WFMenuItems[item], 'Menu Item');
                    li.appendChild(value);
                    ul.appendChild(li);
                }
            }
            const itemsSize = params.WFMenuItems.length;
            const footer = renderElement('div', {
                className: 'sp-action-list-footer',
                innerText: itemsSize + ' item' + (itemsSize ? 's' : '')
            })

            list.appendChild(ul);
            list.appendChild(footer);
            action.appendChild(list);

            action.appendChild(renderElement('br'));
        } else {
            const header: HTMLElement[] = [];

            if (params.WFControlFlowMode == 2) {
                header.push(actionText('End Menu'));
            } else if (params.WFControlFlowMode == 1) {
                const value = renderUnstyledValue(params.WFMenuItemTitle ?? params.WFMenuItemAttributedTitle ?? null, 'Item');
                value.setAttribute('style', 'font-weight: bold');
                header.push(value);
            }

            action = renderActionHeader(actions['choosefrommenu'], ...header);
        }

        return action;
    }
}
