import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

interface DoNotDisturbParameters {
    Operation: string
    Enabled: boolean
    AssertionType: string
    Event: object | string
    Time: object | string
}

export default {
    background: Colors.Purple,
    icon: 'moon_fill',
    render: (_container: HTMLElement, params: DoNotDisturbParameters) => {
        let header = [];
        if (params.Operation !== "Toggle") {
            renderValue(params.Enabled ? 'On' : 'Off', 'Enabled')

            if (params.Enabled) {
                header.push(actionText("until"), renderValue(params.AssertionType ?? 'Turned Off'));

                if (params.AssertionType) {
                    if (params.AssertionType === "Time") {
                        header.push(renderValue(params.Time));
                    }
                    switch (params.AssertionType) {
                        case "Time":
                            header.push(renderValue(params.Time));
                            break;
                        case "Event Ends":
                            header.push(renderValue(params.Event));
                            break;
                    }
                }
            }
        }

        return renderActionHeader(actions['dnd.set'], renderValue(params.Operation ?? 'Turn'), actionText("Do Not Disturb"), ...header);
    }
}
