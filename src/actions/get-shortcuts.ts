import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface GetShortcutsParameters {

}

export default {
    title: 'Get shortcuts from',
    icon: '',
    render: (container: HTMLElement, params: GetShortcutsParameters) => {
        container.classList.add('sp-shortcut-action');

        return renderActionHeader(actions['getmyworkflows'], renderValue('All Shortcuts'))
    }
}
