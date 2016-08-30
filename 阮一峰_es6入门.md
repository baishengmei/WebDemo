[教程链接](http://es6.ruanyifeng.com/#docs/intro#ECMAScript和JavaScript的关系)
-----------  
## 第一章：ECMAScript 6简介：
1. 各大浏览器的最新版本，对es6的支持可以看：[http://kangax.github.io/compat-table/es6/](http://kangax.github.io/compat-table/es6/)

2. 建议使用版本管理工具nvm来安装Node，可自由切换版本，但是nvm不支持windows。windows使用nvmw或者nvm-windows代替

3. 部署进度
 + 在安装：
 + 激活nvm
 + 安装node
 + 安装完成后，切换到该版本
 + 可查看es6的所有特性

4. Babel是一个es6转码器，可以将es6代码转为es5代码，从而在现有环境执行。不用担心现有环境是否支持。

5. 配置文件.babelrc: 它是babel的配置文件，存放在根目录上。使用babel的第一步是配置它。 
 + 该文件用来设置转码规则和插件：presets和plugins
 + presets字段设定转码规则：如npm install --save-dev babel-preset-es2015这是es2015转码规则，同样可以安装react规则，es7不同阶段的转码规则等。

6. 配置好.babelrc后，命令行转码babel-cli。
7. babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。
8. babel-register只会对require命令加载的文件转码，而不会对当前文件转码。
9. babel-core：调用Babel的API进行转码

## 第二章：let和const命令
###. let和var的例子
<pre>var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
</pre>

<pre>
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
</pre>


 + let只在它所在的代码块内有效
 + let无变量提升
 + 暂时性死区。只要快级作用于内存在let命令，所声明的变量就绑定这个区域，不再受外部的影响。
 + <pre>
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}  
上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。
</pre>

 + ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
 + “暂时性死区”也意味着typeof不再是一个百分之百安全的操作。如typeof x；let x；会报错。。。变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。
 + 作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。
 + <pre>typeof undeclared_variable // "undefined"</pre>
 + 比较隐藏的死区：
 + <pre>function bar(x = y, y = 2) {
  return [x, y];
}
bar(); // 报错，因为y没有声明
**function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]**
</pre>

 + 暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
 + ES6规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在ES5是很常见的，现在有了这种规定，避免此类错误就很容易了。
 + let不允许在相同作用于内重复声明同一个变量，当然也不可以使用let和var重复声明
 + <pre>function func(arg) {
  let arg; // 报错
}
function func(arg) {
  {
    let arg; // 不报错
  }
}</pre>

###. 块级作用域
 + 下面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。
 + <pre>var s = 'hello';
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i); // 5</pre>
 + let实际上为JavaScript新增了块级作用域。
 + <pre>function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}</pre>
 + ES6允许块级作用域的任意嵌套。外层作用域无法读取内层作用域的变量。
 + <pre>{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};</pre>
 + 内层作用域可以定义外层作用域的同名变量。
 + <pre>{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};</pre>
 + 块级作用域的出现，实际上使得获得广泛应用的立即执行匿名函数（IIFE）不再必要了。
 + <pre>// IIFE写法
(function () {
  var tmp = ...;
  ...
}());
// 块级作用域写法
{
  let tmp = ...;
  ...
}</pre>
+ ES6引入了块级作用域，明确允许在块级作用域之中声明函数。并且ES6规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。ES5严格模式会报错。
+ <pre>// ES6严格模式
'use strict';
if (true) {
  function f() {}
}
// 不报错</pre>
 + 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
 + ES6的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。

### const命令
 + const声明一个只读的常量。一旦声明，常量的值就不能改变。一旦声明变量，就必须立即初始化，不能留到以后赋值。
 + const的作用域与let命令相同：只在声明所在的块级作用域内有效。
 + 和let一样，必须先声明
 + 和let一样，不能重复声明
 + 对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。
 + <pre>const foo = {};
