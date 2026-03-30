import { isObject } from '@vue/shared'

import { track, trigger } from './effect'

export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw',
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.RAW]?: any
}

export const targetMap = new WeakMap<Target, any>()

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

  // 只要读到了__v_isReactive，就返回target
  // 因为Proxy对象直接拦截了这个属性
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }

  const proxy = new Proxy(target, {
    get(target, key) {
      // 如果进入到get方法，说明肯定是一个proxy代理对象
      // 如果访问的是__v_isReactive，返回true
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true
      }

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
