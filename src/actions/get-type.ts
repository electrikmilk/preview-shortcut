import {renderActionHeader} from "~/render";
import {actions} from "~/actions";
import {renderValue} from "~/value";

interface GetTypeParameters {
    WFInput: string,
    WFName: string,
    WFDontIncludeFileExtension: boolean,
}

export default {
    title: "Get type of",
    icon: "question_diamond_fill",
    background: '#8e8e93',
    render: (container: HTMLElement, params: GetTypeParameters) => {
        return renderActionHeader(actions['getitemtype'],
            renderValue(params['WFInput'], 'Input'),
        );
    }
}