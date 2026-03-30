import { isObject } from '@vue/shared'

import { track, trigger } from './effect'

const targetMap = new WeakMap()

export function reactive<T extends object>(target: T): T
export function reactive(target: object) {
  // 判断传入的是否是对象
  if (!isObject(target)) {
    console.log('传入的必须是一个对象')
    return target
  }

  // 判断是否已经被代理过
  if (targetMap.has(target)) {
    return targetMap.get(target)
  }

  const proxy = new Proxy(target, {
    get(target, key) {
      // todo: 收集依赖
      track(target, key)
      // 返回对象的相应属性值
      const result = Reflect.get(target, key)
      return result
    },
    set(target, key, value) {
      // todo: 触发更新
      trigger(target, key)
      // 设置对象的相应属性值
      const result = Reflect.set(target, key, value)
      return result
    },
  })

  // 存储代理对象
  targetMap.set(target, proxy)

  return proxy
}
