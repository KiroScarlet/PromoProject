/**
 * screenshothover.js 
 * each file using screenshots must include this file
 */
/* hover */
$(document).on('mouseenter','.shot .shot-image',function(){
	$(this).addClass('shot-image-hover');
	$(this).find('.cover').addClass('cover-hover');
	$(this).find('.actions').fadeIn(500).addClass('actions-hover');
});
$(document).on('mouseleave','.shot .shot-image',function(){
	$(this).removeClass('shot-image-hover');
	$(this).find('.cover').removeClass('cover-hover');
	$(this).find('.actions').fadeOut(500).removeClass('actions-hover');
});
/* like */
$(document).on('click','.actions',function(){
	if(!$.isEmptyObject(currentUserInfo)){
		$(this).find('.iconfont').toggleClass('is-hidden');
	}
});

function like(e,id){
	if($.isEmptyObject(currentUserInfo)){
		alert("请先登录");
	}else{
  		var id = $(e).attr("id");
		$.ajax( {    
		    url:'/screenshots/likescreenshot',
		    data:{    
				screenshot_id : id   
		    },    
		    type:'post', 
		    dataType:'json',    
		    success:function(data) {    
	            //alert("操作成功！");
	            e.setAttribute("onclick", "unlike(this,"+id+")");
	            if($(e).find('.unlike').hasClass('is-hidden')){
		          	$(e).find('.iconfont').toggleClass('is-hidden');
	            }
		     },    
		     error : function() {        
	          	//alert("操作失败！");    
	            if($(e).find('.like').hasClass('is-hidden')){
		          	$(e).find('.iconfont').toggleClass('is-hidden');
	            }
	          	e.setAttribute("onclick", "like(this,"+id+")");
	            if($(e).find('.liked').hasClass('is-hidden')){
		          	$(e).find('.iconfont').toggleClass('is-hidden');
	            }
		     }    
		});
	}
}
function unlike(e,id){
	if($.isEmptyObject(currentUserInfo)){
		alert("请先登录");
	}else{
  		var id = $(e).attr("id");
		$.ajax( {    
		    url:'/screenshots/dislikescreenshot',
		    data:{    
				screenshot_id : id   
		    },    
		    type:'post',
		    dataType:'json',    
		    success:function(data) {    
	            //alert("操作成功！");  
	            e.setAttribute("onclick", "like(this,"+id+")");  
	            if($(e).find('.liked').hasClass('is-hidden')){
		          	$(e).find('.iconfont').toggleClass('is-hidden');
	            }
		     },    
		     error : function() {        
				//alert("操作失败！");    
	            if($(e).find('.unlike').hasClass('is-hidden')){
		          	$(e).find('.iconfont').toggleClass('is-hidden');
	            }
	          	e.setAttribute("onclick", "unlike(this,"+id+")");
		     }    
		});
	}
}
function detaillike(e,id){
	if($.isEmptyObject(currentUserInfo)){
		alert("请先登录");
	}else{
		var s = e.getElementsByTagName('span')[0].innerHTML;
		e.getElementsByTagName('span')[0].innerHTML = parseInt(s)+1;
		e.getElementsByTagName('i')[0].innerHTML = "&#xe606;";
		e.onclick=function(){};
  		var id = $(e).attr("id");
		$.ajax( {    
		    url:'/screenshots/likescreenshot',
		    data:{    
				screenshot_id : id   
		    },    
		    type:'post', 
		    dataType:'json',    
		    success:function(data) {    
	            //alert("操作成功！");
	            e.setAttribute("onclick", "detailunlike(this,"+id+")");
            	e.getElementsByTagName('i')[0].innerHTML = "&#xe606;";
		     },    
		     error : function() {        
	          	//alert("操作失败！");    
	          	e.setAttribute("onclick", "detaillike(this,"+id+")");
            	e.getElementsByTagName('i')[0].innerHTML = "&#xe607;";
        		e.getElementsByTagName('span')[0].innerHTML = parseInt(s)-2;
		     }    
		});
	}
}
function detailunlike(e,id){
	if($.isEmptyObject(currentUserInfo)){
		alert("请先登录");
	}else{
		var s = e.getElementsByTagName('span')[0].innerHTML;
		e.getElementsByTagName('span')[0].innerHTML = parseInt(s)-1;
		e.getElementsByTagName('i')[0].innerHTML = "&#xe607;";
		e.onclick=function(){};
  		var id = $(e).attr("id");
		$.ajax( {
		    url:'/screenshots/dislikescreenshot',
		    data:{    
				screenshot_id : id   
		    },    
		    type:'post',
		    dataType:'json',    
		    success:function(data) {    
	            //alert("操作成功！");  
	            e.setAttribute("onclick", "detaillike(this,"+id+")");  
	    		e.getElementsByTagName('i')[0].innerHTML = "&#xe607;";
		     },    
		     error : function() {        
				//alert("操作失败！");
	          	e.setAttribute("onclick", "detailunlike(this,"+id+")");
            	e.getElementsByTagName('i')[0].innerHTML = "&#xe606;";
	    		e.getElementsByTagName('span')[0].innerHTML = parseInt(s)+2;
		     }    
		});
	}
}
function cleanMarksStyle(){/* 清除截图下面每行标签的最后一个, */
	var list = document.getElementsByName('screenshot-mark-container');
	for(var k=0;k<list.length;k++){
		var tempList = list[k].getElementsByTagName('span');
		if(tempList.length>0){
			var lastSpan = tempList[tempList.length-1];
			lastSpan.parentNode.removeChild(lastSpan);
		}
	}
}