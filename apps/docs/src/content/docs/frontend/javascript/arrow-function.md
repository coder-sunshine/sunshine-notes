---
title: 箭头函数与普通函数区别
description: JavaScript 中箭头函数和普通函数的核心区别、使用场景及最佳实践
---

箭头函数是 ES6 引入的新语法，它不仅仅是写法上的简化，更重要的是改变了 `this` 的绑定机制。理解两者的区别，能帮助我们在合适的场景选择合适的写法。

## 核心区别总结

| 特性             | 箭头函数                        | 普通函数                    |
| ---------------- | ------------------------------- | --------------------------- |
| `this` 绑定      | 无自己的 `this`，继承外层作用域 | 有独立的 `this`（动态绑定） |
| 构造函数         | ❌ 不能用作构造函数             | ✅ 可以用 `new` 调用        |
| `arguments` 对象 | ❌ 没有 `arguments` 对象        | ✅ 有 `arguments` 对象      |
| `prototype` 属性 | ❌ 没有 `prototype` 属性        | ✅ 有 `prototype` 属性      |
| 方法简写         | 更适合回调函数                  | 更适合对象方法              |
| 语法             | 更简洁（可省略 `function` 等）  | 更完整                      |

## 详细区别分析

### 1. `this` 绑定（最关键区别）

- **普通函数**：有自己的 `this`，值取决于调用方式

  ```javascript
  const obj = {
    value: 42,
    regularFunc: function () {
      console.log(this.value) // 42（this 指向 obj）
    },
  }
  obj.regularFunc()
  ```

- **箭头函数**：没有自己的 `this`，继承定义时外层作用域的 `this`（词法作用域）

  ```javascript
  const obj = {
    value: 42,
    arrowFunc: () => {
      console.log(this.value) // undefined（this 指向全局对象）
    },
  }
  obj.arrowFunc()
  ```

> **经典场景对比**：
>
> ```javascript
> document.querySelector('button').addEventListener('click', function () {
>   console.log(this) // <button>（指向触发事件的元素）
> })
>
> document.querySelector('button').addEventListener('click', () => {
>   console.log(this) // Window（继承外层 this）
> })
> ```

### 2. 构造函数能力

- **普通函数**：可作为构造函数使用 `new` 调用

  ```javascript
  function Person(name) {
    this.name = name
  }
  const alice = new Person('Alice')
  ```

- **箭头函数**：不能作为构造函数

  ```javascript
  const Person = name => {
    this.name = name
  }
  const alice = new Person('Alice') // TypeError: Person is not a constructor
  ```

### 3. `arguments` 对象

- **普通函数**：有 `arguments` 对象（类数组，包含所有参数）

  ```javascript
  function sum() {
    return [...arguments].reduce((a, b) => a + b)
  }
  sum(1, 2, 3) // 6
  ```

- **箭头函数**：没有 `arguments` 对象（需用剩余参数替代）

  ```javascript
  const sum = (...args) => args.reduce((a, b) => a + b)
  sum(1, 2, 3) // 6
  ```

### 4. `prototype` 属性

- **普通函数**：有 `prototype` 属性（用于原型继承）

  ```javascript
  function Foo() {}
  console.log(Foo.prototype) // { constructor: Foo }
  ```

- **箭头函数**：没有 `prototype` 属性

  ```javascript
  const Bar = () => {}
  console.log(Bar.prototype) // undefined
  ```

### 5. 语法简洁性

箭头函数更简洁：

```javascript
// 单参数可省略括号
const square = x => x * x

// 单行可省略 return
const double = num => num * 2

// 多参数/多语句需括号和花括号
const add = (a, b) => {
  const sum = a + b
  return sum
}
```

## 常见踩坑场景

### setTimeout 中的 this 丢失

这是实际开发中最常见的坑之一：

```javascript
const obj = {
  name: 'Tom',
  greet: function () {
    // ❌ 普通函数：this 丢失，指向全局对象
    setTimeout(function () {
      console.log(`Hello, ${this.name}`) // Hello, undefined
    }, 100)

    // ✅ 箭头函数：继承外层 this，正确指向 obj
    setTimeout(() => {
      console.log(`Hello, ${this.name}`) // Hello, Tom
    }, 100)
  },
}
obj.greet()
```

在 ES6 之前，通常需要用 `const self = this` 来保存 `this` 引用，箭头函数彻底解决了这个问题。

### Promise 链中的 this

```javascript
class UserService {
  constructor() {
    this.users = []
  }

  fetchUsers() {
    // ✅ 箭头函数保持 this 指向 UserService 实例
    return fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        this.users = data // this 正确指向实例
      })
  }
}
```

## 使用场景建议

| 场景                      | 推荐     | 原因                                 |
| ------------------------- | -------- | ------------------------------------ |
| 对象方法                  | 普通函数 | 正确绑定 `this` 到对象实例           |
| 回调函数（如 `map`）      | 箭头函数 | 避免 `this` 意外改变，代码简洁       |
| 需要 `arguments` 对象     | 普通函数 | 箭头函数无此特性                     |
| 构造函数                  | 普通函数 | 箭头函数不能 `new`                   |
| 需要动态 `this`（如事件） | 普通函数 | 箭头函数固定继承外层 `this`          |
| 顶层工具函数              | 箭头函数 | 简洁且 `this` 指向安全（通常为全局） |

## 其他注意事项

1. **`super` 关键字**：箭头函数没有自己的 `super`，继承外层作用域的 `super`

2. **不能使用 `yield`**：箭头函数不能用作生成器函数

3. **`call`/`apply`/`bind` 无效**：对箭头函数使用这些方法无法改变 `this`

   ```javascript
   const obj = { value: 10 }
   const arrow = () => console.log(this.value)
   arrow.call(obj) // undefined（this 仍是全局对象）
   ```

## 总结

- **箭头函数**：更简洁、无独立 `this`、适合回调函数和工具函数
- **普通函数**：功能完整、有独立 `this`、适合对象方法和构造函数

**选择原则**：

> 当需要动态 `this` 或构造函数时 → 普通函数
> 当需要词法作用域 `this` 或简洁语法时 → 箭头函数
