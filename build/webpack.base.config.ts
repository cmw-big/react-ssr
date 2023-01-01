import { type Configuration } from 'webpack'
import EslintPlugin from 'eslint-webpack-plugin'
import { resolve } from 'path'
import { cwd } from 'process'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config: Configuration = {
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  stats: {
    colors: true,
    errorDetails: true
  },
  devtool: 'inline-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      //   env: resolve(relativePath, `src/env/${process.env.SF_ENV || 'work'}`),
      '@': resolve(cwd(), 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        use: [
          'source-map-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              exclude: [
                // \\ for Windows, \/ for Mac OS and Linux
                /node_modules[\\/]core-js/,
                /node_modules[\\/]webpack[\\/]buildin/
              ]
            }
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.tsx?$/,
        use: [
          'source-map-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          // 这里我使用babel-loader，进行ts的转化，ts只进行类型检查。
          {
            loader: 'ts-loader',
            options: {
              // 只做代码转化，不做类型检查
              // add transpileOnly option if you use ts-loader < 9.3.0
              configFile: resolve(
                __dirname,
                '../config/',
                `tsconfig${
                  process.env.NODE_ENV !== 'production' ? '.dev' : ''
                }.json`
              )
            }
          }
        ],
        exclude: [
          /node_modules[\\/]core-js/,
          /node_modules[\\/]webpack[\\/]buildin/
        ]
      }
    ]
  },
  plugins: [
    // webpack在打包之后，会把所有产出的资源，放到assets对象上。然后这个插件都会把这个对象里面的资源放到html中。
    // new HtmlWebpackPlugin({
    //   template: resolve(__dirname, '..//public/index.html'),
    //   minify: {
    //     collapseWhitespace: true, // 干掉空格
    //     removeComments: true, // 干掉注释
    //     removeAttributeQuotes: true, // 干掉双引号
    //     removeEmptyAttributes: true // 干掉空属性
    //   }
    // }),

    // 把搜集的css生成一个单独的文件。然后交给htmlwebpackplugin加入到html进行引用

    // 定义全局变量,将代码中进行文本的替换
    // new DefinePlugin({
    //   'process.env.NODE_ENV':
    //     JSON.stringify(options?.mode) ?? JSON.stringify(process.env.NODE_ENV)
    // }),
    // ESlint的验证
    // 使用eslint来检查错误，然后爆出来，警告的错误
    new EslintPlugin({
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.josn'],
      fix: true,
      threads: true,
      quiet: true // 设置为 true 后，仅处理和报告错误，忽略警告
    }),
    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
      verbose: true
    })

    // new BundleAnalyzerPlugin({}),
  ]
}

export default config
