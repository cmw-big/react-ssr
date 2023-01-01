import { DefinePlugin, type Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { resolve } from 'path'
import { cwd } from 'process'
import nodeExternals from 'webpack-node-externals'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import baseConfig from './webpack.base.config'

const config: Configuration = merge(baseConfig, {
  entry: {
    server: resolve(__dirname, '../src/server')
  },
  devtool: false,
  // 将node_modules中包都不emit到bundle中
  externals: [nodeExternals()],
  target: 'node',
  // 将node的内置模块视为external模块。这样就不会将node内置模块打包到代码中
  externalsPresets: { node: true },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'js/[name].js', // 一般是入口代码块的名字
    // 一般是非入口代码块的名字。可能是分包产生，也可能是懒加载（动态加载）产生。import()语法加载模块
    chunkFilename: 'js/[name].js', // 一个chunk一般来说只会生成一个js文件，所以，使用chunkhash比较好（除非是入口文件，会包含css，那么css变化后，入口的chunkhash也会发生变化。就会失效）
    publicPath: '/client/' // 给所有的输出的添加一个公共前缀。一般是配置线上的文件路径。我这里添加了一个公共路径是/的。如果不写的话。可能刷新页面之后，html中js的相对路径就是错误的了。
    // assetModuleFilename: 'assets/[name][ext][query]' // 模块输出的文件名, 图片或者文件等下的路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 不会生成文件，
              emit: false
              // publicPath: '/assets', // 为css中的外部图像，文件等资源加上公共前缀。
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'isomorphic-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 不会生成文件，
              emit: false
              // publicPath: '/assets', // 为css中的外部图像，文件等资源加上公共前缀。
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 不会生成文件，
              emit: false
              // publicPath: '/assets', // 为css中的外部图像，文件等资源加上公共前缀。
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)/,
        type: 'asset',
        generator: {
          emit: false,
          filename: 'imgs/[hash][ext][query]' // 局部指定输出位置
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(cwd(), 'src/locales'),
          to: resolve(__dirname, '../dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    new DefinePlugin({
      'process.env.Browser': JSON.stringify(false)
    })
  ]
})
export default config
