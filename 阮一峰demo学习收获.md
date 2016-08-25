##### [阮一峰的入门实例教程链接](http://www.ruanyifeng.com/blog/2015/03/react.html)

-----
### 1. 模板
+ Demo13是服务器首屏渲染的例子，可以看看源码；
+ react可以在浏览器运行，也可以在服务器运行，差别不是很大；
+ 采用JSX语法，和JavaScript不兼容
+ 凡是使用JSX的地方，script标签都要加上type=“text/bable”
+ 三个库必须首先加载，react.js、react-dom.js和Browser.js。其中react.js是React的核心库，react-dom.js提供与DOM相关的功能，Browser.js作用是将JSX语法转为JavaScript语法，这一步很消耗时间，实际上线时，应该将它放到服务器完成。
+  $ babel src --out-dir build将src子目录的js文件进行语法转换，转码后的文件全部放在build子目录。

### 2. ReactDom.render（）
+ 用于将模板转成html

### 3. JSX语法
+ html以<开头，代码块以{开头

### 4. 组件
+ React.createClass方法用于生成一个组件类
+ 所有组件类有自己的render方法，用于输出组件
+ 组件类的第一个字母必须大写，否则会报错
+ 组件类只能包含一个顶层标签，否则会报错，如：

            var HelloMessage = React.createClass({
				render: function() {
    				return <h1>Hello {this.props.name}</h1>;
  				}
			});  
		这是正确的写法  
<br/>
  
            var HelloMessage = React.createClass({  
            	render: function() {  
            		return <h1>
						Hello {this.props.name}
					</h1><p>
					some text
					</p>
				}
			}
		这是错误的写法，因为包含了两个顶层标签：h1和p**  

##
+ 组件的属性可以在组件类的this.props对象上获取。
+  添加组件属性，class写成className，for属性写成htmlFor，因为class和for是JavaScript保留字

### 5. this.props.children
+ this.props对象的属性和组件的属性一一对应，有个例外是this.props.children属性，表示组件的所有子节点
+ React.Children.map来遍历子节点；
+ this.props.children值有三种情况：undefined、object、array

### 6. propTypes
+ 组件的属性可以是任意值；
+ 验证别人使用组件时，提供的参数是否符合要求，使用组件类的PropTypes属性
<pre>
propTypes: {
    title: React.PropTypes.string.isRequired,
  },说明组件类的title是必须的，且必须是字符串
</pre>
+ getDefaultProps 方法可以用来设置组件属性的默认值
<pre>
getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  }
</pre>

### 7. 获取真实的DOM节点
+ 组件并不是真实的DOM节点，而是存在于内存之中的一种数据结构，叫做虚拟DOM。当插入文档后，才会变成真正的DOM。
+ 根据React设计，所有dom变动，都现在虚拟dom上发生，然后再将实际发生变动的部分，反映在真实dom上，该算法叫做DOM diff，可极大提高网页的性能表现。
+ 从组件获取真实的DOM节点，用到ref属性
+ 举例：
<pre>
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
		……
  }
});
</pre>
+ 需要注意的是，由于this.refs.[refName]属性获取的是真实DOM，所以必须等到虚拟DOM插入文档以后，才能使用这个属性，否则会报错。所以指定Click事件，除此之外还有KeyDown、Copy、Scroll等。

### 8. this.state
+ 将组件看成一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染UI
+ getInitialState方法用于定义初始状态，也就是一个对象，这个对象可以通过this.state属性读取。
+ 当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件
+ this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。
+ 举例：
<pre>
getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      ……………………………………
    );
  }
</pre>

### 9. 表单
+ 举例：
<pre>
getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
</pre>

### 10. 组件的声明周期
+ 组件的生命周期分为三个状态：
	+ Mounting：已插入真实DOM
	+ Updating：正在被重新渲染
	+ Unmounting：已移出真实 DOM
+ React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数
<pre>
	componentWillMount()
	componentDidMount()
	componentWillUpdate(object nextProps, object nextState)
	componentDidUpdate(object prevProps, object prevState)
	componentWillUnmount()
</pre>
+ React 还提供两种特殊状态的处理函数。
<pre>
	componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
	shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
</pre>
+ style属性的写法要注意：style="opacity:{this.state.opacity};"写成：style={{opacity: this.state.opacity}}，因为 React [组件样式](https://facebook.github.io/react/tips/inline-styles.html)是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。

### 11. Ajax
+ 组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI 
+ 也可以传入promise对象