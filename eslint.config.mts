import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import * as pluginMdx from 'eslint-plugin-mdx'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export default [
  // ==================== 全局忽略配置 ====================
  // 必须作为独立对象且只包含 ignores 属性，才能实现全局忽略
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.astro/**', '**/coverage/**', 'pnpm-lock.yaml'],
  },

  // ==================== 基础规则配置 ====================
  // ESLint 推荐规则
  js.configs.recommended,

  // TypeScript ESLint 推荐规则
  ...tseslint.configs.recommended,

  // Prettier 兼容配置（关闭与 Prettier 冲突的规则）
  // 必须放在其他规则之后，以覆盖冲突的格式化规则
  eslintConfigPrettier,

  // ==================== 全局变量配置 ====================
  {
    languageOptions: {
      globals: {
        // 浏览器环境全局变量（window、document 等）
        ...globals.browser,
        // Node.js 环境全局变量（process、__dirname 等）
        ...globals.node,
      },
    },
  },

  // ==================== 自定义规则配置 ====================
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // 未使用变量检查：允许以 _ 开头的参数和变量
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',

      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'prefer-const': 'error',
      'no-use-before-define': 'off',
      curly: ['error', 'all'],

      // import 排序规则
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // ==================== Vue 配置 ====================
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    rules: {
      // 允许单词组件名（如 Index.vue）
      'vue/multi-word-component-names': 'off',
    },
  },

  // ==================== React/JSX 配置 ====================
  // 适用于 packages/ui-react 中的 .jsx/.tsx 文件
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React 推荐规则
      ...pluginReact.configs.recommended.rules,
      // React Hooks 规则
      ...pluginReactHooks.configs.recommended.rules,
      // 无障碍访问规则
      ...pluginJsxA11y.configs.recommended.rules,
      // React 17+ 不需要显式导入 React
      'react/react-in-jsx-scope': 'off',
      // 允许使用 JSX 语法的文件扩展名
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    },
  },

  // ==================== MDX 配置 ====================
  {
    ...pluginMdx.flat,
    // 可选：启用代码块检查
    processor: pluginMdx.createRemarkProcessor({
      lintCodeBlocks: true,
    }),
  },
  {
    ...pluginMdx.flatCodeBlocks,
    rules: {
      ...pluginMdx.flatCodeBlocks.rules,
      // 代码块中的规则覆盖
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
  // MDX 文件特殊规则
  {
    files: ['**/*.mdx'],
    rules: {
      // MDX 中导入的组件在模板中使用，ESLint 检测不到
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]