foo.prop = 123;
foo.prop
// 123
foo = {}; // TypeError: "foo" is read-only
常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。</pre>
 + 如果真的想将对象冻结，应该使用Object.freeze方法。
 + <pre>const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;</pre>
 + 除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。
 + <pre>var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};</pre>
 + ES5只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6一共有6种声明变量的方法。

### 全局对象的属性
 + ES6一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是全局对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。也就是说，从ES6开始，全局变量将逐步与全局对象的属性脱钩。


## 第三章
### 数组的解构赋值
+ ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
+ 模式匹配
+ <pre>let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3</pre>
<pre>
let [ , , third] = ["foo", "bar", "baz"];
third // "baz"</pre><pre>
let [x, , y] = [1, 2, 3];
x // 1
y // 3</pre><pre>
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]</pre><pre>
let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []</pre>

+ 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
+ <pre>
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
</pre>
+ 解构赋值不仅适用于var命令，也适用于let和const命令。
+ 对于Set结构，也可以使用数组的解构赋值。
+ <pre>let [x, y, z] = new Set(["a", "b", "c"]);
x // "a"</pre>

+ ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
+ 如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。
+ <pre>var [foo = true] = [];
foo // true
[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
var [x = 1] = [undefined];
x // 1
var [x = 1] = [null];
x // null
</pre>
### 对象的解构赋值
+ 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
+ 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
+ <pre>var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
上面代码中，真正被赋值的是变量baz，而不是模式foo。</pre>
+ let命令下面一行的圆括号是必须的，否则会报错。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。
+ <pre>let foo;
({foo} = {foo: 1}); // 成功
let baz;
({bar: baz} = {bar: 1}); // 成功</pre>
<pre>let foo;
let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"

let baz;
let {bar: baz} = {bar: 1}; // SyntaxError: Duplicate declaration "baz"</pre>

+ 嵌套赋值的语句
+ <pre>let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop:123}
arr // [true]</pre>

+ 默认值设置同数组解构赋值
+ 解构赋值允许，等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。虽然毫无意义，但是语法是合法的，可以执行。
+ <pre>({} = [true, false]);
({} = 'abc');
({} = []);</pre>
+ let { log, sin, cos } = Math;将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。
+ 对数组进行对象属性的解构：
+ <pre>var arr = [1, 2, 3];
var {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3</pre>

### 字符串的解构赋值
+ 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
+ <pre>let {length : len} = 'hello';
len // 5</pre>

### 数值和布尔值的解构赋值
+ 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
+ <pre>let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true</pre>
+ 解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

### 函数参数的解构赋值
+ 函数的参数也可以使用解构赋值。
+ 函数参数的解构也可以使用默认值。function move({x = 0, y = 0} = {}) {}
+ <pre>function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]</pre>
+ <pre>function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。</pre>
+ <pre>[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]</pre>

### 圆括号问题
+ ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
+ 变量声明语句中，不能带有圆括号。
+ 函数参数中，模式不能带有圆括号。
+ 赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
+ 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

### 用途
+ 交换变量的值
+ 从函数返回多个值
+ 函数参数的定义
+ 提取JSON数据
+ 函数参数的默认值
+ 遍历Map结构
+ <pre>var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}</pre>
+ 输入模块的指定方法

## 第四章：字符串的扩展
### 字符的Unicode表示法 
+ JavaScript允许采用\uxxxx形式表示一个字符，其中“xxxx”表示字符的码点。
+ ES6对这一点做出了改进，只要将码点放入大括号，就能正确解读字符。
+ 大括号表示法与四字节的UTF-16编码是等价的。
+ JavaScript共有6种方法可以表示一个字符。
+ <pre>'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true</pre>
### codePointAt() 
+ JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。
+ 对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。
+ ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。
+ charAt，，，，charCodeAt，，，，codePointAt
### String.fromCodePoint()
### 字符串的遍历器接口
+ ES6为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
+ 除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
### at（）
+ ES5对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。
+ <pre>'abc'.at(0) // "a"
'吉'.at(0) // "吉"</pre>
### normalize()
+ 许多欧洲语言有语调符号和重音符合。为了表示它们，Unicode提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。
+ 这两种表示方法，在视觉和语义上都等价，但是JavaScript不能识别。
+ <pre>'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2</pre>
### includes(), startsWith(), endsWith() § 
+ 传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。
   + includes()：返回布尔值，表示是否找到了参数字符串。
   + startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
   + endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
