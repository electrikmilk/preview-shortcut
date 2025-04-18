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
import IfElse from "~/actions/if-otherwise";
import Nothing from "~/actions/nothing";
import Url from "~/actions/url";
import Date from "~/actions/date";
import Count from "~/actions/count";
import ChooseFromMenu from "~/actions/choose-from-menu";
import Math from "~/actions/math";
import Stop from "~/actions/stop";
import Wait from "~/actions/wait";
import ChooseFromList from "~/actions/choose-from-list";
import CombineText from "~/actions/combine-text";
import AskForInput from "~/actions/ask-for-input";
import SplitText from "~/actions/split-text";
import GetFromList from "~/actions/get-from-list";
import SetName from "~/actions/set-name";
import Output from "~/actions/output";
import CopyToClipboard from "~/actions/copy-to-clipboard";
import RunShortcut from "~/actions/run-shortcut";
import CalculateExpression from "~/actions/calculate-expression";
import Dictionary from "~/actions/dictionary";
import GetDictionary from "~/actions/get-dictionary";
import GetDictionaryValue from "~/actions/get-dictionary-value";
import SetDictionaryValue from "~/actions/set-dictionary-value";
import GetIpAddress from "~/actions/get-ip-address";
import GetFileFromFolder from "~/actions/get-file-from-folder";
import GetType from "~/actions/get-type";
import GetNumbers from "~/actions/get-numbers";
import EmailAddress from "~/actions/email-address";
import PhoneNumber from "~/actions/phone-number";
import URLEncode from "~/actions/url-encode";
import DownloadURL from "~/actions/download-url";
import SaveToCameraRoll from "~/actions/save-to-camera-roll";
import OpenURL from "~/actions/open-url";

interface ActionDefinitions {
    [key: string]: ActionDefinition
}

export interface ActionDefinition {
    title?: string
    icon?: string
    color?: string
    background?: string
    params?: ActionParameterMap
    render?: (container: HTMLElement, params: any) => HTMLElement
}

interface ActionParameterMap {
    [key: string]: string
}

export let actions: ActionDefinitions = {
    'gettext': Text,
    'downloadurl': DownloadURL,
    'ask': AskForInput,
    'text.combine': CombineText,
    'text.split': SplitText,
    'getitemfromlist': GetFromList,
    'comment': Comment,
    'setvariable': SetVariable,
    'appendvariable': AddToVariable,
    'number': Number,
    'alert': ShowAlert,
    'showresult': ShowResult,
    'list': List,
    'nothing': Nothing,
    'url': Url,
    'date': Date,
    'count': Count,
    'choosefrommenu': ChooseFromMenu,
    'choosefromlist': ChooseFromList,
    'conditional': IfElse,
    'repeat.count': Repeat,
    'repeat.each': RepeatWithEach,
    'math': Math,
    'delay': Wait,
    'exit': Stop,
    'setitemname': SetName,
    'output': Output,
    'setclipboard': CopyToClipboard,
    'runworkflow': RunShortcut,
    'calculateexpression': CalculateExpression,
    'dictionary': Dictionary,
    'detect.dictionary': GetDictionary,
    'getvalueforkey': GetDictionaryValue,
    'setvalueforkey': SetDictionaryValue,
    'getipaddress': GetIpAddress,
    'documentpicker.open': GetFileFromFolder,
    'getitemtype': GetType,
    'detect.number': GetNumbers,
    'email': EmailAddress,
    'phonenumber': PhoneNumber,
    'urlencode': URLEncode,
    'savetocameraroll': SaveToCameraRoll,
    'openurl': OpenURL,
};

export function actionText(value: string): HTMLElement {
    const text = document.createElement('div');
    text.innerText = value;
    text.className = 'sp-action-text';

    return text;
}
