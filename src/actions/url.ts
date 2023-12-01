import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

interface URLParameters {
    WFURLActionURL: Array<object | string>
}

export default {
    icon: 'link',
    render: (container: HTMLElement, params: URLParameters) => {
        container.className += ' sp-blue-action';

        let links: HTMLElement[] = [];
        if (params['WFURLActionURL'].length !== 0) {
            params['WFURLActionURL'].forEach(url => {
                links.push(renderValue(url, 'URL'));
            });
        } else {
            links.push(renderValue(null, 'URL'));
        }

        return renderActionHeader(actions['url'], ...links);
    }
}