### repeat() ：返回一个新字符串，表示将原字符串重复n次。
+ 参数是小数，会被取整；
+ 如果是负数或者infinity会报错。
+ 参数NaN等同于0。
### padStart()，padEnd()
+ ES7推出了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart用于头部补全，padEnd用于尾部补全。
+ <pre>'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'</pre>
### 模板字符串
+ 举例：
+ <pre>$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);</pre>
+ 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
### 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。 
### 标签模板
+ 标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
### String.raw() 
+ ES6还为原生的String对象，提供了一个raw方法。
+ 代码如下：
+ <pre>String.raw = function (strings, ...values) {
  var output = "";
  for (var index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}</pre>

## 第五章： 正则的扩展
### RegExp构造函数 
+ es5中：
+ <pre>var regex = new RegExp('xyz', 'i');
+ var regex = new RegExp(/xyz/i);
+ // 等价于
var regex = /xyz/i;</pre>
+ es6中，修正：
+ <pre>new RegExp(/abc/ig, 'i').flags</pre>

### 字符串的正则方法
+ 字符串对象共有4个方法，可以使用正则表达式：match()、replace()、search()和split()。
+ ES6将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。
+ <pre>String.prototype.match 调用 RegExp.prototype[Symbol.match]
String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
String.prototype.search 调用 RegExp.prototype[Symbol.search]
String.prototype.split 调用 RegExp.prototype[Symbol.split]</pre>
### u修饰符 
+ 点字符：/^.$/u.test(s) // true
+ Unicode字符表示法：ES6新增了使用大括号表示Unicode字符，这种表示法在正则表达式中必须加上u修饰符，才能识别
+ 量词
+ 预定义模式
+ i修饰符
### y修饰符
+ 除了u修饰符，ES6还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。
### sticky属性 :会返回正则表达式的修饰符
+ <pre>// ES5的source属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6的flags属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'</pre>
### RegExp.escape() 
+ <pre>RegExp.escape('Buy it. use it. break it. fix it.');
// "Buy it\. use it\. break it\. fix it\."</pre>
### 后行断言
+ JavaScript语言的正则表达式，只支持先行断言（lookahead）和先行否定断言（negative lookahead），不支持后行断言（lookbehind）和后行否定断言（negative lookbehind）。
+ 先行断言和先行否定断言
+ <pre>/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]</pre>
+ 后行断言和后行否定断言
+ <pre>/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
/(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]</pre>
+ 
## 第六章：数值的扩展
### 二进制和八进制表示法
+ ES6提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
### Number.isFinite(), Number.isNaN()
+ Number.isFinite()用来检查一个数值是否为有限的（finite）。
+ Number.isNaN()用来检查一个值是否为NaN。
### Number.parseInt(), Number.parseFloat()
+ ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
### Number.isInteger()
+ Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
### Number.EPSILON 
+ ES6在Number对象上面，新增一个极小的常量Number.EPSILON。Number.EPSILON.toFixed(20)
### 安全整数和Number.isSafeInteger() 
+ ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
+ Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
### Math对象的扩展
+ ES6在Math对象上新增了17个与数学相关的方法。所有这些方法都是静态方法，只能在Math对象上调用。
+ Math.trunc方法用于去除一个数的小数部分，返回整数部分。
  + 对于非数值，Math.trunc内部使用Number方法将其先转为数值。
  + 对于空值和无法截取整数的值，返回NaN。
  + 对于没有部署这个方法的环境，可以用下面的代码模拟。
  + <pre>Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};</pre>
