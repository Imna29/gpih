import en from "./locales/en.json";
import ka from "./locales/ka.json";


export default defineI18nConfig(() => {
  return ({
    legacy: false,
    locales: [
      {
        code: "ka",
        name: "ქართული",
        flag: "🇬🇪",
      },
      {
        code: "en",
        name: "English",
        flag: "🇬🇧",
      },
    ],
    strategy: "no_prefix",
    defaultLocale: "ka",
    detectBrowserLanguage:false,
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: en,
        ka: ka,
      },
    },
  })
});
