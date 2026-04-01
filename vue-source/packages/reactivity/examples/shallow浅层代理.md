## shallow浅层代理

浅层代理在处理响应式的时候，根据条件判断，不进行对象属性的递归处理即可

**baseHandlers.ts**

```diff
function createGetter(isReadonly = false, shallow = false) {
  return function get(
    target: object,
    key: string | symbol,
    receiver: object
  ): any {
    // ... 其他代码省略

    // 只有在非只读的情况下才会收集依赖
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key);
    }

+    // 如果是浅层代理，直接返回结果
+   if (shallow) {
+      return result;
+    }

    // 如果整个对象是只读的，那么这个对象的属性是对象，也应该是只读的
    if (isObject(result)) {
      return isReadonly ? readonly(result) : reactive(result);
    }

    return result;
  };
}
```

而且，之前的get我们通过工厂函数的模式进行了处理，其实set我们也可以，虽然我们现在还没有什么用处，但是可以先写出来

```typescript
function createSetter(shallow = false) {
  return function set(target: Record<string | symbol, unknown>, key: string | symbol, value: unknown, receiver: object): boolean {
    // 判断对象是否有这个属性
    // const hadKey = target.hasOwnProperty(key)
    const type = target.hasOwnProperty(key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD

    // 注意，如果target仅仅是object类型，target[key]如果直接这么写，ts会报错，元素隐式具有 "any" 类型
    // 当然这也和tsconfig的配置有关，如果配置了strict:true，那么ts会报错
    // 可以将target类型设置为Record<string | symbol, unknown>
    let oldValue = target[key]
    const oldLen = Array.isArray(target) ? target.length : 0

    // 设置对象的相应属性值，推荐使用 Reflect.set
    const result = Reflect.set(target, key, value, receiver)

    if (!result) {
      return result
    }

    const newLen = Array.isArray(target) ? target.length : 0

    if (hasChanged(value, oldValue) || type === TriggerOpTypes.ADD) {
      trigger(target, type, key)
      if (Array.isArray(target) && oldLen !== newLen) {
        if (key !== 'length') {
          trigger(target, TriggerOpTypes.SET, 'length')
        } else {
          // 当操作的key是length时，并且新的长度小于旧的长度(如果长度变大不需要处理)
          // 找到被删除的下标，依次触发更新
          for (let i = newLen; i < oldLen; i++) {
            trigger(target, TriggerOpTypes.DELETE, i + '')
          }
        }
      }
    }
    return result
  }
}
```

通过工厂函数，生成相应的函数，而且这些函数都是纯函数，如果没有使用的话，我们完全可以通过rollup的`tree shaking`功能给安全的删除掉

```typescript
const get = /*#__PURE__*/ createGetter()
const readonlyGet = /*#__PURE__*/ createGetter(true)
const shallowGet = /*#__PURE__*/ createGetter(false, true)

const set = /*#__PURE__*/ createSetter()
// 暂时用不上
const shallowSet = /*#__PURE__*/ createSetter(true)

// ...... 其他代码省略

export const shallowReactiveHandlers: ProxyHandler<object> = extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet,
})
```

extend函数其实就是`Object.assign`

**utils.ts**

```typescript
export const extend = Object.assign
```

**reactive.ts**

```typescript
// ......其他代码省略

// 浅层代理
export function shallowReactive<T extends object>(target: T): T {
  return createReactiveObject(target, false, shallowReactiveHandlers)
}
```

**测试：**

```typescript
import { reactive, shallowReactive } from './reactive'
const obj1 = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
}

const obj2 = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
}

const state1 = reactive(obj1)
console.log(state1.c)

const state2 = shallowReactive(obj2)
console.log(state2.c)
```
