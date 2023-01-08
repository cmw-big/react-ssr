import { useCallback, useContext, useState, type FC } from 'react'
// import useStyles from 'isomorphic-style-loader/useStyles'
import { observer, useLocalObservable } from 'mobx-react'
import { StoreContext } from '@/store'
import img1 from '@/assets/imgs/图片.jpg'
import styles from './index.scss'

const Home: FC = observer(() => {
  const store = useContext(StoreContext)
  const [count, setCount] = useState(0)
  const myMoney = useLocalObservable(() => {
    return {
      count: 0,
      changeMoney(money?: number) {
        this.count = money ?? Math.random()
      }
    }
  })
  const handleClick = useCallback(() => {
    setCount(pre => pre + 1)
    store.changeName('www.cmw.com')
    myMoney.changeMoney()
  }, [myMoney, store])

  return (
    <div>
      <h1>Home</h1>
      <p>{count}</p>
      <img src={img1} alt="" />
      <button
        className={styles['beauty-btn']}
        type="button"
        onClick={handleClick}
      >
        点击+1
      </button>
      <p>name: {store.name}</p>
      <p>money: {myMoney.count}</p>
    </div>
  )
})

export default Home
