module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器,使之能识别ts
  // 定义文件继承的子规范。prettier的ts样式规范。
  // 第二个继承是，如果ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
  extends: [
    // 使用@typescript-eslint/eslint-plugin的推荐规则
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:react-hooks/recommended',
    // 这会将prettier错误作为ESLint错误来展示。确保这个配置放到数组的最后。
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true // 允许解析JSX
    }
  },
  env: {
    // 指定代码的运行环境
    browser: true,
    es2022: true
  },
  settings: {
    'import/parsers': {
      // 使用 TypeScript parser
      '@typescript-eslint/parser': ['.ts', '.tsx', 'js', 'jsx', '.d.ts']
    },
    'import/resolver': {
      // use a glob pattern
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    'no-console': [1, { allow: ['warn', 'error'] }], // 使用console除了规定的都警告
    'no-unused-vars': 0, // 有声明后未被使用的变量警告
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'ts', 'tsx'] }
    ], // 在哪些文件扩展名后可以使用jsx语法。如果不是这些文件扩展名就警告
    'no-debugger': 1, // 使用debugger警告
    'jsx-a11y/no-noninteractive-element-interactions': 0, // 关闭强制要求非交互语义标签(main,hX,ul,ol,liarea)不包含交互事件(onClick等)
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0, // 关闭强制一个可单击的非交互元素至少有一个键盘事件监听器。
    'import/extensions': 0,
    'import/no-mutable-exports': 0,
    'import/prefer-default-export': 0,
    'react/state-in-constructor': 0, // 关闭state必须在constructor中定义
    'react/static-property-placement': [1, 'static public field'],
    'react/no-unused-state': 0, // 未使用过的state不报错
    'class-methods-use-this': 0, // 在class中的方法中不使用this不报错
    'react/prop-types': 0, // 关闭强制使用prop-types校验props，如果使用ts，直接可以不用使用这个了
    'react/destructuring-assignment': 0, // 关闭react的解构赋值警告
    'react/react-in-jsx-scope': 0, // 关闭函数组件必须导入react的警告。因为用了babel的插件，可以自动导入
    'react/jsx-uses-react': 0, // 关闭强在JSX中使用React.createElement
    'react/function-component-definition': 0, // 关闭强制函数组件定义必须使用函数表达式
    'import/no-unresolved': 0, // 关闭强制导入模块不存在的报错
    'default-param-last': 0, // 关闭默认参数必须放在最后一个参数的警告
    'no-restricted-syntax': 0, // 关闭for of循环警告
    'no-redeclare': 0, // 关闭重复声明变量警告
    'func-names': 0, // 关闭函数表达式必须有名字警告
    'no-void': 0, // 关闭void警告
    'default-case': 0, // 关闭switch语句默认情况警告
    'no-use-before-define': 0, // 关闭变量定义前使用警告
    'import/export': 0, // 关闭导入导出警告
    'no-plusplus': 0, // 关闭++ --警告
    'no-shadow': 0, // 关闭变量声明时使用已声明的变量警告
    'react/require-default-props': 0, // 关闭组件的props必须有defaultProps警告
    'import/no-extraneous-dependencies': 0, // 关闭不允许有外部依赖的警告
    camelcase: 'warn', // 使用连接符警告
    'max-classes-per-file': 0 // 关闭一个文件只能有一个class 规则
  },
  overrides: [
    {
      files: ['*.ts?(x)'], // ts或者tsx文件，不检查没有定义的变量。因为ts本身就会检查这个
      rules: {
        'no-undef': 'off'
      }
    }
  ]
}
