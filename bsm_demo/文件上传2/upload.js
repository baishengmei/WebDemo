/**
 * Created by baishm on 2016/9/30.
 */
var request = require('request');
var fs = require('fs');
var Iconv = require('iconv').Iconv;
//测试了pdf、jpg都可以正常显示，csv还未测试通过。
/*
 * url 网络文件地址
 * filename 文件名
 * callback 回调函数
 */
//new
var iconv = new Iconv('UTF-8', 'GBK');
//new
function downloadFile(uri,filename,callback){

    //new
    stream.write(new Buffer('\xEF\xBB\xBF','binary'));
    var filename = iconv.convert(filename)
    //new
    var stream = fs.createWriteStream(filename);
    console.log("stream:"+stream);
    request(uri).pipe(stream).on('close', callback);
}

var fileUrl  = 'http://a.youdao.com/zhixuan/adfinance.s?operation=csv';
var filename = 'aaa.csv';
downloadFile(fileUrl,filename,function(){
    console.log(filename+'下载完毕');
});