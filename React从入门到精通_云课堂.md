## 第一课时
#### 优势
1. view层，易学易用
2. 非声明式的单向数据绑定
3. 面向HTML5的组件化
4. 高性能的密集DOM操作
5. 支持后端渲染（SEO)
6. 运行时的编码规范辅助
7. 可靠的维护者
8. React Native

#### 不足
1. 没有同类库生态成熟，尤其第三方插件
2. 增加了调试复杂度
3. 源码gzip后有35KB，太大

#### 与之前组件开发的差异
1. javascript和HTML被整合在一起
2. 传统：选中DOM,通过数据设置和调整DOM
3. React:根据数据声明DOM

#### 使用场景
1. 团队多人合作时
2. 多个项目需要公用组件时
3. 存在复杂交互的应用

#### 非适合场景
1. UI交互极少的应用
2. 需要支持IE8以下的版本时

#### 后续内容
1. 基本语法和API
2. 生命周期和状态机
3. 入门实战
4. 优化和提高

## 第二课 React的基本语法与生命周期（实战）
#### JSX优势与不足
1. 语法标示：{}
2. class改为className
3. css layout不同：使用驼峰式

#### 七个例子
1. hello world
2. data-attr，style，className，{...this.props}
3. parent<->child
4. Dom,Event
5. state,props
6. mixin, propType

#### React生命周期
1. 一个组件是一个状态机
2. 生命周期分为三个部分
   + Mounting：getInitialState，componentWillMount，Render，componentDidMount。在ajax中使用方法中一般写到componentDidMount里面
   + Updating：componentWillReceiveProps，shouldComponentUpdate，componentWillUpdate，componentDidUpdate
   + Unmounting： componentWillUnMount

## 第三课时： React同构实践：
#### 同构应用
1. 让Server端和Client端共享逻辑代码  
   model、action、router、template
2. Template同构渲染
   + 传统渲染方式：前后端有重复的逻辑，有时候只更改一方导致bug
   + 富交互SPA应用渲染
      + 优点：用户体验及交互好
      + 缺点：对SEO不友好；首次加载会存在较长时间白屏；一些旧浏览器可能渲染不出内容；

   + React解决了以上问题
      + 客户端渲染：React.render
      + 服务器端方法：React.renderToString，参数只传组件，不用告诉结点。

   + 让React跑在server端：
   + 配置webpack指定三个：入口文件；编译到哪，输出文件名是什么；希望用什么loader（babel-loader）编译这个文件。然后执行webpack就可以将JSX文件编译到静态目录里。
3. 将react渲染出的内容封装到html中
  + 第一步，将React组件，如变量名为appHTML，放到一个div中$(……)；
  + 渲染的数据放到script中，type为text/template，这样浏览器会忽略该标签$（JSON.stringify（……））
  + 通过模板引擎的路径，所要请求的服务器端js文件的路径$(getJSPath（……）)
  + 过程简述：服务器端渲染出的内容，客户端和服务器端需要的数据；客户端需要的js文件

4. 客户端如何启动react的数据
  + 服务器端将组件渲染成字符串
  + 客户端拿到这个组件需要的数据，再把组件渲染到结点上

5. 原理：React在客户端渲染时，如果发现页面已经被服务器端渲染好了，会先自己生成virtual dom，计算checksum，如果得到的结果和server一致，说明不需要生产出实际的DOM结点，只需要注册相应事件即可。从而使页面在客户端初次渲染时不会发生闪烁。

## 第四课时： React组件开发：
#### Filter Table
1. 开发静态版本，不用state，只用props
2. 数据放在最顶层的组件中
3. 如果它是从父级传过来的，那么它不是一个state
4. 如果它会经常改变，那么它应该是一个state
5. 如果它能通过其他state和props计算出来，那么它不是一个state
6. 分析state应该属于哪个组件（最难）
7. 构建反向数据流：

#### 总结
1. 组件细分
2. state尽可能少用
3. 单向数据流含义

## 第五课时 项目实践-----听不懂……
1. npm install --global browserify
2. flux部分：查看目录结构

## 第六课时 React内部原理简介
1. 对于数组，采用key索引比较，复杂度由n方，变成n
2. 事件系统：onChange

## 第七课时：React测试
