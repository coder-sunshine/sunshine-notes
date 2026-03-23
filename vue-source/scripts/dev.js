// @ts-check
// 启用 TypeScript 类型检查（即使是 .js 文件，配合 JSDoc 注释也能获得类型提示）

// 开发环境使用 esbuild 构建，因为速度快
// 生产环境仍然使用 Rollup，因为它生成的文件更小，tree-shaking 更好

// ==================== 导入依赖 ====================

import fs from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util' // Node.js 内置的命令行参数解析工具

import esbuild from 'esbuild'
import { polyfillNode } from 'esbuild-plugin-polyfill-node' // 在浏览器环境中 polyfill Node.js 内置模块

// ESM 中没有 require 和 __dirname，需要手动构造
const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

// ==================== 解析命令行参数 ====================
// 用法示例：
//   node scripts/dev.js reactivity          -> 构建 reactivity 包，格式为 global (IIFE)
//   node scripts/dev.js reactivity -f esm   -> 构建 reactivity 包，格式为 ESM
//   node scripts/dev.js -p                  -> 生产模式构建
//   node scripts/dev.js -i                  -> 内联所有依赖（不 external）

const {
  values: { format: rawFormat, prod, inline: inlineDeps },
  positionals, // 位置参数，即要构建的目标包名（如 reactivity、runtime-core）
} = parseArgs({
  allowPositionals: true,
  options: {
    // -f / --format: 输出格式
    // 可选值：global（IIFE）、esm-bundler、esm-browser、cjs、global-runtime、esm-bundler-runtime 等
    format: {
      type: 'string',
      short: 'f',
      default: 'esm',
    },
    // -p / --prod: 是否为生产模式（会将 __DEV__ 设为 false）
    prod: {
      type: 'boolean',
      short: 'p',
      default: false,
    },
    // -i / --inline: 是否内联所有依赖（不做 external 处理）
    inline: {
      type: 'boolean',
      short: 'i',
      default: false,
    },
  },
})

// 设置默认格式为 esm
const format = rawFormat || 'esm'

// 没有指定目标包时，默认构建 reactivity
const targets = positionals.length ? positionals : ['reactivity']

// ==================== 确定输出格式 ====================

// 将 format 字符串映射为 esbuild 的 format 选项
// global / global-runtime -> iife（立即执行函数，挂载到 window）
// cjs -> cjs（CommonJS，用于 Node.js）
// 其余（esm-bundler、esm-browser）-> esm
const outputFormat = format.startsWith('global') ? 'iife' : format === 'cjs' ? 'cjs' : 'esm'

// 生成输出文件名的后缀部分
// 例如 format='global-runtime' -> postfix='runtime.global'
// 例如 format='esm-browser' -> postfix='esm-browser'
const postfix = format.endsWith('-runtime') ? `runtime.${format.replace(/-runtime$/, '')}` : format

// 读取私有包目录（Vue 源码中有些包不公开发布）
// 如果 packages-private 目录不存在，返回空数组
const privatePackages = fs.existsSync('packages-private') ? fs.readdirSync('packages-private') : []

// ==================== 遍历目标包，逐个构建 ====================

