module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // 自动将jsx通过包引入的方式进行转化，而不是调用React.createElement方法
        development: process.env.NODE_ENV !== 'production'
      }
    ],
    [
      '@babel/preset-env',
      {
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1'
          // chrome: 85
        },
        // Babel 将检查你的所有代码，以便查找目标环境中缺失的功能，然后只把必须的 polyfill 包含进来。
        useBuiltIns: 'usage',
        corejs: 3, // 这个版本最好精确到次版本。有利于更新
        debug: false,
        modules: false, // 不采取任何模块化的方式，是为了更好的tree-shaking
        shippedProposals: true // 将代码中提案的也进行转化
      }
    ],
    ['@babel/preset-typescript']
  ],
  plugins: [
    // 将一些babel生成的helper方法，弄成公共的，而不是每一个地方都引用一次帮助方法。
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true // 将提案的也进行垫片
        }
      }
    ]
  ]
}
