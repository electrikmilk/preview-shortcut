import {renderValue} from "~/value";
import {renderActionHeader} from "~/render";
import {actions} from "~/actions";

interface URLParameters {
    WFURLActionURL: WFURLActionURL
}

interface WFURLActionURL {
    Value: object
}

export default {
    icon: 'link',
    render: (container: HTMLElement, params: URLParameters) => {
        container.className += ' sp-blue-action';

        let links: HTMLElement[] = [];
        if (Array.isArray(params.WFURLActionURL)) {
            if (params.WFURLActionURL && params.WFURLActionURL.length !== 0) {
                params.WFURLActionURL.forEach(url => {
                    links.push(renderValue(url, 'URL'));
                });
            }
        } else {
            links.push(renderValue(params.WFURLActionURL))
        }

        if (!links.length) {
            links.push(renderValue(null, 'URL'));
        }

        return renderActionHeader(actions['url'], ...links);
    }
}
