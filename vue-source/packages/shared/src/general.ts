export const isArray: typeof Array.isArray = Array.isArray

export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

export const isString = (val: unknown): val is string => {
  return typeof val === 'string'
}

export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

// 通过Object.is比较可以避免出现一些特殊情况
// 比如NaN和NaN是相等的，+0和-0是不相等的
export const hasChanged = (value: any, oldValue: any): boolean => !Object.is(value, oldValue)

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => hasOwnProperty.call(val, key)

export const extend = Object.assign
