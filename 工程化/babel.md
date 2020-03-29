# Babel

Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。

[plugin-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
[user-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)

## Babel 是什么？

Babel 是一个 JavaScript 编译器
Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。
下面列出的是 Babel 能为你做的事情：

1. 语法转换
2. 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
3. 源码转换 (codemods)

有关编译器的精彩教程，请查看 [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler) 项目，它还高屋建瓴地解释了 Babel 的工作方式。

### JSX 与 React

Babel 能够转换 JSX 语法

### 类型注释 (Flow 和 TypeScript)

Babel 可以删除类型注释！务必牢记 Babel 不做类型检查，你仍然需要安装 Flow 或 TypeScript 来执行类型检查的工作

### 插件化

Babel 构建在插件之上。使用现有的或者自己编写的插件可以组成一个转换管道。通过使用或创建一个 preset 即可轻松使用一组插件。
利用 [astexplorer.net](https://astexplorer.net/#/KJ8AjD6maa) 可以立即创建一个插件，
或者使用 [generator-babel-plugin](https://github.com/babel/generator-babel-plugin) 生成一个插件模板。

```
// 一个插件就是一个函数
export default function ({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split('').reverse().join('');
      }
    }
  };
}
```

### 可调试

由于 Babel 支持 Source map，因此你可以轻松调试编译后的代码。

### 符合规范

Babel 尽最大可能遵循 ECMAScript 标准。不过，Babel 还提供了特定的选项来对标准和性能做权衡。

### 代码紧凑

Babel 尽可能用最少的代码并且不依赖太大量的运行环境。
有些情况是很难达成的这一愿望的，因此 Babel 提供了 "loose" 参数，用以在特定的转换情况下在符合规范、文件大小和速度之间做折中。


## Plugins & Presets

简而言之：preset是预先确定好的Plugin集合

转换以插件的形式出现，插件是一些小的JavaScript程序，指导Babel如何对代码执行转换。
您甚至可以编写自己的插件来将任何您想要的转换应用到您的代码中。
要将ES2015+语法转换为ES5，我们可以依赖官方插件，如@babel/plugin-transform-arrow-functions：

```
npm install --save-dev @babel/plugin-transform-arrow-functions
./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

这是个好的开始！但我们的代码中也有其他ES2015+功能，我们希望进行转换。
我们不需要一个接一个地添加我们想要的所有插件，我们可以使用一个“preset”，它只是一组预先确定的插件。
就像使用插件一样，您也可以创建自己的presets来共享所需插件的任何组合。
对于我们这里的例子，有一个很好的预置名为 env。

```
npm install --save-dev @babel/preset-env
./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

在没有任何配置的情况下，这个preset将包括所有支持现代JavaScript（ES2015、ES2016等）的插件。
但presets也可以带options。与其从终端同时传递cli和preset options，不如看看传递options的另一种方式：配置文件。

### 创建 Preset

如需创建一个自己的 preset，只需导出一份配置即可。
可以是返回一个插件数组...

```
module.exports = function() {
  return {
    plugins: [
      "pluginA",
      "pluginB",
      "pluginC",
    ]
  };
}
```

preset 可以包含其他的 preset，以及带有参数的插件。

```
module.exports = () => ({
  presets: [
    require("@babel/preset-env"),
  ],
  plugins: [
    [require("@babel/plugin-proposal-class-properties"), { loose: true }],
    require("@babel/plugin-proposal-object-rest-spread"),
  ],
});
```

## Configure Babel

你的用例是什么？

1. 你在用monorepo？
2. 要编译node_modules吗？ babel.config.json is for you!
3. 您的配置仅适用于项目的单个部分？ .babelrc.json is for you!

### babel.config.json

```
{
  "presets": [...],
  "plugins": [...]
}

module.exports = function (api) {
  api.cache(true);

  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```

### .babelrc.json

```
{
  "presets": [...],
  "plugins": [...]
}
```

[.babelrc documentation](https://www.babeljs.cn/docs/config-files#file-relative-configuration)

### package.json

或者，您可以选择在package.json中指定.babelrc.json配置来使用babel，如下所示：

```
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```

### JavaScript configuration files

您还可以使用JavaScript编写babel.config.json和.babelrc.json文件：

```
const presets = [ ... ];
const plugins = [ ... ];

module.exports = { presets, plugins };
```

您也可以访问任何Node.js API，例如基于process环境的动态配置：

```
const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };
```

[dedicated documentation](https://www.babeljs.cn/docs/config-files)

### Using the CLI (@babel/cli)

`babel --plugins @babel/plugin-transform-arrow-functions script.js`

[babel-cli documentation](https://www.babeljs.cn/docs/babel-cli)

### Using the API (@babel/core)

```
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```

[babel-core documentation](https://www.babeljs.cn/docs/babel-core)
