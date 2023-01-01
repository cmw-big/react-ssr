/**
 * 国际化
 */
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LanguageDetector } from 'i18next-http-middleware'
import Backend from 'i18next-fs-backend'
import { resolve } from 'path'
import { cwd } from 'process'

export const serverInit = i18next
  // 注入 react-i18next 实例
  .use(initReactI18next)
  // 检测用户当前使用的语言
  .use(LanguageDetector)
  .use(Backend)
  // 使用在后端文件读取的能力，读取各种resources的配置文件。

  // 初始化 i18next
  // 配置参数的文档: https://www.i18next.com/overview/configuration-options
  .init({
    // 开启debug模式，会有一些打印
    debug: true,
    // 如果用户翻译的语言不支持的话，默认使用的语言。
    fallbackLng: 'en',
    // 要加载的命名空间字符串或者数组。默认就是translation
    // 这个字段表示，调用t函数的时候，寻找key的命名空间的范围。
    ns: ['test'],
    // 如果定义了ns选项，但是没有定义defaultNS的话，默认是用ns的第一个作为值。
    // defaultNS: '',
    // 默认值是false。如果没有值的话，我们不得不使用下面中方式，手动指定ns
    //  i18next.t('button.save', { ns: 'common' }) // -> "save"
    // fallbackNS
    // 对于插值的选项的配置
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: resolve(cwd(), 'src/locales/{{lng}}/{{ns}}.json')
    },
    preload: ['zh', 'en']
  })
