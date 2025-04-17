import {ContactValue, renderContactValue, renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

import {Colors} from "~/colors";

interface PhoneNumberParameters {
    WFPhoneNumber: WFPhoneNumber
}

interface WFPhoneNumber {
    Value: Value
}

interface Value {
    WFContactFieldValues: ContactValue[]
}

export default {
    title: 'Phone Number',
    icon: 'phone_fill',
    background: Colors.Green,
    render: (container: HTMLElement, params: PhoneNumberParameters) => {
        let values = [];
        if (params.WFPhoneNumber.Value.WFContactFieldValues !== undefined) {
            for (const param of params.WFPhoneNumber.Value.WFContactFieldValues) {
                values.push(renderContactValue(param.SerializedEntry, param.EntryType))
            }
        } else {
            values.push(renderValue(params.WFPhoneNumber))
        }

        return renderActionHeader(actions['phonenumber'], ...values);
    }
}
