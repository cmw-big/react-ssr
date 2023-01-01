# Mobx

> 简单，可扩展的状态管理。

## 概念

MobX 区分了应用程序中的以下三个概念：

1. State(状态)
2. Actions(动作)
3. Derivations(派生)

> 1. State 很好理解，就是我们使用的数据。
> 2. Actions 也就是改变 State 的一个动作，通常是一个方法。
> 3. Derivations 则是对 State 变化改变后进行的一系列响应。

## State

> State(状态) 是驱动你的应用程序的数据。

将 State 存储在任何您喜欢的数据结构中：普通对象、数组、类、循环数据结构或引用。这与 MobX 的工作方式无关。

只要确保所有你想随时间改变的属性都被标记为 observable，这样 MobX 就可以跟踪它们。

```ts
import { makeObservable, observable, action } from 'mobx'

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
```

## Action

> Action(动作) 是任意可以改变 State(状态) 的代码，比如用户事件处理、后端推送数据处理、调度器事件处理等等。

在 Todo 类中，我们可以看到 toggle 方法改变了 finished 属性的值，而 finished 是被标记为 observable 的。**建议您将所有修改 observable 值的代码标记为 action。MobX 可以自动进行事务处理以轻松实现最佳性能。**

使用 Action 可以帮助您更好地组织代码，并防止您在无意中修改 State。

在 MobX 术语中，可以修改 State 的方法被称为 action(动作) 。这与基于当前状态来生成新信息的 view(视图) 是不同的。 您代码中的每一个方法只应完成上述两个目标中的一个。

> 也就是说：代码中的每一个方法要么是用于修改 State，要么是基于当前状态生成新 view 的。

## Derivations

> 任何 来源是State(状态) 并且不需要进一步交互的东西都是 Derivation(派生)。

**Derivations 包括许多方式:**

- 用户界面
- 派生数据 , 比如剩余未完成todos的数量
- 后端集成 , 比如发送改变到服务器端

**Mobx 区分了两种 Derivation :**

- Computed values,总是可以通过纯函数从当前的可观测 State 中派生。
- Reactions, 当 State 改变时需要自动运行的副作用 (命令式编程和响应式编程之间的桥梁)

### 通过 computed 对派生值进行建模

```ts
import { makeObservable, observable, computed } from 'mobx'

class TodoList {
  todos: any[] = []

  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length
  }

  constructor(todos) {
    makeObservable(this, {
      todos: observable,
      //   Mobx 会确保 unfinishedTodoCount 会在todos数组发生变化中或者 todos中的一个对象中的 finished属性被修改时自动更新。
      unfinishedTodoCount: computed // 将这个方法标记为computed
    })
    this.todos = todos
  }
}

```

这些计算类似于 Excel 单元格中的公式。它们仅在需要时自动更新。也就是说，如果有观察者使用其结果时才会更新。也就是说，如果有有人关心其结果时才会更新。

### 使用 reaction 对副作用建模

作为用户，要想在屏幕上看到状态或计算值的变化，就需要一个重新绘制部分GUI的 reactions 。

Reaction 和 computed 类似，但并不产生信息，而是产生副作用，如打印到控制台、发出网络请求、增量更新 React 组件树以便更新DOM等。

简而言之，reaction 是 响应式编程和指令式编程之间的桥梁。

到目前为止，最常用的 reaction 形式是UI组件。 注意，action 和 reaction 都可能引起副作用。 副作用应有一个清晰的、显式的起源，例如在提交表单时发出网络请求，应该从相关的事件处理程序显式触发。

### 响应式 React 组件
