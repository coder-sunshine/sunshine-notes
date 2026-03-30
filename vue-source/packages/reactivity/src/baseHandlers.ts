import { isObject } from '@vue/shared'

import { track, trigger } from './effect'
import { reactive, ReactiveFlags } from './reactive'

function get(target: object, key: string | symbol, receiver: object): any {
  // 如果进入到get方法，说明肯定是一个proxy代理对象
  // 如果访问的是__v_isReactive，返回true
  if (key === ReactiveFlags.IS_REACTIVE) {
    return true
  }

  // todo: 收集依赖
  track(target, key)
  // 返回对象的相应属性值
  const result = Reflect.get(target, key, receiver)

  // 判断是不是对象，是对象就递归代理
  if (isObject(result)) {
    return reactive(result)
  }

  return result
}

function set(target: object, key: string | symbol, value: unknown, receiver: object): boolean {
  // todo: 触发更新
  trigger(target, key)
  // 设置对象的相应属性值
  const result = Reflect.set(target, key, value, receiver)
  return result
}

function has(target: object, key: string | symbol): boolean {
  // 收集依赖
  track(target, key)
  const result = Reflect.has(target, key)
  return result
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  has,
}
