import { resolve } from 'path'
import { renderFile } from 'ejs'
import { cwd } from 'process'
import { renderToString } from 'react-dom/server'
import { type ComponentType } from 'react'
import { getDirList } from '@/lib/utils'
import { type i18n } from 'i18next'
import { type ServerRootProps } from './ServerRoot'

/**
 * 额外的数据
 */
export interface ExtraData {
  initialLanguage: string
  initialI18nStore: string
  i18n: i18n
}
export interface PathMap {
  css?: string
  script?: string
}
export enum PathExtMap {
  css = '.css',
  script = '.js'
}
/**
 * 返回一个渲染好的html字符串
 */
export async function serverRender<P extends PathMap, E extends ExtraData>(
  RootComponent: ComponentType<ServerRootProps>,
  pathMap: P,
  extraData: E
) {
  const app = renderToString(<RootComponent i18n={extraData.i18n} />)
  const pathKeys = Object.keys(pathMap) as (keyof PathMap)[]
  // 目前pathObj暂时只支持js在底部，css在顶部。可以通过配置进行更改
  const pathObj: Record<string, string[]> = {}
  pathKeys.forEach(pathKey => {
    pathObj[pathKey] = getDirList(pathMap[pathKey], '', [PathExtMap[pathKey]])
  })

  const html = await renderFile(resolve(cwd(), 'src/template/index.ejs'), {
    app,
    path: pathObj,
    extraData
  })
  return html
}
