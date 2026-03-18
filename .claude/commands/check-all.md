---
description: 运行所有代码检查（lint、格式化、拼写）
---

请依次运行以下检查命令，并汇总所有问题：

1. `pnpm lint` - ESLint 检查
2. `pnpm stylelint` - 样式检查
3. `pnpm spell` - 拼写检查

如果发现问题：

- 列出所有错误和警告
- 对于可自动修复的问题，询问我是否要运行 `pnpm lint:fix` 和 `pnpm format`
- 对于需要手动修复的问题，给出具体的修改建议
