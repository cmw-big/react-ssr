import { type FC, StrictMode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import '@/assets/global.scss'
import Home from '@/pages/home'
import Store, { StoreContext } from './store'
import styles from './app.scss'

const App: FC = () => {
  const [t] = useTranslation(['test'])
  const store = useMemo(() => new Store(), [])
  return (
    <StoreContext.Provider value={store}>
      <header>App</header>
      <Home />
      <p className={styles.wel}>{t('welcome')}</p>
    </StoreContext.Provider>
  )
}

export default () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}
