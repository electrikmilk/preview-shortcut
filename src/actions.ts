import Text from "~/actions/text";
import Comment from "~/actions/comment";
import SetVariable from "~/actions/set-variable";
import ShowAlert from "~/actions/show-alert";
import AddToVariable from "~/actions/add-to-variable";
import Number from "~/actions/number";
import ShowResult from "~/actions/show-result";
import List from "~/actions/list";
import RepeatWithEach from "~/actions/repeat-with-each";
import Repeat from "~/actions/repeat";

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
    'appendvariable': AddToVariable,
    'number': Number,
    'alert': ShowAlert,
    'showresult': ShowResult,
    'list': List,
    'repeat.count': Repeat,
    'repeat.each': RepeatWithEach
};
