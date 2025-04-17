import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {ContactValue, renderContactValue, renderValue} from "~/value";

import {Colors} from "~/colors";

interface EmailAddressParameters {
    WFEmailAddress: WFEmailAddress
}

interface WFEmailAddress {
    Value: Value
}

interface Value {
    WFContactFieldValues: ContactValue[]
}

export default {
    title: 'Email Address',
    icon: 'envelope_fill',
    background: Colors.LightBlue,
    render: (container: HTMLElement, params: EmailAddressParameters) => {
        let values = [];
        if (params.WFEmailAddress.Value.WFContactFieldValues !== undefined) {
            for (const param of params.WFEmailAddress.Value.WFContactFieldValues) {
                values.push(renderContactValue(param.SerializedEntry, param.EntryType))
            }
        } else {
            values.push(renderValue(params.WFEmailAddress))
        }

        return renderActionHeader(actions['email'], ...values);
    }
}