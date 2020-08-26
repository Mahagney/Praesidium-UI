//#region 'NPM DEP'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
//#endregion

const initI18n = (cb) => {
  i18n
    // Load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // Pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // Init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init(
      {
        fallbackLng: 'ro',
        lng: navigator.language, // Set lng from the user's browser settings
        load: 'languageOnly', // This means will load only "en" and will omit the derivatives -> "en-US", "en-GB"
        ns: ['translation', 'login', 'common'], // load these namespaces
        debug: false, // Set this to TRUE when you want to see logs from i18n

        interpolation: {
          escapeValue: false, // Not needed for react as it escapes by default
        },

        backend: {
          loadPath: 'public/locales/{{lng}}/{{ns}}.json',
        },
      },
      cb,
    );
};

export default initI18n;
