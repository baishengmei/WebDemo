** 这是一本书籍 **
------------------------

### 1.React只需要声明式定义各个时间点的用户界面，而无须关系在数据变化时需要更新那一部分DOM。在任何时间点，React都能够以最小的DOM修改来更新整个应用程序。
### 2. 为什么使用jsx？
+ 将javascript代码转换为更加语义化，更加有意义的标签；
+ 使用jsx语法来声明组件结构和组件流向的能力
+ 更加直观、明了、简洁；
+ ……

### 3. 往jsx中加入if语句会渲染出无效的javascript,解决办法是：
+ 使用三目运算符
+ 设置一个变量并在属性中引用它
+ 将逻辑转化到函数中
+ 使用&&运算符
### 4.非DOM属性，只在jsx中存在
+ key键
+ ref引用：允许父组件在render方法之外保持对子组件的一个引用。通过引用获取到的这个对象被称为支持实例。并不是真的DOM，而是react在需要时用来创建DOM的一个描述对象。可以用过this.refs.myInput.getDOMNode()访问真是的DOM节点。
+ dangerouslySetInnerHTML设置原始的HTML：

### 5. 注释：
+ 作为子节点：子节点形式的注释只需要简单地包裹在花括号内即可，并且可以跨越多行；  
> 
    <div>
		{/* a comment about this input  
			with multiple lines */}
		<input  name="email" placeholder="Email Address" />
	</div>

+ 作为内联属性；内联注释有两种形式，一种多行注释,/**/; 单行注释//

### 6. 特殊属性
+ label标签中的for写成htmlFor；
+ class写成className

### 7. 样式，驼峰是：borderColor：‘#999’；
### 8. 实例化：当每个新的组件被创建、首次渲染时：
+ getDefaultProps对于组件来说，该方法只会被调用一次。对于那些没有被父辈组件指定props属性的新建实例来说，这个方法返回的对象可用于为实例设置默认的props值；
+ getInitialState对于组件的每个实例来说这个方法的调用次数只有一次。每次实例创建时该方法都会被调用一次。
+ componentWillMount在render方法调用前可以修改组件state的最后一次机会。
+ render
+ componentDidMount在render成功调用后，且真实的DOM已经被渲染之后。在内部可以通过this.getDOMNode（）方法访问到它。


### 9. 获取表单的dom元素
+ this.refs.autocompleteTarget.getDOMNode（）

### 10. 表单组件有两种类型：约束组件和无约束组件
+ **使用defaultValue设置input的默认值**
</input type="text" defaultValue="Hello World!" />
+ 无约束组件，比如上面的input，组件的value并非由父组件设置，而是让input自己控制自己的值
+ 无约束组件用处不大，除非可访问其值。那么为其设置ref属性，以访问DOM节点的值；
+ 无约束组件可以用在基本的无须任何验证或者输入控制的表单中
+ 约束组件的模式与React其他类型组件的模式一直。表单组件的状态交由React组件控制，状态值被存储在react组建的state中。
+ event.target.value访问约束组件的值的最简单方式之一。
+ textarea标签接收value和defaultValue
  + 约束类型：</textarea value={this.state.helloTo} onChange={this.handleChange}/>
  + 非约束的：</textarea defaultValue=“hello world”/>
+ select标签接收value和defaultValue来设置已选项
+ 支持多选select，需要给value和defaultValue传递一个数组，如：defaultValue={["A","B"]},**当使用可多选的select时，select组件的值在选项被选择时不会更新，只有选项的selected属性会发生变化。可以使用ref或者event.target来访问选项，检查是否被选中**
+ 复选框和单选框的非约束类型中使用defaultChecked，约束类型中使用checked={this.state.checked}
+ **表单中的name的作用：**
  + name属性可以让第三方表单序列化类库在React中正常工作；
  + 对于仍然使用传统提交方式的表单来说，name属性时必须的；
  + 在用户的浏览器中，name被用在自动填写常用信息中，比如用户地址等；
  + 对于非约束的单选框组件来讲，name是必要的，它可作为这些组件分组的依据，确保在同一时刻，同一个表单中拥有同样name的单选框只有一个可以被选中。如果不使用name属性，这一行为可以使用约束的单选框实现；
+ 表单域聚焦的方法：
  + 为input添加autoFoucs=“true”；
  + 调用DOMNode的focus()方法；
+ placeholder可以用来显示输入示例或者作为没有数据输入时的默认值。有一种常见的误用就是在其中显示验证提示，当用户输入时验证提示就消失了，非常不好，应该将验证提示显示到输入框旁边，或者验证规则没有满足时弹出来。