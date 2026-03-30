import { hasChanged, hasOwn, isObject } from '@vue/shared'

import { ITERATE_KEY, track, trigger } from './effect'
import { TrackOpTypes, TriggerOpTypes } from './operations'
import { reactive, ReactiveFlags } from './reactive'

function get(target: object, key: string | symbol, receiver: object): any {
  // 如果进入到get方法，说明肯定是一个proxy代理对象
  // 如果访问的是__v_isReactive，返回true
  if (key === ReactiveFlags.IS_REACTIVE) {
    return true
  }

  // todo: 收集依赖
  track(target, TrackOpTypes.GET, key)
  // 返回对象的相应属性值
  const result = Reflect.get(target, key, receiver)

  // 判断是不是对象，是对象就递归代理
  if (isObject(result)) {
    return reactive(result)
  }

  return result
}

function set(target: Record<string | symbol, unknown>, key: string | symbol, value: unknown, receiver: object): boolean {
  // 判断对象是否有这个属性
  const hadKey = hasOwn(target, key)

  const oldValue = target[key]

  // 原来就没这个属性，那说明是新增
  if (!hadKey) {
    trigger(target, TriggerOpTypes.ADD, key)
  } else if (hasChanged(value, oldValue)) {
    trigger(target, TriggerOpTypes.SET, key)
  }

  // 设置对象的相应属性值
  const result = Reflect.set(target, key, value, receiver)
  return result
}

function has(target: object, key: string | symbol): boolean {
  // 收集依赖
  track(target, TrackOpTypes.HAS, key)
  const result = Reflect.has(target, key)
  return result
}

function ownKeys(target: object): (string | symbol)[] {
  track(target, TrackOpTypes.ITERATE, ITERATE_KEY)
  return Reflect.ownKeys(target)
}

function deleteProperty(target: Record<string | symbol, unknown>, key: string | symbol) {
  // 判断对象是否有这个属性,不然删除就没有意义
  const hadKey = hasOwn(target, key)
  // 删除是否成功的结果
  const result = Reflect.deleteProperty(target, key)
  // 对象有这个属性，并且删除成功才会触发更新
  if (hadKey && result) {
    trigger(target, TriggerOpTypes.DELETE, key)
  }
  return result
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  has,
  ownKeys,
  deleteProperty,
}
