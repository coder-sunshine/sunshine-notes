import { TrackOpTypes, TriggerOpTypes } from './operations'

export function track(target: object, type: TrackOpTypes, key: unknown) {
  console.log(`%c依赖收集: target ${JSON.stringify(target)}【${type}】${String(key)}`, 'color: #f40')
}

export function trigger(target: object, type: TriggerOpTypes, key: unknown) {
  console.log(`%c派发更新: target ${JSON.stringify(target)}【${type}】${String(key)}`, 'color: #0f0')
}
