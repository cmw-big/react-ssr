import { DefinePlugin, type Configuration } from 'webpack'
import { resolve } from 'path'
import { cwd } from 'process'
import { merge } from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import baseConfig from './webpack.base.config'

const config: Configuration = merge(baseConfig, {
  entry: {
    main: resolve(cwd(), 'src/client')
  },
  output: {
    path: resolve(cwd(), 'public/client'),
    filename: '[name].js',
    // filename: '[name].[contenthash:5].js', // 一般是入口代码块的名字
    // 一般是非入口代码块的名字。可能是分包产生，也可能是懒加载（动态加载）产生。import()语法加载模块
    chunkFilename: '[name].[contenthash:5].js', // 一个chunk一般来说只会生成一个js文件，所以，使用chunkhash比较好（除非是入口文件，会包含css，那么css变化后，入口的chunkhash也会发生变化。就会失效）
    publicPath: resolve(cwd(), 'public/client'), // 给所有的输出的添加一个公共前缀。一般是配置线上的文件路径。我这里添加了一个公共路径是/的。如果不写的话。可能刷新页面之后，html中js的相对路径就是错误的了。
    assetModuleFilename: 'images/[name].[contenthash:5][ext][query]' // 模块输出的文件名, 图片或者文件等下的路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/assets', // 为css中的外部图像，文件等资源加上公共前缀。
            }
          },
          // 'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/assets', // 为css中的外部图像，文件等资源加上公共前缀。
            }
          },
          // 'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(cwd(), 'src/locales'),
          to: resolve(cwd(), 'public/client')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    new DefinePlugin({
      __webpack_output_path: JSON.stringify('client'),
      'process.env.Browser': JSON.stringify(true)
    }),
    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
      verbose: true
    })
  ]
})

export default config
