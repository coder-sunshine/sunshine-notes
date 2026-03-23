export function track(target: object, key: unknown) {
  console.log(`target ${JSON.stringify(target)} 依赖收集：${key}属性被读取了`)
}

export function trigger(target: object, key: unknown) {
  console.log(`target ${JSON.stringify(target)} 触发更新：${key}属性被修改了`)
}
