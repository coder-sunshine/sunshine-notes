import { isObject } from '@vue/shared'

import { mutableHandlers, readonlyHandlers } from './baseHandlers'

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

// 分别存储普通代理和只读代理
export const targetMap = new WeakMap<Target, any>()
export const readonlyMap = new WeakMap<Target, any>()

function createReactiveObject(target: Target, isReadonly: boolean, baseHandlers: ProxyHandler<any>) {
  // 判断传入的是否是对象
  if (!isObject(target)) {
    console.log('传入的必须是一个对象')
    return target
  }

  // 判断是否已经被代理过
  const proxyMap = isReadonly ? readonlyMap : targetMap
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  // 只要读到了__v_isReactive，就返回target
  // 因为Proxy对象直接拦截了这个属性
  // 同样 读到target[ReactiveFlags.RAW]直接返回对象
  if (target[ReactiveFlags.RAW] && target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }

  const proxy = new Proxy(target, baseHandlers)

  // 存储代理对象
  proxyMap.set(target, proxy)

  return proxy
}

export function reactive<T extends object>(target: T): T
export function reactive(target: object) {
  // 如果已经是只读代理，直接返回
  if (target && (target as Target)[ReactiveFlags.IS_READONLY]) {
    return target
  }

  // 第二个参数false，表示不是只读,并且传入的是 mutableHandlers
  return createReactiveObject(target, false, mutableHandlers)
}

type DeepReadonly<T extends Record<string, any>> = T extends any
  ? {
      readonly [K in keyof T]: T[K] extends Record<string, any> ? DeepReadonly<T[K]> : T[K]
    }
  : never

export function readonly<T extends object>(target: T): DeepReadonly<T> {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers // readonly的handler处理程序需要单独进行处理
  )
}

export function toRaw<T>(observed: T): T {
  return (observed && toRaw((observed as Target)[ReactiveFlags.RAW])) || observed
}
