import {renderActionIcon, renderListItem} from "~/render";

export default {
    render: (container: HTMLElement) => {
        container.className += ' sp-nothing-action';

        const action = document.createElement('div');
        action.style.display = 'flex';
        action.style.justifyItems = 'inline-flex';

        action.style.gap = '0 10px';
        const header = document.createElement('div');
        header.className = 'sp-action-title';
        header.innerText = 'Nothing';

        action.appendChild(header);
        return renderListItem(renderActionIcon('viewfinder', 'black', 'transparent'), action.outerHTML);
    }
}