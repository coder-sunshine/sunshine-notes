import react from '@astrojs/react'
import starlight from '@astrojs/starlight'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    vue(),
    react(),
    starlight({
      title: '秘密の花园',
      components: {
        ThemeProvider: '@/components/ThemeProvider.astro',
        LastUpdated: '@/components/LastUpdated.astro',
        Footer: '@/components/Footer.astro',
      },
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      defaultLocale: 'root',
      lastUpdated: true,
      customCss: ['./src/styles/global.css', './src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/coder-sunshine/sunshine-notes' }],
      sidebar: [
        {
          label: '前端',
          items: [
            { label: '概览', slug: 'frontend' },
            {
              label: 'JavaScript',
              autogenerate: { directory: 'frontend/javascript' },
            },
            {
              label: 'TypeScript',
              autogenerate: { directory: 'frontend/typescript' },
            },
            {
              label: 'React',
              autogenerate: { directory: 'frontend/react' },
            },
            {
              label: 'React 源码',
              autogenerate: { directory: 'frontend/react-source' },
            },
            {
              label: 'Vue',
              autogenerate: { directory: 'frontend/vue' },
            },
            {
              label: 'CSS',
              autogenerate: { directory: 'frontend/css' },
            },
            {
              label: '工程化',
              autogenerate: { directory: 'frontend/engineering' },
            },
          ],
        },
        {
          label: '后端',
          items: [
            { label: '概览', slug: 'backend' },
            {
              label: 'Node.js',
              autogenerate: { directory: 'backend/node' },
            },
            {
              label: 'NestJS',
              autogenerate: { directory: 'backend/nest' },
            },
            {
              label: '数据库',
              autogenerate: { directory: 'backend/database' },
            },
          ],
        },
      ],
    }),
  ],
})
