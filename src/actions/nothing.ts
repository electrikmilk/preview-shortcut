import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

export default {
    title: 'Nothing',
    icon: 'viewfinder',
    color: 'black',
    background: 'transparent',
    render: (container: HTMLElement) => {
        container.className += ' sp-nothing-action';

        return renderActionHeader(actions['nothing']);
    }
}