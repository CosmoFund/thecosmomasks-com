import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';
import cnTranslation from './locales/cn/translation.json';
//import { isProduction } from './constants/index';



export const resources = {
  en: {
    translation: enTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  cn: {
    translation: cnTranslation,
  },
} as const;


const detection = {
  // order and from where user language should be detected
  order: [
    'querystring',
    //'cookie',
    'localStorage',
    //'sessionStorage',
    'navigator',
    //'htmlTag', 'path', 'subdomain'
  ],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupLocalStorage: 'lng',
  lookupCookie: 'lng',
  //lookupSessionStorage: 'lng',
  //lookupFromPathIndex: 0,
  //lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: [
    'localStorage',
    'cookie'
  ],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  //cookieMinutes: 10,
  //cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  //htmlTag: document.documentElement,

  // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  //cookieOptions: { path: '/', sameSite: 'strict' }
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection,

    supportedLngs: ['en', 'ru', 'cn'],
    ns: ['translation'],

    //lng: isProduction ? undefined : 'en',
    fallbackLng: 'en',
    fallbackNS: 'translation',

    resources,

    debug: false,//!isProduction,

    react: {
      useSuspense: true,
    },
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
