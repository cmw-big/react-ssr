declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.scss'
declare let __webpack_output_path: string

declare module 'isomorphic-style-loader/StyleContext' {
  import { Context } from 'react'
  declare var StyleContext: Context<any>
  export default StyleContext
}

interface Window {
  initialI18nStore: Resource
  initialLanguage: string
}
