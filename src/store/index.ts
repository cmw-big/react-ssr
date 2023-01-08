import { action, observable } from 'mobx'
import { createContext } from 'react'

class Store {
  @observable name = ''

  @observable age = 0

  @action.bound
  changeName(name?: string) {
    this.name = name ?? '我没有名字'
  }
}
export default Store
export const StoreContext = createContext<Store>(new Store())
