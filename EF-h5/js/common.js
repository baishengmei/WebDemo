//关联省份和城市
var provinces = LinkToCity();
function changeProvince()
{
    var prov = document.getElementById("state").value;
    var city =document.getElementById("city");
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
(function(){
    var state = document.getElementById("state");
    for(var index in provinces)
    {
        state.options.add(new Option(index,index));
    }
})();
