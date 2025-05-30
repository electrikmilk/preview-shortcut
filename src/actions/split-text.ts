import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

import {Colors} from "~/colors";

interface SplitTextParameters {
    text: string
    WFTextSeparator: string
    WFTextCustomSeparator: string
}

export default {
    title: 'Split',
    background: Colors.Yellow,
    icon: 'icon-text_alignleft',
    render: (container: HTMLElement, params: SplitTextParameters) => {
        let split: HTMLElement[] = [
            renderValue(params['text'], 'Text List'),
            actionText('by'),
            renderValue(params['WFTextSeparator'] ?? 'New Lines', 'Separator')
        ];

        if (params['WFTextSeparator'] === 'Custom') {
            split.push(renderValue(params['WFTextCustomSeparator'], 'Custom Separator'));
        }


        return renderActionHeader(actions['text.split'], ...split);
    }
}
