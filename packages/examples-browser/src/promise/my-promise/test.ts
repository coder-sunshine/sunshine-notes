import promisesAplusTests from 'promises-aplus-tests'

import adapter from './adapter'

// 运行 Promises/A+ 规范测试套件
promisesAplusTests(adapter, (err: Error | null) => {
  if (err) {
    console.error('Promises/A+ 测试失败:')
    console.error(err)
  } else {
    console.log('Promises/A+ 测试通过')
  }
})
