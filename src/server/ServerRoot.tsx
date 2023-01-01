import App from '@/app'
import { type I18next } from 'i18next-http-middleware'
import { type FC } from 'react'
import { I18nextProvider } from 'react-i18next'

/**
 * 跟组件类型
 */
export interface ServerRootProps {
  i18n: I18next
}
/**
 * 服务端的根组件
 */
export const ServerRoot: FC<ServerRootProps> = props => {
  const { i18n } = props
  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  )
}
