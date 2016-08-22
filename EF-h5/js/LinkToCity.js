function LinkToCity(){
    var provinces = [];
    provinces["省或直辖市"] = ["城市"];
    provinces["b.北京"] = ["城市","b.北京市"];
    provinces["s.上海"] = ["城市","s.上海市"];
    provinces["g.广东"] =["城市","g.广州市","s.深圳市","d.东莞市","f.佛山市","c.潮州市","c.从化市","h.河源市","h.惠州市","j.江门市","j.揭阳市","m.茂名市","m.梅州市","q.清远市","s.汕头市","s.汕尾市","s.韶关市","y.阳江市","y.云浮市","z.增城市","z.湛江市","z.肇庆市","z.中山市","z.珠海市"];
    provinces["c.重庆"] =["城市","c.重庆市"];
    provinces["t.天津"] =["城市","t.天津市"];
    provinces["z.浙江"] =["城市","h.杭州市","n.宁波市","h.湖州市","j.嘉兴市","j.金华市","l.丽水市","q.衢州市","s.绍兴市","t.台州市","w.温州市","x.萧山区","y.义乌市","y.余姚市","z.舟山市"];
    provinces["j.江苏"] =["城市","w.无锡市","n.南京市","c.常州市","h.淮安市","l.连云港市","n.南通市","s.宿迁市","s.苏州市","t.泰州市","x.徐州市","y.盐城市","y.扬州市","z.张家港市","z.镇江市"];
    provinces["h.湖北"] =["城市","w.武汉市","e.恩施州市","e.鄂州市","h.黄冈市","h.黄石市","j.荆门市","j.荆州市","q.潜江市","s.十堰市","s.随州市","t.天门市","x.襄樊市","x.咸宁市","x.仙桃市","x.孝感市","y.宜昌市"];
    provinces["s.陕西"] =["城市","x.西安市","a.安康市","b.宝鸡市","h.汉中市","c.潮州市","o.其他城市","s.商洛市","t.铜川市","w.渭南市","x.咸阳市","y.延安市","y.榆林市"];
    provinces["s.四川"] =["城市","c.成都市","b.巴中市","d.达州市","d.德阳市","g.广安市","g.广元市","l.乐山市","l.泸州市","m.眉山市","m.绵阳市","n.南充市","n.内江市","o.其他城市","p.攀枝花市","s.遂宁市","y.雅安市","y.宜宾市","z.自贡市","z.资阳市"];
    provinces["s.山东"] =["城市","b.滨州市","d.德州市","d.东营","h.菏泽市","n.济南市","j.济宁","l.莱芜市","l.聊城市","l.临沂市","q.青岛市","r.日照市","t.泰安市","w.潍坊市","w.威海市","y.烟台市","z.枣庄市","z.淄博市"];
    provinces["f.福建"] =["城市","f.福州市","l.龙岩市","n.南平市","n.宁德市","p.莆田市","q.泉州市","s.三明市","x.厦门市","z.漳州市"];
    provinces["h.河北"] =["城市","b.保定市","c.沧州市","c.承德市","h.邯郸市","h.衡水市","l.廊坊市","q.秦皇岛市","s.石家庄市","t.唐山市","x.邢台市","z.张家口市"];
    provinces["l.辽宁"] =["城市","a.鞍山市","b.本溪市","c.朝阳市","d.大连市","d.丹东市","f.抚顺市","f.阜新市","h.葫芦岛市","j.锦州市","l.辽阳市","p.盘锦市","s.沈阳市","t.铁岭市","y.营口市"];
    provinces["y.云南"] =["城市","b.保山市","k.昆明市","l.丽江市","l.临沧市","q.曲靖市","s.思茅市","y.玉溪市","z.昭通市"];
    provinces["a.安徽"] =["城市","a.安庆市","b.蚌埠市","b.亳州","c.巢湖市","c.池州市","c.滁州市","f.阜阳市","h.合肥市","h.淮北市","h.淮南市","h.黄山市","l.六安市","m.马鞍山市","s.宿州市","t.铜陵市","w.芜湖市","x.宣城市"];
    provinces["g.甘肃"] =["城市","b.白银市","d.定西市","j.嘉峪关市","j.金昌市","j.酒泉市","l.兰州市","l.陇南市","o.其他城市","p.平凉市","q.庆阳市","t.天水市","w.武威市","z.张掖市"];
    provinces["g.广西"] =["城市","b.百色市","b.北海市","c.崇左市","f.防城港市","g.贵港市","g.桂林市","h.河池市","h.贺州市","l.来宾市","l.柳州市","n.南宁市","q.钦州市","w.梧州市","y.玉林市"];
    provinces["g.贵州"] =["城市","a.安顺市","g.贵阳市","l.六盘水市","o.其他城市","z.遵义市"];
    provinces["h.海南"] =["城市","h.海口市","o.其他城市","s.三亚市"];
    provinces["h.湖南"] =["城市","c.常德市","c.长沙市","c.郴州市","h.衡阳市","h.怀化市","j.吉首市","l.娄底市","s.邵阳市","x.湘潭市","y.益阳市","y.永州市","y.岳阳市","z.张家界市","z.株洲市"];
    provinces["n.内蒙古"] =["城市","a.阿拉善盟","b.包头市","b.巴彦淖尔市","c.赤峰市","e.鄂尔多斯市","e.二连浩特市","h.呼和浩特市","h.呼伦贝尔市","m.满洲里市","t.通辽市","w.乌海市","w.乌兰察布市","x.锡林郭勒盟","x.兴安盟"];
    provinces["j.江西"] =["城市","f.抚州市","g.赣州市","j.吉安市","j.景德镇市","j.九江市","n.南昌市","p.萍乡市","s.上饶市","x.新余市","y.宜春市","y.鹰潭市"];
    provinces["j.吉林"] =["城市","b.白城市","b.白山市","c.长春市","j.吉林市","l.辽源市","s.四平市","s.松原市","t.通化市","y.延边州"];
    provinces["n.宁夏"] =["城市","g.固原市","s.石嘴山市","w.吴中市","y.银川市","z.中卫市"];
    provinces["q.青海"] =["城市","h.海北藏族自治州","h.海东地区","h.海南藏族自治州","h.海西蒙古族藏族自治州","o.其他城市","x.西宁市"];
    provinces["s.山西"] =["城市","c.长治市","d.大同市","j.晋城市","j.晋中市","l.临汾市","l.吕梁市","s.朔州市","t.太原市","x.忻州市","y.阳泉市","y.运城市"];
    provinces["x.新疆"] =["城市","a.阿克苏地区","a.阿勒泰地区","h.哈密地区","h.和田地区","k.克拉玛依","k.喀什地区","o.其他城市","t.塔城地区","t.吐鲁番地区","u.乌鲁木齐市","y.伊犁哈萨克自治州"];
    provinces["x.西藏"] =["城市","a.阿里地区","c.昌都地区","l.拉萨地区","l.林芝地区","n.那曲地区","r.日喀则地区","s.山南地区","x.西藏自治区"];

    return provinces;
}
function LinkToDistrict(){
    var cities = [];
    cities["b.北京"] = ["地区","d.东城区","c.昌平区","c.朝阳区","c.崇文区","d.大兴区","f.房山区","f.丰台区","h.海淀区","h.怀柔区","m.门头沟区","m.密云县","p.平谷区","s.石景山区","s.顺义区","t.通州区","w.望京区","x.西城区","x.宣武区","y.延庆县"];
    cities["s.上海"] = ["地区","h.黄浦区","j.静安区","b.宝山区","c.长宁区","c.崇明县","f.奉贤区","h.虹口区","j.嘉定区","j.金山区","l.卢湾区","m.闵行区","n.南汇区","p.浦东新区","p.普陀区","q.青浦区","s.松江区","x.徐汇区","y.杨浦区","z.闸北区"];
    cities["c.重庆"] = ["地区","b.巴南区","b.北碚区","d.大渡口区","j.江北区","j.九龙坡区","n.南岸区","s.沙坪坝区","w.万州区","y.渝北区","y.渝中区","o.其他地区"];
    cities["t.天津"] = ["地区","b.天津 北辰","b.天津 滨海","d.天津 东丽","h.天津 河北","h.天津 河东","h.天津 和平","h.天津 河西","h.天津 红桥","j.天津 津南","n.天津 南开","w.天津 武清","x.天津 西青"];

    return cities;
}