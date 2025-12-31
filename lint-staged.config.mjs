/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.{prettierrc,eslintrc,stylelintrc}}': ['prettier --write --parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
  '*.{scss,less,styl,html}': ['stylelint --fix', 'prettier --write'],
  '*.{md,mdx}': ['eslint --fix', 'prettier --write'],
  '*.{html,js,cjs,mjs,ts,tsx,css,scss,md,mdx,vue}': files => {
    const filtered = files.filter(file => !file.includes('/demos/'))
    return filtered.length ? [`cspell lint --dot --color --show-suggestions ${filtered.join(' ')}`] : []
  },
}
