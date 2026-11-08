import {actionText} from "~/actions";
import {AutomationDefinition, renderAutomationContent} from "~/automations";
import {Colors} from "~/colors";
import {renderValue} from "~/value";

interface ScreenshotTriggerParameters {
    ScreenshotLocations?: string[]
}

const locationTitles: { [location: string]: string } = {
    photos: 'Photos',
    files: 'Files',
    clipboard: 'Clipboard',
};

function renderLocations(locations?: string[]): HTMLElement {
    if (!locations || !locations.length) {
        return renderValue(undefined, 'Location');
    }

    return renderValue(locations.map(location => locationTitles[location] ?? location).join(', '));
}

const definition: AutomationDefinition = {
    title: 'When I save a screenshot to',
    icon: 'camera_viewfinder',
    color: Colors.Blue,
    background: 'transparent',
    render: (_container: HTMLElement, params: ScreenshotTriggerParameters) => {
        return renderAutomationContent(
            definition,
            params,
            ['ScreenshotLocations'],
            renderLocations(params.ScreenshotLocations),
        );
    }
}

export default definition;
