export type LanguageCode =
    | 'af'
    | 'ar'
    | 'as'
    | 'bn'
    | 'bs'
    | 'bg'
    | 'yue'
    | 'ca'
    | 'zh-Hans'
    | 'zh-Hant'
    | 'hr'
    | 'cs'
    | 'prs'
    | 'da'
    | 'nl'
    | 'en'
    | 'et'
    | 'fj'
    | 'fil'
    | 'fi'
    | 'fr'
    | 'fr-ca'
    | 'de'
    | 'el'
    | 'gu'
    | 'ht'
    | 'he'
    | 'hi'
    | 'mww'
    | 'hu'
    | 'is'
    | 'id'
    | 'ga'
    | 'it'
    | 'ja'
    | 'kn'
    | 'kk'
    | 'tlh-Latn'
    | 'tlh-Piqd'
    | 'ko'
    | 'ku'
    | 'kmr'
    | 'lv'
    | 'lt'
    | 'mg'
    | 'ms'
    | 'ml'
    | 'mt'
    | 'mi'
    | 'mr'
    | 'nb'
    | 'or'
    | 'ps'
    | 'fa'
    | 'pl'
    | 'pt-br'
    | 'pt-pt'
    | 'pa'
    | 'otq'
    | 'ro'
    | 'ru'
    | 'sm'
    | 'sr-Cyrl'
    | 'sr-Latn'
    | 'sk'
    | 'sl'
    | 'es'
    | 'sw'
    | 'sv'
    | 'ty'
    | 'ta'
    | 'te'
    | 'th'
    | 'to'
    | 'tr'
    | 'uk'
    | 'ur'
    | 'vi'
    | 'cy'
    | 'yua';

export const ISOLangMap: Map<LanguageCode, string> = new Map<LanguageCode, string>([
    ['af', 'Afrikaans'],
    ['ar', 'Arabic'],
    ['as', 'Assamese'],
    ['bn', 'Bangla'],
    ['bs', 'Bosnian (Latin)'],
    ['bg', 'Bulgarian'],
    ['yue', 'Cantonese (Traditional)'],
    ['ca', 'Catalan'],
    ['zh-Hans', 'Chinese Simplified'],
    ['zh-Hant', 'Chinese Traditional'],
    ['hr', 'Croatian'],
    ['cs', 'Czech'],
    ['prs', 'Dari'],
    ['da', 'Danish'],
    ['nl', 'Dutch'],
    ['en', 'English'],
    ['et', 'Estonian'],
    ['fj', 'Fijian'],
    ['fil', 'Filipino'],
    ['fi', 'Finnish'],
    ['fr', 'French'],
    ['fr-ca', 'French (Canada)'],
    ['de', 'German'],
    ['el', 'Greek'],
    ['gu', 'Gujarati'],
    ['ht', 'Haitian Creole'],
    ['he', 'Hebrew'],
    ['hi', 'Hindi'],
    ['mww', 'Hmong Daw'],
    ['hu', 'Hungarian'],
    ['is', 'Icelandic'],
    ['id', 'Indonesian'],
    ['ga', 'Irish'],
    ['it', 'Italian'],
    ['ja', 'Japanese'],
    ['kn', 'Kannada'],
    ['kk', 'Kazakh'],
    ['tlh-Latn', 'Klingon'],
    ['tlh-Piqd', 'Klingon (plqaD)'],
    ['ko', 'Korean'],
    ['ku', 'Kurdish (Central)'],
    ['kmr', 'Kurdish (Northern)'],
    ['lv', 'Latvian'],
    ['lt', 'Lithuanian'],
    ['mg', 'Malagasy'],
    ['ms', 'Malay'],
    ['ml', 'Malayalam'],
    ['mt', 'Maltese'],
    ['mi', 'Maori'],
    ['mr', 'Marathi'],
    ['nb', 'Norwegian'],
    ['or', 'Odia'],
    ['ps', 'Pashto'],
    ['fa', 'Persian'],
    ['pl', 'Polish'],
    ['pt-br', 'Portuguese (Brazil)'],
    ['pt-pt', 'Portuguese (Portugal)'],
    ['pa', 'Punjabi'],
    ['otq', 'Queretaro Otomi'],
    ['ro', 'Romanian'],
    ['ru', 'Russian'],
    ['sm', 'Samoan'],
    ['sr-Cyrl', 'Serbian (Cyrillic)'],
    ['sr-Latn', 'Serbian (Latin)'],
    ['sk', 'Slovak'],
    ['sl', 'Slovenian'],
    ['es', 'Spanish'],
    ['sw', 'Swahili'],
    ['sv', 'Swedish'],
    ['ty', 'Tahitian'],
    ['ta', 'Tamil'],
    ['te', 'Telugu'],
    ['th', 'Thai'],
    ['to', 'Tongan'],
    ['tr', 'Turkish'],
    ['uk', 'Ukrainian'],
    ['ur', 'Urdu'],
    ['vi', 'Vietnamese'],
    ['cy', 'Welsh'],
    ['yua', 'Yucatec Maya'],
]);

export function ISOLangArray(): Array<[LanguageCode, string]> {
    const arr = new Array<[LanguageCode, string]>();
    for (const entry of ISOLangMap) {
        arr.push(entry);
    }
    return arr;
}
