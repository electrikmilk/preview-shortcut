import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface SplitTextParameters {
    text: string
    WFTextSeparator: string
    WFTextCustomSeparator: string
}

export default {
    title: 'Split',
    color: 'white',
    background: '#ffc200',
    icon: 'icon-text_alignleft',
    render: (container: HTMLElement, params: SplitTextParameters) => {
        return renderActionHeader(actions['text.split'],
            renderValue(params['text'], 'Text List'),
            actionText('by'),
            renderValue(params['WFTextSeparator'] ?? null, 'Separator'),
            renderValue(params['WFTextCustomSeparator'] ?? null, 'Custom Separator'),
        );
    }
}