+ Math.sign方法用来判断一个数到底是正数、负数、还是零。返回+1,-1,0,-0,NaN
  +  <pre>Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};</pre>
+ Math.cbrt方法用于计算一个数的立方根。
+ Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0。
+ Math.imul方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。
+ Math.fround方法返回一个数的单精度浮点数形式。
+ Math.hypot方法返回所有参数的平方和的平方根。

### 对数方法：ES6新增了4个对数相关的方法：
+ Math.expm1(x)返回ex - 1，即Math.exp(x) - 1。
+ Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
+ Math.log10(x)返回以10为底的x的对数。如果x小于0，则返回NaN。
+ Math.log2(x)返回以2为底的x的对数。如果x小于0，则返回NaN。
### 三角函数方法
+ 新增6个三角函数方法：
+ <pre>Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）</pre>
### 指数运算符
+ ES7新增了一个指数运算符（**），目前Babel转码器已经支持。
+ 
## 第七章 数组的扩展 
### Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
+ 举例说明：
+ <pre>let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']</pre>
+ Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。
### Array.of方法用于将一组值，转换为数组。
### 数组实例的copyWithin() 
+ 数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
+ 接收三个参数：target必需，start可选，end可选
+ [1, 2, 3, 4, 5].copyWithin(0, 3)// [4, 5, 3, 4, 5]
### 数组实例的find()和findIndex() 
+ 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数
+ <pre>[1, 4, -5, 10].find((n) => n < 0)
// -5</pre>
+ 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
+ <pre>[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2</pre>
### 数组实例的fill()  
+ <pre>['a', 'b', 'c'].fill(7)
// [7, 7, 7]
new Array(3).fill(7)
// [7, 7, 7]
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
</pre>
### 数组实例的entries()，keys()和values() 
+ 用于遍历数组
+ 它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
### 数组实例的includes()
+ Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。
+ <pre>[1, 2, 3].includes(2);     // true
+ [NaN].indexOf(NaN)
// -1
[NaN].includes(NaN)
// true</pre>
+ Map和Set数据结构有一个has方法，需要注意与includes区分。
  + Map结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
  + Set结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。
### 数组的空位
+ 数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。Array(3) // [, , ,]
+ 空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
+ <pre>0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false</pre>
+ ES6则是明确将空位转为undefined。
  + 除了下面例子中这些，还包括entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。 
  +  <pre>Array.from(['a',,'b'])
// [ "a", undefined, "b" ]</pre>
  +  <pre>[...['a',,'b']]
// [ "a", undefined, "b" ]</pre>
  +  <pre>[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]</pre>
  +  <pre>new Array(3).fill('a') // ["a","a","a"]</pre>
  +  <pre>let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1</pre>
  
## 第八章 函数的扩展
### *函数的length属性
+ 函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
+ <pre>(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2</pre>
### 作用域
+ 如果参数默认值是一个变量，则该变量所处的作用域，与其他变量的作用域规则是一样的，即先是当前函数的作用域，然后才是全局作用域。
+ <pre>var x = 1;
function foo(x = x) {
  // ...
}
foo() // ReferenceError: x is not defined
上面代码中，函数foo的参数x的默认值也是x。这时，默认值x的作用域是函数作用域，而不是全局作用域。由于在函数作用域中，存在变量x，但是默认值在x赋值之前先执行了，所以这时属于暂时性死区（参见《let和const命令》一章），任何对x的操作都会报错。</pre>
+ 如果参数的默认值是一个函数，该函数的作用域是其声明时所在的作用域。请看下面的例子。
+ 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
+ <pre>function throwIfMissing() {
  throw new Error('Missing parameter');
}
function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo()
// Error: Missing parameter</pre>
### rest参数
+ ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
+ 比如排序：const sortNumbers = (...numbers) => numbers.sort();
+ 注意，rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ 
+ <pre></pre>