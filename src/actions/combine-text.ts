import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface CombineTextParameters {
    text: string
    WFTextSeparator: string
    WFTextCustomSeparator: string
}

export default {
    title: 'Combine',
    color: 'white',
    background: '#ffc200',
    icon: 'icon-text_alignleft',
    render: (container: HTMLElement, params: CombineTextParameters) => {
        return renderActionHeader(actions['text.combine'],
            renderValue(params['text'], 'Text List'),
            actionText('with'),
            renderValue(params['WFTextSeparator'] ?? null, 'Separator'),
            renderValue(params['WFTextCustomSeparator'] ?? null, 'CustomSeparator'),
        );
    }
}
