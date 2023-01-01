import { hydrateRoot } from 'react-dom/client'
import { useSSR } from 'react-i18next'
import App from '@/app'
import '@/i18n/client'

const ClientApp = () => {
  useSSR(window.initialI18nStore, window.initialLanguage)
  return <App />
}

hydrateRoot(document.getElementById('root') ?? document.body, <ClientApp />)
