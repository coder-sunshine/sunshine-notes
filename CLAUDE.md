# Sunshine Notes

个人技术笔记项目，记录 Vue、React、TypeScript、CSS、Nest、AI 等技术领域的学习笔记。

## 项目结构

基于 pnpm 10.x 的 monorepo 项目。

- `apps/docs/` - Astro 文档站点（笔记主站）
  - `src/content/docs/frontend/` - 前端笔记（react/、react-source/、vue/、vue-source/、javascript/、typescript/、css/）
  - `src/content/docs/backend/` - 后端笔记（nest/、node/）
- `packages/config/` - 共享配置（ESLint、TSConfig）
- `packages/examples-browser/` - 浏览器环境代码示例
- `packages/examples-node/` - Node 环境代码示例
- `packages/examples-react-source/` - React 源码手写实现
- `packages/examples-vue-source/` - Vue 源码手写实现
- `packages/ui-react/` - React UI 组件及示例
- `packages/ui-vue/` - Vue UI 组件及示例

## 常用命令

```bash
pnpm lint          # ESLint 检查
pnpm lint:fix      # ESLint 自动修复
pnpm format        # Prettier 格式化
pnpm stylelint     # 样式检查
pnpm spell         # 拼写检查
pnpm docs:dev      # 启动文档站点
```

### 依赖安装

```bash
pnpm add -Dw <package>                    # 根目录安装开发依赖
pnpm add -w <package>                     # 根目录安装生产依赖
pnpm add <package> --filter <workspace>   # 指定 workspace 安装
```

## 代码规范

- 代码注释使用中文，变量/函数命名使用英文
- Git commit message 使用中文
- 优先使用 `interface` 而非 `type`（除非需要联合类型）
- 避免使用 `any`，必要时使用 `unknown`
- 未使用的变量以 `_` 开头
- 导出类型使用 `export type`
- 函数使用箭头函数风格

### 文件命名

- 组件文件：PascalCase（`Button.tsx`）
- 工具函数/常量/类型文件：camelCase（`formatDate.ts`）

## 笔记规范

- 使用笔记和源码笔记分开：`react/` vs `react-source/`
- 笔记文件使用 MDX 格式，代码示例应可独立运行
- 示例代码包含中文注释，复杂示例逐步讲解
- 源码实现放在对应的 `examples-*-source` 包中

## 沟通规范

- 始终使用中文回复，确保表达自然专业
- 代码注释使用中文，技术术语、变量名、代码本身保持英文
- 需求不明确或与最佳实践冲突时，先提问再动手
- 存在多种方案时，列出各方案优劣并推荐最适合的
- 发现潜在 bug、安全问题或反模式时，主动指出并建议修复

## 设计原则

- 遵循 SOLID、DRY、KISS、YAGNI 原则
- 优先保证可读性，关键路径再优化性能
- 实现全面的错误处理，考虑边界情况
- 遵循安全最佳实践（输入校验、参数化查询、无硬编码密钥）

## 工具链

Vite + Astro + ESLint + Prettier + Stylelint + cspell + Husky + lint-staged

所有 workspace 共享根目录的 ESLint、Prettier、Stylelint、TypeScript 配置。
