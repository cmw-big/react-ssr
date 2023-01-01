import express from 'express'
import { resolve } from 'path'
import { cwd } from 'process'
import { handle as i18nextMiddlewareHandle } from 'i18next-http-middleware'
import { serverInit } from '@/i18n/server'
import i18next, { type Resource } from 'i18next'
import { enableStaticRendering } from 'mobx-react'
import { type ExtraData, serverRender } from './render'
import { ServerRoot } from './ServerRoot'

const app = express()

const port = 12345

app.use(express.static(resolve(cwd(), 'public')))
// 等待i18n初始化完成
;(async () => {
  await serverInit
})()
// 必须要使用一下i18next的中间件，不然请求头里面找不到对应的一些属性
app.use(i18nextMiddlewareHandle(i18next))

app.get('*', async (req, res) => {
  // 不然observe订阅组件，防止产生GC问题。
  enableStaticRendering(true)
  const initialLanguage = req.i18n.languages[0]
  const initialI18nStore: Resource = {}
  const { ns } = req.i18n.options
  let usedNamespaces: string[] = []
  if (typeof ns === 'string' && ns) {
    usedNamespaces = [ns]
  } else if (Array.isArray(ns)) {
    usedNamespaces = ns
  }
  req.i18n.languages.forEach(language => {
    initialI18nStore[language] = {}
    usedNamespaces.forEach(namespace => {
      initialI18nStore[language][namespace] =
        req.i18n.services.resourceStore.data[language][namespace]
    })
  })
  const extraData: ExtraData = {
    initialLanguage,
    initialI18nStore: JSON.stringify(initialI18nStore),
    i18n: req.i18n
  }
  const html = await serverRender(
    ServerRoot,
    { script: resolve(cwd(), 'public'), css: resolve(cwd(), 'public') },
    extraData
  )

  res.send(html)
})
app.listen(port, () => {
  console.log('server start...')
})
