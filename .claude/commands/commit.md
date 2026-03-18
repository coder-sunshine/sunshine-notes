---
description: 提交代码并生成规范的 commit message
---

请帮我提交当前的代码变更：

1. 先运行 `git status` 和 `git diff` 查看变更内容
2. 根据变更内容生成符合项目规范的 commit message：
   - 使用中文描述
   - 使用 gitmoji 前缀（如 🚀 feat、🧩 fix、📚 docs、🎨 style、♻️ refactor）
   - 格式：`type: emoji 描述`
3. 展示生成的 commit message 让我确认
4. 确认后执行 `git add` 和 `git commit`
