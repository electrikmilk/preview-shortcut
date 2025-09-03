import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

interface DoNotDisturbParameters {
    Operation: string
    Enabled: boolean
}

export default {
    background: Colors.Purple,
    icon: 'moon_fill',
    render: (_container: HTMLElement, params: DoNotDisturbParameters) => {
        return renderActionHeader(actions['dnd.set'], renderValue(params.Operation ?? 'Turn'), actionText("Do Not Disturb"), renderValue(params.Enabled ? 'On' : 'Off', 'Enabled'));
    }
}