for (const target of targets) {
  // 判断目标包是在 packages 还是 packages-private 目录下
  const pkgBase = privatePackages.includes(target) ? `packages-private` : `packages`
  const pkgBasePath = `../${pkgBase}/${target}`

  // 读取目标包的 package.json，获取包信息和构建选项
  const pkg = require(`${pkgBasePath}/package.json`)

  // 拼接输出文件路径
  // 例如：packages/reactivity/dist/reactivity.global.js
  // 特殊处理：vue-compat 包的输出文件名为 vue 而不是 vue-compat
  // prod 模式时文件名带 .prod 后缀，如 reactivity.global.prod.js
  const outfile = resolve(
    __dirname,
    `${pkgBasePath}/dist/${target === 'vue-compat' ? `vue` : target}.${postfix}.${prod ? `prod.` : ``}js`
  )
  const relativeOutfile = relative(process.cwd(), outfile)

  // ==================== 处理外部依赖（external） ====================
  // external 的依赖不会被打包进产物，而是保留 import/require 语句
  // 这对于 cjs 和 esm-bundler 格式很重要，因为最终用户的打包工具会处理这些依赖

  /** @type {string[]} */
  let external = []
  if (!inlineDeps) {
    // cjs 和 esm-bundler 格式：将所有 dependencies 和 peerDependencies 设为 external
    if (format === 'cjs' || format.includes('esm-bundler')) {
      external = [
        ...external,
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        // compiler-sfc 和 server-renderer 会用到这些 Node.js 内置模块
        'path',
        'url',
        'stream',
      ]
    }

    // compiler-sfc 特殊处理：它依赖 @vue/consolidate（模板引擎整合包）
    // 需要把 consolidate 的所有 devDependencies（各种模板引擎）都设为 external
    if (target === 'compiler-sfc') {
      const consolidatePkgPath = require.resolve('@vue/consolidate/package.json', {
        paths: [resolve(__dirname, `../packages/${target}/`)],
      })
      const consolidateDeps = Object.keys(require(consolidatePkgPath).devDependencies)
      external = [
        ...external,
        ...consolidateDeps,
        'fs',
        'vm',
        'crypto',
        'react-dom/server',
        'teacup/lib/express',
        'arc-templates/dist/es5',
        'then-pug',
        'then-jade',
      ]
    }
  }

  // ==================== esbuild 插件 ====================

  /** @type {Array<import('esbuild').Plugin>} */
  const plugins = [
    {
      // 自定义插件：每次构建完成后打印输出文件路径
      name: 'log-rebuild',
      setup(build) {
        build.onEnd(() => {
          console.log(`built: ${relativeOutfile}`)
        })
      },
    },
  ]

  // 非 cjs 格式且包启用了 enableNonBrowserBranches 时
  // 添加 Node.js polyfill 插件（让 Node.js 模块在浏览器环境能用）
  if (format !== 'cjs' && pkg.buildOptions?.enableNonBrowserBranches) {
    plugins.push(polyfillNode())
  }

  // ==================== 启动 esbuild 构建 ====================

  esbuild
    .context({
      // 入口文件：每个包的 src/index.ts
      entryPoints: [resolve(__dirname, `${pkgBasePath}/src/index.ts`)],
      outfile,
      bundle: true, // 打包模式，将所有依赖（除 external）打包到一个文件
      external,
      sourcemap: true, // 生成 sourcemap，方便调试
      format: outputFormat,
      globalName: pkg.buildOptions?.name, // IIFE 格式时挂载到全局的变量名（如 VueReactivity）
      platform: format === 'cjs' ? 'node' : 'browser', // 目标平台
      plugins,

      // ==================== 编译时常量定义 ====================
      // 这些常量在编译时会被替换为具体的值
      // Vue 源码中大量使用这些常量做条件编译（类似 C 语言的 #ifdef）
      // 在 tree-shaking 时，false 分支的代码会被完全移除
      define: {
        __COMMIT__: `"dev"`, // 当前 git commit hash，开发模式固定为 "dev"
        __VERSION__: `"${pkg.version}"`, // 从 package.json 读取版本号

        // 环境标识
        __DEV__: prod ? `false` : `true`, // 是否为开发模式（控制警告信息、开发工具等）
        __TEST__: `false`, // 是否为测试环境
        __BROWSER__: String(format !== 'cjs' && !pkg.buildOptions?.enableNonBrowserBranches), // 是否为浏览器环境

        // 构建格式标识
        __GLOBAL__: String(format === 'global'), // 是否为全局（IIFE）格式
        __ESM_BUNDLER__: String(format.includes('esm-bundler')), // 是否为 ESM bundler 格式
        __ESM_BROWSER__: String(format.includes('esm-browser')), // 是否为 ESM browser 格式
        __CJS__: String(format === 'cjs'), // 是否为 CommonJS 格式
        __SSR__: String(format !== 'global'), // 是否支持 SSR（非 global 格式都支持）
        __COMPAT__: String(target === 'vue-compat'), // 是否为 Vue 2 兼容模式

        // 功能开关 - 通过编译时常量控制是否包含某些功能
        __FEATURE_SUSPENSE__: `true`, // Suspense 组件
        __FEATURE_OPTIONS_API__: `true`, // Options API 支持
        __FEATURE_PROD_DEVTOOLS__: `false`, // 生产环境 devtools
        __FEATURE_PROD_HYDRATION_MISMATCH_DETAILS__: `true`, // 生产环境 hydration 不匹配详情
      },
    })
    // context() 返回一个构建上下文，调用 watch() 进入监听模式
    // 文件变化时自动重新构建，适合开发时使用
    .then(ctx => ctx.watch())
}
