/* eslint-disable @typescript-eslint/no-var-requires */
// 已经包含了autoprefixer和browserslist
const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [postcssImport, postcssPresetEnv(), tailwindcss]
}
