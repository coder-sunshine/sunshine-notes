import { TrackOpTypes, TriggerOpTypes } from './operations'

export interface ReactiveEffect<T = any> {
  (): T
}

type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<any, Dep>

// 当前正在执行的 effect
let activeEffect: ReactiveEffect | undefined

const targetMap = new WeakMap<any, KeyToDepMap>()

// 用来表示对对象的“迭代依赖”的标识
export const ITERATE_KEY = Symbol('')

// 是否进行依赖收集的开关
let shouldTrack = true

export function pauseTracking() {
  shouldTrack = false
}

export function enableTracking() {
  shouldTrack = true
}

export function track(target: object, type: TrackOpTypes, key: unknown) {
  // 暂停依赖收集开关，没有activeEffect或者shouldTrack为false时，不进行依赖收集
  if (!shouldTrack || activeEffect === undefined) {
    return
  }
  console.log(`%c依赖收集: target ${JSON.stringify(target)}【${type}】${String(key)}`, 'color: #f40')

  // 先根据 target 从 weakMap 中获取对应的 map，保存的是 key --- effects 的键值对
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  // 再根据 key 从 depsMap 中获取对应的 dep，保存的是 effect 的集合
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  // 最后将当前 effect 添加到 dep 中
  dep.add(activeEffect!)
}

export function trigger(target: object, type: TriggerOpTypes, key: unknown) {
  console.log(`%c派发更新: target ${JSON.stringify(target)}【${type}】${String(key)}`, 'color: #0f0')
}

export function effect<T = any>(fn: () => T) {
  // 当 effect 执行时，将其设置为当前激活的副作用函数
  activeEffect = fn
  // 执行 fn 函数，在 fn 执行的过程中，会收集到对应的依赖
  fn()
  // 当 effect 执行完成后，将其设置为 undefined
  activeEffect = undefined
}
