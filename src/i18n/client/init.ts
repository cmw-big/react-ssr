import i18next from 'i18next'
// 能够传递react的i18n的实例
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
// 通过网络请求加载翻译源。可以用在node，deno，browser
import Backend from 'i18next-http-backend'

export const clientInit = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    debug: true,
    // 需要让webpack定义好对应的变量，得到对应的内容。
    ns: ['test'],
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    backend: {
      loadPath: `${__webpack_output_path}/{{lng}}/{{ns}}.json`
    }
  })
