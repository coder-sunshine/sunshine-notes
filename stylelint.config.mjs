/** @type {import('stylelint').Config} */
export default {
  extends: [
    // 标准配置
    'stylelint-config-standard',
    // Recess 属性排序规范（按功能分组：定位 → 盒模型 → 排版 → 视觉）
    'stylelint-config-recess-order',
  ],
  overrides: [
    // Vue 文件支持
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
    // SCSS 文件支持
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    // Less 文件支持
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    // URL 必须加引号
    'function-url-quotes': 'always',

    // 允许空源码（Vue 文件可能没有 style 块）
    'no-empty-source': null,

    // 不限制选择器类名格式（兼容 BEM、CSS Modules 等）
    'selector-class-pattern': null,

    // 允许低优先级选择器覆盖高优先级
    'no-descending-specificity': null,

    // 不限制 CSS 变量命名模式
    'custom-property-pattern': null,

    // 允许厂商前缀（多行省略等场景需要）
    'value-no-vendor-prefix': null,

    // 忽略 :global、:deep、:slotted 等伪类（Vue/CSS Modules）
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep', 'slotted'],
      },
    ],

    // 不限制 @import 写法
    'import-notation': null,
  },
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.astro/**'],
}
