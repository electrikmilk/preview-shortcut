import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

interface CommentActionParameters {
    WFCommentActionText: any
}

export default {
    title: 'Comment',
    icon: 'icon-text_alignleft',
    color: '#ffbf00',
    background: '#fbf5e8',
    render: (container: HTMLElement, params: CommentActionParameters) => {
        container.classList.add('sp-comment-action');

        const action = document.createElement('div');
        const header = renderActionHeader(actions['comment']);
        action.appendChild(header);

        const content = document.createElement('div');
        content.className = 'sp-action-content';

        const value = document.createElement('div');
        content.appendChild(value);

        value.className = 'sp-scrollable-action-content';
        value.innerText = params['WFCommentActionText'] ?? null;

        action.appendChild(content);

        action.appendChild(document.createElement('br'));

        return action;
    }
}
