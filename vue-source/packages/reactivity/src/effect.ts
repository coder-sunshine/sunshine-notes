import { TrackOpTypes, TriggerOpTypes } from './operations'

export interface ReactiveEffect<T = any> {
  (): T
}

type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<any, Dep>

// 当前正在执行的 effect
let activeEffect: ReactiveEffect | undefined
// 用来存储当前正在执行的 effect 栈
const effectStack: ReactiveEffect[] = []

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
  // console.log(`%c依赖收集: target ${JSON.stringify(target)}【${type}】${String(key)}`, 'color: #f40')

  // 先根据 target 从 weakMap 中获取对应的 map，保存的是 key --- effects 的键值对
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  // 再根据 key 从 depsMap 中获取对应的 deps，保存的是 effect 的集合
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  // 最后将当前 effect 添加到 deps 中
  deps.add(activeEffect)
}

export function trigger(target: object, type: TriggerOpTypes, key: unknown) {
  // console.log(`%c派发更新: target ${JSON.stringify(target)}【${type}】${String(key)}`, 'color: #0f0')
  // 先根据 target 从 weakMap 中获取对应的 map，保存的是 key --- effects 的键值对
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    // 从未被追踪过，直接返回
    return
  }

  // 再根据 key 从 depsMap 中获取对应的 deps，保存的是 effect 的集合
  const deps = depsMap.get(key)
  if (!deps) {
    return
  }

  // // 最后遍历 deps 中的所有 effect，执行它们
  // deps.forEach(effect => effect())
  // 执行effects中的副作用函数
  const effects = new Set<ReactiveEffect>()

  deps.forEach(effectFn => {
    effects.add(effectFn)
  })

  effects.forEach(effect => effect())
}

export function effect<T = any>(fn: () => T) {
  // 当 effect 执行时，将其设置为当前激活的副作用函数
  activeEffect = fn

  // 在 fn 函数调用之前，将当前 effect 压入栈顶
  effectStack.push(fn)

  // 执行 fn 函数，在 fn 执行的过程中，会收集到对应的依赖
  fn()

  // 在 fn 函数调用之后，将当前 effect 从栈顶弹出
  effectStack.pop()

  // 恢复 activeEffect 为栈顶的 effect
  activeEffect = effectStack[effectStack.length - 1]

  // // 当 effect 执行完成后，将其设置为 undefined
  // activeEffect = undefined
}
