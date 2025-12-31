# Sunshine Notes 项目规范

## 项目简介

这是一个个人技术笔记项目，用于记录 Vue、React、TypeScript、CSS、Nest、AI 等技术领域的学习笔记。

## 项目架构

这是一个基于 pnpm 的 monorepo 笔记项目，结构如下：

- `apps/` - 应用程序
  - `docs/` - Astro 文档站点（笔记主站）
- `packages/` - 共享包
  - `config/` - 共享配置（ESLint、TSConfig 等）
  - `ui-react/` - React UI 组件及示例
  - `ui-vue/` - Vue UI 组件及示例

## 命令规范

### 依赖安装

```bash
# 根目录安装开发依赖
pnpm add -Dw <package>

# 根目录安装生产依赖
pnpm add -w <package>

# 指定 workspace 安装
pnpm add <package> --filter <workspace-name>
pnpm add -D <package> --filter docs
```

### 常用脚本

```bash
pnpm lint          # ESLint 检查
pnpm lint:fix      # ESLint 自动修复
pnpm format        # Prettier 格式化
pnpm stylelint     # 样式检查
pnpm spell         # 拼写检查
```

## 代码规范

### 语言

- 代码注释使用中文
- 变量、函数命名使用英文
- Git commit message 使用中文

### TypeScript

- 优先使用 `interface` 而非 `type`（除非需要联合类型）
- 避免使用 `any`，必要时使用 `unknown`
- 未使用的变量以 `_` 开头
- 导出类型使用 `export type`
- 函数使用箭头函数风格

### 文件命名

- 组件文件：PascalCase（如 `Button.tsx`）
- 工具函数：camelCase（如 `formatDate.ts`）
- 常量文件：camelCase（如 `constants.ts`）
- 类型文件：camelCase（如 `types.ts`）

## 工具链

- 包管理器：pnpm 10.x
- 构建工具：Vite
- 文档框架：Astro
- 代码检查：ESLint + Prettier + Stylelint
- 拼写检查：cspell
- Git Hooks：Husky + lint-staged

## 笔记规范

### 内容组织

- 按技术领域分类：vue/、react/、typescript/、css/、nest/、ai/ 等
- 每个笔记文件使用 MDX 格式，支持嵌入代码示例
- 代码示例应可独立运行，便于复制使用

### 代码示例

- 笔记中的代码示例必须遵循项目统一的代码规范
- 示例代码应包含必要的中文注释说明
- 复杂示例应拆分为多个步骤，逐步讲解

### 共享配置

所有 workspace 共享以下配置（从根目录继承）：

- ESLint 配置
- Prettier 配置
- Stylelint 配置
- TypeScript 基础配置

新增 workspace 时必须继承根目录配置，确保代码风格统一。
