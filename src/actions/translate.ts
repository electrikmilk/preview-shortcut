import {renderActionHeader} from "~/render";
import {actions, actionText} from "~/actions";
import {renderValue} from "~/value";

interface TranslateParameters {
    WFInputText: object | string
    WFSelectedFromLanguage: object | string
    WFSelectedLanguage: object | string
}

const languages = {
    "ar_AE": "Arabic",
    "zh_CN": "Mandarin Chinese (Mainland)",
    "zh_TW": "Mandarin Chinese (Taiwan)",
    "nl_NL": "Dutch",
    "en_GB": "English (UK)",
    "en_US": "English (US)",
    "fr_FR": "French",
    "de_DE": "German",
    "id_ID": "Indonesian",
    "it_IT": "Italian",
    "jp_JP": "Japanese",
    "ko_KR": "Korean",
    "pl_PL": "Polish",
    "pt_BR": "Portuguese (Brazil)",
    "ru_RU": "Russian",
    "es_ES": "Spanish (Spain)",
    "th_TH": "Thai",
    "tr_TR": "Turkish",
    "vn_VN": "Vietnamese",
}

function codeToLanguage(language: object | string) {
    if (typeof language === 'object') {
        return language;
    }

    // @ts-ignore
    return languages[language] ?? language;
}

export default {
    title: 'Translate',
    icon: '',
    render(container: HTMLElement, params: TranslateParameters) {
        container.classList.add('sp-translate-action');

        return renderActionHeader(actions['text.translate'],
            renderValue(params.WFInputText ?? 'Text'),
            actionText('from'),
            renderValue(codeToLanguage(params.WFSelectedFromLanguage ?? 'Detected Language')),
            actionText('to'),
            renderValue(codeToLanguage(params.WFSelectedLanguage))
        )
    }
}