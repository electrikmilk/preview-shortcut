import {renderValue} from "~/value";
import {renderActionContent, renderActionHeader, renderActionIcon, renderListItem} from "~/render";

interface CommentActionParameters {
    WFCommentActionText: any
}

interface TextActionParameters {
    WFTextActionText: any
}

interface SetVariableParameters {
    WFVariableName: string | object
    WFInput: string | object
}

interface ActionDefinitions {
    [key: string]: ActionDefinition
}

export interface ActionDefinition {
    title?: string
    icon?: string
    color?: string,
    background?: string,
    params?: ActionParameterMap
    render?: (container: HTMLElement, params: any) => HTMLElement
}

interface ActionParameterMap {
    [key: string]: string
}

export let actions: ActionDefinitions = {
    'gettext': {
        title: 'Text',
        color: 'white',
        background: '#ffc200',
        icon: 'icon-text_alignleft',
        render: (container: HTMLElement, params: TextActionParameters) => {
            const action = document.createElement('div');
            const header = renderActionHeader(actions['gettext']);
            action.appendChild(header);
            const value = document.createElement('div');
            value.className = 'sp-action-scrollable-content';
            value.innerHTML = renderValue(params['WFTextActionText'], 'Text');
            action.appendChild(renderActionContent(value.outerHTML));

            return action;
        }
    },
    'comment': {
        title: 'Comment',
        icon: 'icon-text_alignleft',
        color: '#ffbf00',
        background: '#fbf5e8',
        render: (container: HTMLElement, params: CommentActionParameters) => {
            container.className += ' sp-comment-action';
            const action = document.createElement('div');
            const header = renderActionHeader(actions['comment']);
            action.appendChild(header);
            const value = document.createElement('div');
            value.className = 'sp-action-scrollable-content';
            value.innerText = params['WFCommentActionText'] ?? null;
            action.appendChild(renderActionContent(value.outerHTML));

            return action;
        }
    },
    'setvariable': {
        title: 'Set Variable',
        params: {
            'WFTextActionText': 'Text'
        },
        render: (container: HTMLElement, params: SetVariableParameters) => {
            const action = document.createElement('div');
            action.style.display = 'flex';
            action.style.justifyItems = 'inline-flex';
            action.style.gap = '0 10px';

            const header = document.createElement('div');
            header.innerText = 'Set variable';
            action.appendChild(header);

            const varName = document.createElement('div');
            varName.innerHTML = renderValue(params['WFVariableName'], 'Variable Name');
            action.appendChild(varName);

            const to = document.createElement('div');
            to.innerText = 'to';
            to.className = 'shortcut-action-text';
            action.appendChild(to);

            const varValue = document.createElement('div');
            varValue.style.display = 'inline-block';
            varValue.innerHTML = renderValue(params['WFInput'] ?? null, 'Input');
            action.appendChild(varValue);

            return renderListItem(renderActionIcon('f_cursive', 'white', '#fc880f'), action.outerHTML);
        }
    },
    'alert': {
        title: 'Show Alert',
        icon: 'macwindow',
        color: 'white',
        background: '#fec303',
        params: {
            'WFAlertActionTitle': 'Title',
            'WFAlertActionMessage': 'Message',
            'WFAlertActionCancelButtonShown': 'Show Cancel Button',
        }
    }
};
