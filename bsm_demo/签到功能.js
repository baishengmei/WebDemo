/**
 * Created by baishm on 2016/9/20.
 */
//创建一个IE窗口
var ie = new ActiveXObject("InternetExplorer.Application");
//显示
ie.visible = true;

//导向http://www.scriptlover.com/wish/input.asp
ie.navigate("http://www.baidu.com/gaoji/advanced.html");
//等待加载完毕
while(ie.busy){WScript.sleep(100);}

//获得window和document和表单的引用
var document = ie.document;
var window = document.parentWindow;
var form = document.forms[0];

//接下来向表单填数据，这里的数据是硬编码到程序里，你完全可以用JS读取SQL SERVER、ACCESS甚至以数据库形式读取EXCEL文件的内容
//关于如何确定表单的域的名称，最好的方法是用FIREFOX的FIREBUG插件

form.q1.value = "漂泊云间";
//暂停，以便看到效果
WScript.sleep(1000);

//rn是下拉列表，我们随机选取一个
form.rn.value = form.rn.options[Math.floor(Math.random() * form.rn.options.length)].value;
//暂停，以便看到效果
WScript.sleep(1000);

//lm依然
form.lm.value = form.lm.options[Math.floor(Math.random() * form.lm.options.length)].value;
//暂停，以便看到效果
WScript.sleep(1000);

//ct是单选框,随便选中一个
form.ct[Math.floor(Math.random() * form.ct.length)].checked = 1;
//暂停，以便看到效果
WScript.sleep(1000);

//ft是下拉列表，我们随机选取一个
form.ft.value = form.ft.options[Math.floor(Math.random() * form.ft.options.length)].value;
//暂停，以便看到效果
WScript.sleep(1000);

//q5依然
form.q5[Math.floor(Math.random() * form.q5.length)].checked = 1;
//暂停，以便看到效果
WScript.sleep(1000);


//改成当前页提交
form.target = "_self";
//暂停，以便看到效果
WScript.sleep(2000);

//提交，有两种办法，form.submit和提交按钮的click方法
form.elements[1].click();