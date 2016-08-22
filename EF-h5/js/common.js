//关联省份和城市
var provinces = LinkToCity();
var cities = LinkToDistrict();

function changeProvince()
{
    var divDistrict = document.getElementById("divDistrict");
    var prov = document.getElementById("state").value;
    var city =document.getElementById("city");
    divDistrict.style.display = "none";
    city.options.length =0;
    if(prov !== "省或直辖市"){

        city.style.display = "";
        for(var i in provinces[prov])
        {
            city.options.add(new Option(provinces[prov][i],provinces[prov][i]));
        }
    }else{
        city.style.display = "none";
    }
}

function changeCity(){
    var city =document.getElementById("city");
    var district = document.getElementById("district");
    var divDistrict = document.getElementById("divDistrict");
    //console.log("city.value:"+city.value);
    district.options.length =0;
    if(city.value !== "城市" && (city.value == "b.北京市" || city.value == "s.上海市" || city.value == "c.重庆" || city.value == "t.天津")){
        divDistrict.style.display = "";
        console.log(cities);
        for(var j in cities[city.value]){
            district.options.add(new Option(cities[city.value][j], cities[city.value][j]));
        }
    }else{
        divDistrict.style.display = "none";
    }
}

(function(){
    //关联省份和城市
    var state = document.getElementById("state");
    for(var index in provinces)
    {
        state.options.add(new Option(index, index));
    }
})();

//表单校验

//(function(){
//    //表单校验
//    var form = document.getElementById("registerForm");
//
//    form.onfocus = form.onblur = form.onclick = function(ev){
//
//        var ev = ev || window.event;
//        var target = ev.target || ev.srcElement;
//console.log(target);
//        if(target.type == "submit"){
//            console.log(form.age.value);
//            if(form.fakename.value == "" || form.age.value == "年龄" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(form.email.value))
//                || !(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(form.telephone.value)) || form.state.value == "省或直辖市" ||
//                (form.state.value !== "省或直辖市" && form.city.value == "城市") || (form.state.value !== "省或直辖市" && form.state.value !== "城市" && form.district.value == "地区")){
//
//                if(form.fakename.value == ""){
//                    form.fakename.setCustomValidity("请输入姓名");
//                }else if(form.age.value == "年龄"){
//                    form.age.setCustomValidity("请选择您的年龄");
//                }else if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(form.email.value))){
//                    form.email.setCustomValidity("请输入您的邮箱地址");
//                }else if(!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(form.telephone.value))){
//                    form.telephone.setCustomValidity("请输入有效的手机号码");
//                }else if(form.state.value == "省或直辖市"){
//                    form.state.setCustomValidity("请选择您所在的省或者直辖市");
//                }else if(form.state.value !== "省或直辖市" && form.city.value == "城市"){
//                    form.city.setCustomValidity("请选择您所在的城市");
//                }else if(form.state.value !== "省或直辖市" && form.state.value !== "城市" && form.district.value == "地区"){
//                    form.district.setCustomValidity("请选择您就近的地区");
//                }
//            }else{
//                return true;
//            }
//        }else{
//            console.log("点击的不是submit");
//            console.log(target.name);
//            //当target.type!=="submit"时
//            if(target.name == "fakename"){
//                console.log(target.value);
//                if(target.value == ""){
//                    console.log("值为空");
//                    target.setCustomValidity("请输入姓名");
//                }
//            }else if(target.name == "age"){
//                if(target.value == "年龄"){
//                    form.age.setCustomValidity("请选择您的年龄");
//                }
//            }else if(target.name == "email"){
//                if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(target.value))){
//                    target.setCustomValidity("请输入您的邮箱地址")
//                }
//            }else if(target.name == "telephone"){
//                if(!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(target.value))){
//                    target.setCustomValidity("请输入有效的手机号码");
//                }
//            }else if(target.name == "state"){
//                if(target.value == "省或直辖市"){
//                    target.setCustomValidity("请选择您所在的省或者直辖市");
//                }
//            }else if(target.name == "city"){
//                if(target.value == "城市"){
//                    target.setCustomValidity("请选择您所在的城市");
//                }
//            }else if(target.name == "district"){
//                if(target.value == "地区"){
//                    target.setCustomValidity("请选择您就近的地区");
//                }
//            }
//        }
//    }
//
//})();

