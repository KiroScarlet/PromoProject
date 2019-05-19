/**
 * 定义全局JS函数
 */
//保存后禁用按钮，防止重复提交
function Disabled($this,btn_text){
	$this.attr('disabled','disabled').text(btn_text).val(btn_text);
}
//设置按钮为可用状态
function Enabled($this,btn_text){
	$this.removeAttr('disabled').empty().text(btn_text).val(btn_text);
}

//loading
function Loading($this,bgColor){
	var $loading=$('<div class="loading">'+
						'<div class="loading1"></div>'+
						'<div class="loading2"></div>'+
						'<div class="loading3"></div>'+
					'</div>');
	$this.append($loading);
	arguments[1]&&arguments[1]!=''?$this.find('.loading div').css('background',bgColor):'';
}


/* 查看是否拥有该权限 */
function hasAuth(DropDownArray,authList_array){
	var returnValue=[];
	for(var j=0;j<DropDownArray.length;j++){
		for(var i=0;i<authList_array.length;i++){
			/* 判断是否拥有该权限  */
			var flag =	authList_array[i].module===DropDownArray[j].module && 
					authList_array[i].controller===DropDownArray[j].controller &&
					authList_array[i].action===DropDownArray[j].action &&
					authList_array[i].method===DropDownArray[j].method;
			if(flag){
				var returnValue_json={};
				returnValue_json.index=j;
				returnValue_json.menuItem=DropDownArray[j].menuItem;
				returnValue_json.link='/'+authList_array[i].controller+'/'+authList_array[i].action;
				returnValue.push(returnValue_json);
				break;
			}
		}
	}
	return returnValue;
}
//MODAL
function ModalOperation(showModalElem){
	/* 显示Modal框  */
	showModalElem.click(function(){
		$('.modal,.modal-background').show();
	});
	/* 隐藏Modal框  */
	$(document).on('click','.modal-background,.modal-footer input[type="reset"],.modal .close-btn',function(){
		$('.input-area').val('');
		$('.modal,.modal-background').hide();
	});
}

//图片在容器居中显示
function centerCropImg(url,$container){
	/* 取图片正中间部分 */
	var img=new Image();
	img.src=url;
	img.onload=function(){
		/* 容器宽高 */
		var containerHeight=$container.height(),containerWidth=$container.width();
		/* 容器比例 */
		var containerScale=containerWidth/containerHeight;
		/* 等比例缩放后图片宽高 */
		var imgHeight,imgWidth;
		/* 横图 */
		if(img.width/img.height>containerScale){
			imgWidth=img.width/img.height*containerHeight;
			var _left=(imgWidth-containerWidth)/2;
			$container.find('img').height(containerHeight).css({
				'left':'-'+_left+'px'
			});
		}
		/* 竖图 */
		else{
			imgHeight=img.height/img.width*containerWidth;
			var _top=(imgHeight-containerHeight)/2;
			$container.find('img').width(containerWidth).css({
				'top':'-'+_top+'px'
			});
		}
	}
}

//时间戳转换日期
function timeStampToDateString(ts){
	var datetime=new Date(parseInt(ts)*1000);
	var year=datetime.getFullYear();
	var month=datetime.getMonth()+1;
	var date=datetime.getDate();
	var dateString=year+'-'+month+'-'+date;
	return dateString;
}
//JSON数组排序函数
function getSortFun(order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}

function lazyload(){
	var $unload=$('.shot-image .unload');
	for(var i=0;i<$unload.length;i++){
		var top=$(window).scrollTop(),height=$(window).height();
		/* 未加载的图片元素进入可视区域  */
		if(top+height>$unload.eq(i).offset().top){
			var url=$unload.eq(i).data('url');
			$unload.eq(i).removeClass('unload').addClass('loaded').attr('src',url).fadeIn(500);
		}
	}
}