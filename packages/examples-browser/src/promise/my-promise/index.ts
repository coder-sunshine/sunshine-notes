/**
 * Promise A+ 规范实现
 * 参考：https://promisesaplus.com/
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

type State = typeof PENDING | typeof FULFILLED | typeof REJECTED
type Resolve<T> = (value: T | PromiseLike<T>) => void
type Reject = (reason?: unknown) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void
type OnFulfilled<T, R> = ((value: T) => R | PromiseLike<R>) | null | undefined
type OnRejected<R> = ((reason: unknown) => R | PromiseLike<R>) | null | undefined

/**
 * 将回调放入微任务队列
 */
const nextTick = (fn: () => void) => {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(fn)
  } else if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
    process.nextTick(fn)
  } else {
    setTimeout(fn, 0)
  }
}

/**
 * Promise Resolution Procedure
 * 根据 A+ 规范 2.3 实现
 */
const resolvePromise = <T>(promise2: MyPromise<T>, x: unknown, resolve: Resolve<T>, reject: Reject) => {
  // 2.3.1: 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }

  // 2.3.3: 如果 x 是对象或函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 2.3.3.3.3: 确保 resolvePromise 和 rejectPromise 只被调用一次
    let called = false
    try {
      // 2.3.3.1: 把 x.then 赋值给 then
      const then = (x as { then?: unknown }).then

      // 2.3.3.3: 如果 then 是函数
      if (typeof then === 'function') {
        then.call(
          x,
          // 2.3.3.3.1: resolvePromise
          (y: unknown) => {
            if (called) {
              return
            }
            called = true
            // 递归解析
            resolvePromise(promise2, y, resolve, reject)
          },
          // 2.3.3.3.2: rejectPromise
          (r: unknown) => {
            if (called) {
              return
            }
            called = true
            reject(r)
          }
        )
      } else {
        // 2.3.3.4: 如果 then 不是函数，以 x 为参数执行 promise
        resolve(x as T)
      }
    } catch (e) {
      // 2.3.3.2 & 2.3.3.3.4: 如果抛出异常
      if (called) {
        return
      }
      called = true
      reject(e)
    }
  } else {
    // 2.3.4: 如果 x 不是对象或函数，以 x 为参数执行 promise
    resolve(x as T)
  }
}

export default class MyPromise<T = unknown> {
  private state: State = PENDING
  private value: T | undefined = undefined
  private reason: unknown = undefined
  private onFulfilledCallbacks: (() => void)[] = []
  private onRejectedCallbacks: (() => void)[] = []

  constructor(executor: Executor<T>) {
    const resolve: Resolve<T> = value => {
      if (this.state !== PENDING) {
        return
      }
      this.state = FULFILLED
      this.value = value as T
      this.onFulfilledCallbacks.forEach(fn => fn())
    }

    const reject: Reject = reason => {
      if (this.state !== PENDING) {
        return
      }
      this.state = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach(fn => fn())
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then<R1 = T, R2 = never>(onFulfilled?: OnFulfilled<T, R1>, onRejected?: OnRejected<R2>): MyPromise<R1 | R2> {
    // 2.2.1: onFulfilled 和 onRejected 都是可选参数
    // 2.2.7.3 & 2.2.7.4: 值穿透
    const realOnFulfilled: OnFulfilled<T, R1> = typeof onFulfilled === 'function' ? onFulfilled : v => v as unknown as R1
    const realOnRejected: OnRejected<R2> =
      typeof onRejected === 'function'
        ? onRejected
        : e => {
            throw e
          }

    const promise2 = new MyPromise<R1 | R2>((resolve, reject) => {
      const fulfilledMicrotask = () => {
        nextTick(() => {
          try {
            const x = realOnFulfilled!(this.value as T)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      const rejectedMicrotask = () => {
        nextTick(() => {
          try {
            const x = realOnRejected!(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.state === FULFILLED) {
        fulfilledMicrotask()
      } else if (this.state === REJECTED) {
        rejectedMicrotask()
      } else {
        // pending 状态，将回调存起来
        this.onFulfilledCallbacks.push(fulfilledMicrotask)
        this.onRejectedCallbacks.push(rejectedMicrotask)
      }
    })

    return promise2
  }

  catch<R = never>(onRejected?: OnRejected<R>): MyPromise<T | R> {
    return this.then(null, onRejected)
  }

  finally(onFinally?: (() => void) | null): MyPromise<T> {
    return this.then(
      value => {
        return MyPromise.resolve(onFinally?.()).then(() => value)
      },
      reason => {
        return MyPromise.resolve(onFinally?.()).then(() => {
          throw reason
        })
      }
    )
  }

  static resolve<T>(value?: T | PromiseLike<T>): MyPromise<T> {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise<T>(resolve => resolve(value as T))
  }

  static reject<T = never>(reason?: unknown): MyPromise<T> {
    return new MyPromise<T>((_, reject) => reject(reason))
  }
}
