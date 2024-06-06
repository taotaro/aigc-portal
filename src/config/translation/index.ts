import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { EN_US } from "./lang/en_us";
import { ZH_CN } from "./lang/zh_cn";

export const SUPPORTED_LANGUAGES = ['en_US', 'zh_CN'];

export const I18_LOCAL_STORAGE_KEY = "bo_i18nextLng";

i18next
    .use(initReactI18next)
    .init({
        resources: {
            en_US: {
                translation: EN_US
            },
            zh_CN: {
                translation: ZH_CN
            }
        },
        lng: SUPPORTED_LANGUAGES[0],
        fallbackLng: SUPPORTED_LANGUAGES,
        interpolation: {
            prefix: '{{',
            suffix: '}}',
            escapeValue: false,
        }
    });

export default i18next;