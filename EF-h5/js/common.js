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

        city.parentNode.style.display = "";
        for(var i in provinces[prov])
        {
            city.options.add(new Option(provinces[prov][i],provinces[prov][i]));
        }
    }else{
        city.parentNode.style.display = "none";
    }
}

function changeCity(){
    var city =document.getElementById("city");
    var district = document.getElementById("district");
    var divDistrict = document.getElementById("divDistrict");
    district.options.length =0;
    if(city.value !== "城市" && (city.value == "b.北京市" || city.value == "s.上海市" || city.value == "c.重庆市" || city.value == "t.天津市")){
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

//表单校验
    var form = document.getElementById("registerForm");

    function validateInput(ele, errorMsg){
        ele.oninput = function(){
            ele.setCustomValidity("");
        };
        ele.oninvalid = function(){
            ele.setCustomValidity(errorMsg)
        };
    }
    function execValiInput(){
        validateInput(form.fakename, "请输入姓名");
        validateInput(form.email, "请输入您的邮箱地址");
        validateInput(form.telephone, "请输入有效的手机号码");
    }
    form.onclick = function(ev){
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        execValiInput();

        if(target.type == "submit"){
            if(form.age.value == "年龄"){
                console.log(form.age);
                form.age.setCustomValidity("请选择您的年龄");
            }else{
                form.age.setCustomValidity("");
            }

            if(form.state.value == "省或直辖市"){
                form.state.setCustomValidity("请选择您所在的省或者直辖市");
            }else{
                form.state.setCustomValidity("");
            }

            if(form.state.value !== "省或直辖市" && form.city.value == "城市"){
                form.city.setCustomValidity("请选择您所在的城市");
            }else{
                form.city.setCustomValidity("");
            }

            if(form.state.value !== "省或直辖市" && form.city.value !== "城市" && form.district.value == "地区"){
                form.district.setCustomValidity("请选择您就近的地区");
            }else{
                form.district.setCustomValidity("");
            }
        }

    };

// 平滑滚动的锚点效果
    var feelNow = document.getElementById("feelNow");
    var v_form = document.getElementById("v-form");
    var v_getit_top = document.getElementById("v-getit-top");

    feelNow.onclick = function(){
        slideup(feelNow, v_form,  800);
    };
    v_getit_top.onclick = function(){
        slideup(v_getit_top, v_form, 300)
    }
})();





