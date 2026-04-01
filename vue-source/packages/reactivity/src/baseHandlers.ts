import { hasChanged, hasOwn, isArray, isObject } from '@vue/shared'

import { enableTracking, ITERATE_KEY, pauseTracking, track, trigger } from './effect'
import { TrackOpTypes, TriggerOpTypes } from './operations'
import { reactive, ReactiveFlags, readonly, readonlyMap, targetMap, toRaw } from './reactive'

const arrayInstrumentations: Record<string, Function> = {}

;(['includes', 'indexOf', 'lastIndexOf'] as const).forEach(key => {
  // 获取原生方法的引用
  const method = Array.prototype[key] as any

  arrayInstrumentations[key] = function (this: unknown[], ...args: unknown[]) {
    // 将 this 转化为 非响应式(代理)对象  --> 这里的 this 就是调用这些方法的数组
    const arr = toRaw(this)

    // 遍历当前数组的每个索引，通过track函数对数组索引进行依赖收集
    for (let i = 0, l = this.length; i < l; i++) {
      track(arr, TrackOpTypes.GET, i + '')
    }

    // 直接在原始对象中查找,使用原始数组和参数
    const res = method.apply(arr, args)

    if (res === -1 || res === false) {
      // 如果在原始数组中没有找到，注意，还需要进行处理，因为参数也有可能是响应式的
      return method.apply(arr, args.map(toRaw))
    } else {
      return res
    }
  }
})
;(['push', 'pop', 'shift', 'unshift', 'splice'] as const).forEach(key => {
  const method = Array.prototype[key] as any
  arrayInstrumentations[key] = function (this: unknown[], ...args: unknown[]) {
    pauseTracking()
    const res = method.apply(this, args)
    enableTracking()
    return res
  }
})

function createGetter(isReadonly = false) {
  return function get(target: object, key: string | symbol, receiver: object): any {
    // 如果进入到get方法，说明肯定是一个proxy代理对象
    // 如果访问的是__v_isReactive，返回true
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    } else if (key === ReactiveFlags.IS_READONLY) {
      // 如果访问的是ReactiveFlags.IS_READONLY, 返回true
      return isReadonly
    } else if (key === ReactiveFlags.RAW && receiver === (isReadonly ? readonlyMap : targetMap).get(target)) {
      // 访问的是 __v_raw 属性，并且是代理对象本身在访问
      return target
    }

    // 只有在非只读的情况下才会收集依赖
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }

    // 判断是不是数组，如果是数组，并且 key 是 arrayInstrumentations 对应的方法
    const targetIsArray = isArray(target)
    if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    // 返回对象的相应属性值
    const result = Reflect.get(target, key, receiver)

    // 判断是不是对象，是对象就递归代理
    // 如果整个对象是只读的，那么这个对象的属性是对象，也应该是只读的
    if (isObject(result)) {
      return isReadonly ? readonly(result) : reactive(result)
    }

    return result
  }
}

function set(target: Record<string | symbol, unknown>, key: string | symbol, value: unknown, receiver: object): boolean {
  // 判断是新增还是修改
  const type = hasOwn(target, key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD

  const oldValue = target[key]

  const targetIsArray = isArray(target)

  // 旧值的长度
  const oldLen = targetIsArray ? target.length : 0

  // 设置对象的相应属性值
  const result = Reflect.set(target, key, value, receiver)

  if (!result) {
    return result
  }

  // 这里代表设置成功
  const newLen = targetIsArray ? target.length : 0

  if (hasChanged(value, oldValue) || type === TriggerOpTypes.ADD) {
    trigger(target, type, key)
    if (targetIsArray && oldLen !== newLen) {
      // 数组长度变化了，但是不是直接改的 length 属性
      if (key !== 'length') {
        trigger(target, TriggerOpTypes.SET, 'length')
      } else {
        // 操作的是 key，并且 key 的长度小于旧的长度，则需要删除（长度变长不需要处理）
        for (let i = newLen; i < oldLen; i++) {
          trigger(target, TriggerOpTypes.DELETE, i + '')
        }
      }
    }
  }

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

const get = createGetter()
const readonlyGet = createGetter(true)

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  has,
  ownKeys,
  deleteProperty,
}

export const readonlyHandlers: ProxyHandler<object> = {
  get: readonlyGet,
  set(target, key) {
    console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target)
    return true
  },
  deleteProperty(target, key) {
    console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target)
    return true
  },
}
