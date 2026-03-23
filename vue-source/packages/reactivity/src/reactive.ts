import { track, trigger } from './effect'

export function reactive<T extends object>(target: T): T
export function reactive(target: object) {
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

  return proxy
}
