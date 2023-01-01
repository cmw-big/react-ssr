import { render } from 'react-dom'
import { observer } from 'mobx-react'
import { makeObservable, observable, computed, action } from 'mobx'

class Todo {
  id = Math.random()

  title = ''

  finished = false

  constructor(title: string) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action
    })
    this.title = title
  }

  toggle() {
    this.finished = !this.finished
  }
}

class TodoList {
  todos: Todo[] = []

  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length
  }

  constructor(todos: Todo[]) {
    makeObservable(this, {
      todos: observable,
      //   Mobx 会确保 unfinishedTodoCount 会在todos数组发生变化中或者 todos中的一个对象中的 finished属性被修改时自动更新。
      unfinishedTodoCount: computed // 将这个方法标记为computed
    })
    this.todos = todos
  }
}

const TodoListView = observer(({ todoList }: { todoList: TodoList }) => (
  <div>
    <ul>
      {todoList.todos.map(todo => (
        <TodoView todo={todo} key={todo.id} />
      ))}
    </ul>
    Tasks left: {todoList.unfinishedTodoCount}
  </div>
))

const TodoView = observer(({ todo }: { todo: Todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => todo.toggle()}
    />
    {todo.title}
  </li>
))

const store = new TodoList([
  new Todo('Get Coffee'),
  new Todo('Write simpler code')
])
render(<TodoListView todoList={store} />, document.getElementById('root'))
