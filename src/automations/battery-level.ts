import {AutomationDefinition, renderAutomationContent, renderEnumValue} from "~/automations";
import {Colors} from "~/colors";
import {renderValue} from "~/value";

interface BatteryLevelTriggerParameters {
    WFBatteryLevel?: number
    WFBatteryLevelComparison?: string
}

const defaultBatteryLevel = 50;

const comparisonTitles = {
    equals: 'Equals',
    falls_below: 'Falls Below',
    rises_above: 'Rises Above',
};

const definition: AutomationDefinition = {
    title: 'When',
    icon: 'battery_100',
    color: Colors.Green,
    background: 'transparent',
    render: (_container: HTMLElement, params: BatteryLevelTriggerParameters) => {
        // Cherri offsets the level by -0.01 because Shortcuts requires a decimal, so round it back.
        const level = Math.round(params.WFBatteryLevel ?? defaultBatteryLevel);

        return renderAutomationContent(
            definition,
            params,
            ['WFBatteryLevel', 'WFBatteryLevelComparison'],
            renderValue('Battery Level'),
            renderEnumValue(comparisonTitles, params.WFBatteryLevelComparison, 'equals'),
            renderValue(`${level}%`),
        );
    }
}

export default definition;
