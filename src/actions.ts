import Text from "~/actions/text";
import Comment from "~/actions/comment";
import SetVariable from "~/actions/set-variable";
import ShowAlert from "~/actions/show-alert";

interface ActionDefinitions {
    [key: string]: ActionDefinition
}

export interface ActionDefinition {
    title?: string
    icon?: string
    color?: string,
    background?: string,
    params?: ActionParameterMap
    render?: (container: HTMLElement, params: any) => HTMLElement
}

interface ActionParameterMap {
    [key: string]: string
}

export let actions: ActionDefinitions = {
    'gettext': Text,
    'comment': Comment,
    'setvariable': SetVariable,
    'alert': ShowAlert
};
