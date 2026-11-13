import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

export default {
    title: 'Get clipboard',
    icon: 'doc_on_clipboard',
    render: (container: HTMLElement) => {
        container.classList.add('sp-blue-action');

        return renderActionHeader(actions['getclipboard']);
    }
}