# @sunshine-notes/examples-node

Node.js 环境代码示例集合。

## 使用方式

```bash
# 运行单个示例（从根目录）
pnpm --filter @sunshine-notes/examples-node exec tsx src/demo.ts

# 或进入目录后
cd packages/examples-node
pnpm exec tsx src/demo.ts
```

## 目录结构

```
src/
├── demo.ts             # 示例入口
├── event-loop/         # 事件循环相关
├── stream/             # 流处理相关
└── fs/                 # 文件系统相关
```

## 添加新示例

1. 在 `src/` 下创建对应分类目录
2. 编写 `.ts` 文件，使用 `tsx` 直接运行
