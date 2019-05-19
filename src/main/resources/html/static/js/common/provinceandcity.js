function getProvince(){
    var province = ["上海"];
	return province;
}

function getCityByProvince(province){
	var arr = getProvinceAndCity();
	return arr[province];
}

function getProvinceAndCity(){
	var arr = {"上海": ["上海"]};
    return arr;
}

function getDistrictByCity(city){
	var arr = getCityAndDistrict();
	return arr[city];
}

function getCityAndDistrict(){
	var arr = {"上海": ["黄浦区","徐汇区","长宁区","静安区","普陀区","虹口区","闸北区","杨浦区","闵行区","宝山区","青浦区","松江区","嘉定区","奉贤区","金山区","浦东新区","崇明县"]};
    return arr;
}
