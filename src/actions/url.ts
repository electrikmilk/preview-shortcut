import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

interface URLParameters {
    WFURLActionURL: Array<object | string>
}

export default {
    icon: 'link',
    render: (container: HTMLElement, params: URLParameters) => {
        container.className += ' sp-url-action';

        let links: HTMLElement[] = [];
        if (params['WFURLActionURL']) {
            params['WFURLActionURL'].forEach(url => {
                links.push(renderValue(url, 'URL'));
            });
        }

        return renderActionHeader(actions['url'], ...links);
    }
}
