## 描述

- 使用vue3.0 + typescript + ant-design-vue 搭建的项目基础架构类型声明库

## node版本
- v16.20.0+

## npm版本
- 8.19.4+

## vue-cli版本
- @vue/cli 4.5.13+

## yarn版本
- 1.22.19+

## 安装依赖

```
npm install
```

## 开发模式

```
npm run serve
```

## 生产环境

```
npm run build
```

## 查看打包结果分析
  
``` 
npm run analysis
```

## 代码提交

``` 
npm run commit
```

## 项目发布，生产changelog（master）

``` 
npm run release
```

## 主要用到的库
- vue ^3.2.33
- vue-router ^4.0.14
- 状态管理 pinia 2.0.12
- http 请求: axios ^0.27.2
- ui 库: ant-design-vue 3.0+
- 进度条: nprogress ^0.2.0
- 本地存储插件: lockr ^0.8.5
- css预处理器: less ^3.0.4
- 图表：echarts ^5.3.2
- 时间库：dayjs ^1.11.1
- 文件检查: ls-lint
- 提交规范: commitizen cz-customizable
- 代码检查: eslint eslint-typescript 格式化：prettier，提交之前检查与修复：lint-staged
- webpack插件:
- 打包分析: webpack-bundle-analyzer
- 删除依赖：rimraf
- gzip: CompressionPlugin
- css压缩：css-minimizer-webpack-plugin
- js压缩： terser-webpack-plugin
- 版本管理自动化：standard-version

## 包结构
    ├── .husky               // Git hooks 工具，防止使用 Git hooks 的一些不好的 commit 或者 push
    ├── build                // 构建配置
        ├── webpack.analy.js // 分析打包配置
        ├── webpack.base.js  // 公共配置
        ├── webpack.dev.js   // 开发环境配置
        ├── webpack.prod.js  // 生产环境配置
    ├── public
        ├── favicon.png      // 网站图表
        ├── index.html       // 单页面载体
    ├── src
        ├── apis             // 接口
        ├── assets           // 静态资源
        ├── components       // 组件
        ├── directive        // 指令
        ├── enums            // 枚举
        ├── hooks            // 公共方法提取
        ├── plugins          // 插件引入，支持配置
        ├── router           // 路由
        ├── store            // 存储pinia
        ├── styles           // 样式
        ├── types            // 类型别名
        ├── utils            // 工具包
        ├── views            // 页面
        ├── App.vue        
        ├── main.ts         
    ├── .babelrc             // Babel的配置文件:ant 按需引入
    ├── .cz-config.js        // cz 配置
    ├── .dockerignore        // docker 传输需要忽略的文件
    ├── .editorconfig        // 跨编辑器和IDE编写代码，保持一致的简单编码风格
    ├── .eslintignore        // eslint 忽略项
    ├── .eslintrc.js         // eslint 配置
    ├── .gitignore           // git 上传需要忽略的文件
    ├── .ls-lint.yml         // 文件命名规范
    ├── .versionrc.json      // cz 命令描述
    ├── CHANGELOG.md         // 更新日志，npm run commit && npm run release之后生成
    ├── CODEREVIEW.md        // codeRevivew记录
    ├── Dockerfile.amd64     // 生成amd64环境下镜像的执行文件
    ├── Dockerfile.amd64     // 生成arm64环境下镜像的执行文件
    ├── jenkinsfile.groovy   // jenkins执行脚本，需修改gitUrl
    ├── nginx.conf           // 代理配置
    ├── package.json         // jar 包的配置
    ├── prettier.config.js   // 代码格式化的工具，美化代码
    ├── README.md            // 项目描述文件
    ├── tsconfig.json        // ts配置文件
    ├── zwj_vue_screen.yaml   // 项目k8s发布配置文件，需根据项目名修改
