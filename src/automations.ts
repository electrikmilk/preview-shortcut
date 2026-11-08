import {ActionDefinition} from "~/actions";
import {renderActionHeader, renderParameters} from "~/render";
import {renderValue} from "~/value";

import Wifi from "~/automations/wifi";
import Bluetooth from "~/automations/bluetooth";
import Display from "~/automations/display";
import Screenshot from "~/automations/screenshot";
import BatteryLevel from "~/automations/battery-level";
import Charger from "~/automations/charger";
import StageManager from "~/automations/stage-manager";

export type AutomationDefinition = ActionDefinition

interface AutomationDefinitions {
    [key: string]: AutomationDefinition
}

export interface AutomationParameters {
    [key: string]: any
}

interface EnumTitles {
    [value: string]: string
}

export let automations: AutomationDefinitions = {
    'WFWifiTrigger': Wifi,
    'WFBluetoothTrigger': Bluetooth,
    'WFExternalDisplayTrigger': Display,
    'WFScreenshotTrigger': Screenshot,
    'WFBatteryLevelTrigger': BatteryLevel,
    'WFPlugInTrigger': Charger,
    'WFStageManagerTrigger': StageManager,
};

/**
 * Renders the trigger header, followed by a row for every parameter the definition does not handle
 * itself, so a parameter Shortcuts adds later is still visible.
 */
export function renderAutomationContent(
    definition: AutomationDefinition,
    parameters: AutomationParameters,
    handledKeys: string[],
    ...headerContent: HTMLElement[]
): HTMLElement {
    const header = renderActionHeader(definition, ...headerContent);

    const unhandledParameters: AutomationParameters = {};
    for (const key of Object.keys(parameters)) {
        if (!handledKeys.includes(key)) {
            unhandledParameters[key] = parameters[key];
        }
    }
    if (!Object.keys(unhandledParameters).length) {
        return header;
    }

    const content = document.createElement('div');
    content.appendChild(header);
    content.appendChild(renderParameters(definition, unhandledParameters));

    return content;
}

// A parameter that is absent means the trigger's default, which Shortcuts does not write to the shortcut.
export function renderEnumValue(titles: EnumTitles, value: string | undefined, defaultValue: string): HTMLElement {
    const selectedValue = value ?? defaultValue;

    return renderValue(titles[selectedValue] ?? selectedValue);
}

export function humanizeTriggerIdentifier(identifier: string): string {
    return identifier
        .replace(/^WF/, '')
        .replace(/Trigger$/, '')
        .replace(/([a-z])([A-Z])/g, '$1 $2');
}

export let missingAutomationDefinitions: Array<string> = []

export function missingFormalAutomationDefinition(identifier: string) {
    if (missingAutomationDefinitions.includes(identifier)) {
        return;
    }
    if (!missingAutomationDefinitions.length) {
        console.warn(
            'Missing formal definitions for the following automations.',
            '\n\nAutomatic rendering should allow you to still read the value of the automation\'s parameters.' +
            '\n\n**However, values unique to the automation will likely not render properly.**'
        );
    }
    console.warn(
        `Missing formal definition of ${identifier}.`,
    );
    missingAutomationDefinitions.push(identifier);
}
