//可以用于统一项目代码风格,统一的缩进，单双引号，尾逗号等等风格

module.exports = {
  printWidth: 100, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  semi: true, // 句尾添加分号
  vueIndentScriptAndStyle: true,
  singleQuote: true, // 使用单引号代替双引号
  quoteProps: 'as-needed',
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  arrowParens: 'always', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never', // 默认值preserve。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',
  rangeStart: 0,
};
