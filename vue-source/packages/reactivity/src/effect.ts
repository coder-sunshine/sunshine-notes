import { TrackOpTypes, TriggerOpTypes } from './operations'

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
  if (!shouldTrack) {
    return
  }
  console.log(`%c依赖收集: target ${JSON.stringify(target)}【${type}】${String(key)}`, 'color: #f40')
}

export function trigger(target: object, type: TriggerOpTypes, key: unknown) {
  console.log(`%c派发更新: target ${JSON.stringify(target)}【${type}】${String(key)}`, 'color: #0f0')
}
