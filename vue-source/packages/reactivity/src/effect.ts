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
  console.log('targetMap', targetMap)

  // 先根据 target 从 weakMap 中获取对应的 map，保存的是 key --- effects 的键值对
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    // 从未被追踪过，直接返回
    return
  }

  // 再根据 key 从 depsMap 中获取对应的 deps，保存的是 effect 的集合
  const deps = depsMap.get(key)

  // 执行effects中的副作用函数
  const effects = new Set<ReactiveEffect>()

  deps &&
    deps.forEach(effectFn => {
      // 如果当前副作用函数不是当前激活的副作用函数，才添加到 effects 中
      if (effectFn !== activeEffect) {
        effects.add(effectFn)
      }
    })

  // 取得与ITERATE_KEY相关的副作用函数
  const iterateEffects = depsMap.get(ITERATE_KEY)

  // 将与ITERATE_KEY相关的副作用函数也添加到effects中
  iterateEffects &&
    iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effects.add(effectFn)
      }
    })

  effects.forEach(effect => effect())
}

export function effect<T = any>(fn: () => T) {
  const effectFn = () => {
    // 当effectFn执行时，将其设置为当前激活的副作用函数，这样在 `track` 中收集进去的是 `effectFn`，trigger 重新执行的就是 `effectFn`，就可以拿到上下文了。
    activeEffect = effectFn
    // 在 fn 函数调用之前，将当前 effect 压入栈顶
    effectStack.push(fn)
    // 执行 fn 函数，在 fn 执行的过程中，会收集到对应的依赖
    fn()
    // 在调用副作用函数之后，将其弹出effectStack栈
    effectStack.pop()
    // activeEffect始终指向当前effectStack栈顶的副作用函数
    activeEffect = effectStack[effectStack.length - 1]
  }

  effectFn()
}
