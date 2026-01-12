// adapter.ts - 测试适配器
import MyPromise from '.'

const resolved = MyPromise.resolve
const rejected = MyPromise.reject
const deferred = () => {
  const result: {
    promise?: MyPromise<unknown>
    resolve?: (value: unknown) => void
    reject?: (reason: unknown) => void
  } = {}

  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}

export default {
  resolved,
  rejected,
  deferred,
}
