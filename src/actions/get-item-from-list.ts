import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";
import {renderText} from "~/element";

interface GetFromListParameters {
    WFInput: string | object,
    WFItemSpecifier: string,
    WFItemIndex: number | null,
    WFItemRangeStart: number | null,
    WFItemRangeEnd: number | null,
}

export default {
    title: 'Get',
    background: Colors.Orange,
    icon: 'list_bullet',
    render: (_container: HTMLElement, params: GetFromListParameters) => {
        let indexes: HTMLElement[] = [];
        switch (params.WFItemSpecifier) {
            case "Items in Range":
                indexes = [
                    renderValue(params.WFItemRangeStart ?? 0),
                    // @ts-ignore
                    renderText('to'),
                    renderValue(params.WFItemRangeEnd ?? 0)
                ];
                break;
            case "Item At Index":
                indexes = [renderValue(params.WFItemIndex ?? 0)];
        }

        return renderActionHeader(actions['getitemfromlist'],
            renderValue(params.WFItemSpecifier, 'Item Specifier'),
            ...indexes,
            actionText('from'),
            renderValue(params.WFInput ?? null, 'Input'),
        );
    }
}
