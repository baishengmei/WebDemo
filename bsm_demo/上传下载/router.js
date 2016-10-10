/**
 * Created by baishm on 2016/9/30.
 */
var file = require("upload.js");  //此时，route.js与file.js处于同个目录下

app.post('/fileupload', file.upload);
app.get('/download/:id', file.download);  //结合表单页面的<a>标签，里面的kkk是指该文件的id
app.get('/download/:id', file.download);  //结合表单页面的<a>标签，里面的kkk是指该文件的id