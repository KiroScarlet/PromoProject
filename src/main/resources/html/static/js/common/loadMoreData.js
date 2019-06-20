/**
 * ajax load more data
 */

/**
 * 加载更多(供index&标签详情使用)
 */
function loadData(params){
	/* 打开页面首次加载数据 */	
	var returnJson={};
	getReturnJson(returnJson,params);
	
	/* 点击加载更多  */
	$('.loadMore').click(function(){
		/* 正常加载数据 */
		if(returnJson.status===0){
			params.page++;
			getReturnJson(returnJson,params);
		}
		/* 没有更多数据 */
		else if(returnJson.status===1){
			$('.loadTips').text('没有更多数据').stop().fadeIn(500).fadeOut(1500);
		}
		/* 加载数据异常,重试 */
		else{
			getReturnJson(returnJson,params);
		}
	});
}

//获取ajax的success or error回调函数返回的JSON
function getReturnJson(returnJson,params){
	Disabled($('.loadMore'),'');
	Loading($('.loadMore'));
	$.when(getScreenShotList(params.url,params.page))
	.done(function(data){
		returnJson.status=data.status;
		returnJson.msg=data.msg;
	})
	.fail(function(data){
		returnJson.status=data.status;
		returnJson.msg=data.msg;
	});
}

//获取ScreenShotList
/* 加载更多(供index&标签详情使用) */ 
function getScreenShotList(url,page){
	var returnJson={};	
	var defer=$.Deferred();
	
	/* ajax请求获取数据 */
	$.ajax({
		type:"GET",
		url:url,
		dataType:'json',
		data:{
			page:page
		},
		contentType : 'application/json',
		success:function(data,status){
			console.log(status);
			console.log('screenshots:'+data);
			//获取json数据不为空
			if(data.content.length>0){
				/* 遍历screenshorts */
				$.each(data.content,function(key,value){
					$('.shot-container').append(
						'<div class="shot third column" id="screenshot'+value.id+'" data-application="">'+
							'<div class="shot-image">'+
								'<div class="actions">'+
								'</div>'+
								'<img src="http://www.placehold.it/286x508/EFEFEF/AAAAAA&text=egggo.cn" data-url="'+value.pic.mediumFileUrl+'" class="unload"/>'+
								'<div class="cover"></div>'+
							'</div>'+
							'<div class="shot-info">'+
								'<div class="text-overflow"><a class="two-thirds dark-gray text-align-left" href="/applications/get/'+value.application.id+'" target="_blank">'+value.application.name+'</a></div>'+
								'<div class="third text-align-right fr"><i class="iconfont like-count inline-block">&#xe606;</i><h6>'+value.likeCount+'</h6></div>'+
								'<div id="'+value.id+'" class="mark-container light-gray" name="screenshot-mark-container">'+
									'<h6 class="text-overflow">'+
									'</h6>'+
								'</div>'+
							'</div>'+
						'</div>'		
					);
					var marks=[],screenShotContents=[],application={};
					
					/* LikeOrNot */
					if(value.isLiked===0){
						$('#screenshot'+value.id).find('.actions').append(
							'<a class="btn-like text-align-center" id="'+value.id+'" onclick="like(this,'+value.id+')">'+
								'<i class="iconfont unlike inline-block is-hidden">&#xe606;</i>'+
								'<i class="iconfont liked inline-block">&#xe607;</i>'+	
							'</a>'
						);
					}
					else{
						$('#screenshot'+value.id).find('.actions').append(
							'<a class="btn-like text-align-center" id="'+value.id+'" onclick="unlike(this,'+value.id+')">'+
								'<i class="iconfont unlike inline-block">&#xe606;</i>'+
								'<i class="iconfont liked inline-block is-hidden">&#xe607;</i>'+
							'</a>'
						);
					}
					
					/* 遍历marks */
					$.each(value.marks,function(k,v){
						$('#screenshot'+value.id).find('.mark-container').find('.text-overflow').append(
								'<a href="/screenshots/searchscreenshot?search='+v.name+'" target="_blank">'+v.name+'</a>'+
								'<span> , </span>'
						);
						marks.push({
							id:v.id,
							name:v.name
						});
					});
					/* 遍历ScreenshotsContent */
					$.each(value.screenShotContents,function(k,v){
						screenShotContents.push({
							type:v.type,
							url:v.pic.mediumFileUrl+'&method=attachment'
						});
					});
					//浏览图片Modal需要的数据					
					var application={
						screenShotId:value.id,
						pic:value.pic.originFileUrl,
						appVersion:value.appVersion,
						likeCount:value.likeCount,
						applicationName:value.application.name,
						applicationIcon:value.application.icon.thumbFileUrl,
						updatedTime:value.createdAt,
						marks:marks,
						screenShotContents:screenShotContents
					};
					$('#screenshot'+value.id).data('application',application)
					.find('.mark-container').find('span:last').remove();
				});
				lazyload();
				returnJson.status=0;
				returnJson.msg='正常加载数据';
				Enabled($('.loadMore'),'加载更多');
			}
			else{
				console.log('page out of range');
				$('.loadTips').text('没有更多数据').stop().fadeIn(500).fadeOut(1500);
				returnJson.status=1;
				returnJson.msg='没有更多数据';
				Enabled($('.loadMore'),'没有更多了');
			}
			$('#footer-total-count,#resultsCount').text(data.count);
			defer.resolve(returnJson);
		},
		error:function(data,status){
			console.log(status);
			Enabled($('.loadMore'),'加载更多');
			$('.loadTips').text('加载数据异常,请重试！').stop().fadeIn(500).fadeOut(2000);
			returnJson.status=2;
			returnJson.msg='加载数据异常';
			defer.reject(returnJson);
		}
	});	
	return defer.promise();
}




/**
 *  加载更多(供搜索标签结果使用) 
 */
function loadSearchScreenshotsData(params,keyword){	
	/* 打开页面首次加载数据 */	
	var returnJson={};
	getSearchReturnJson(returnJson,params,keyword);
	
	/* 点击加载更多  */
	$('.loadMore').click(function(){
		/* 正常加载数据 */
		if(returnJson.status===0){
			params.page++;
			getSearchReturnJson(returnJson,params,keyword);
		}
		/* 没有更多数据 */
		else if(returnJson.status===1){
			$('.loadTips').text('没有更多数据').stop().fadeIn(500).fadeOut(1500);
		}
		/* 加载数据异常,重试 */
		else{
			getSearchReturnJson(returnJson,params,keyword);
		}
	});
	
}

//获取ajax的success or error回调函数返回的JSON
function getSearchReturnJson(returnJson,params,keyword){
	Disabled($('.loadMore'),'');
	Loading($('.loadMore'));
	$.when(getSearchScreenShotList(params.url,params.page,keyword))
	.done(function(data){
		returnJson.status=data.status;
		returnJson.msg=data.msg;
		lazyload();
	})
	.fail(function(data){
		returnJson.status=data.status;
		returnJson.msg=data.msg;
	});
}

//获取SearchScreenShotList
function getSearchScreenShotList(url,page,keyword){
	var returnJson={};
	var defer=$.Deferred();
	
	/* ajax请求获取数据 */
	$.ajax({
		type:"GET",
		url:url,
		dataType:'json',
		data:{
			page:page
		},
		contentType : 'application/json',
		success:function(data,status){
			console.log(status);
			console.log('screenshots:'+data);
			//获取json数据不为空
			if(data.content.length>0){
				/* 遍历screenshorts */
				$.each(data.content,function(key,value){
					$('.shot-container').append(
						'<div class="shot third column" id="screenshot'+value.id+'" data-application="">'+
							'<div class="shot-image">'+
								'<div class="actions">'+
								'</div>'+
								'<img src="http://www.placehold.it/286x508/EFEFEF/AAAAAA&text=egggo.cn" data-url="'+value.pic.mediumFileUrl+'" class="unload"/>'+
								'<div class="cover"></div>'+
							'</div>'+
							'<div class="shot-info">'+
								'<div class="text-overflow"><a class="two-thirds dark-gray text-align-left" href="/applications/get/'+value.application.id+'" target="_blank">'+value.application.name+'</a></div>'+
								'<div class="third text-align-right fr"><i class="iconfont like-count inline-block">&#xe606;</i><h6>'+value.likeCount+'</h6></div>'+
								'<div id="'+value.id+'" class="mark-container light-gray" name="screenshot-mark-container">'+
									'<h6 class="text-overflow">'+
									'</h6>'+
								'</div>'+
							'</div>'+
						'</div>'		
					);
					var marks=[],screenShotContents=[],application={};
					/* LikeOrNot */
					if(value.isLiked===0){
						$('#screenshot'+value.id).find('.actions').append(
							'<a class="btn-like text-align-center" id="'+value.id+'" onclick="like(this,'+value.id+')">'+
								'<i class="iconfont unlike inline-block is-hidden">&#xe606;</i>'+
								'<i class="iconfont liked inline-block">&#xe607;</i>'+	
							'</a>'
						);
					}
					else{
						$('#screenshot'+value.id).find('.actions').append(
							'<a class="btn-like text-align-center" id="'+value.id+'" onclick="unlike(this,'+value.id+')">'+
								'<i class="iconfont unlike inline-block">&#xe606;</i>'+
								'<i class="iconfont liked inline-block is-hidden">&#xe607;</i>'+
							'</a>'
						);
					}
					/* 遍历marks */
					$.each(value.marks,function(k,v){
						if(v.name.indexOf(keyword)>-1){
							$('#screenshot'+value.id).find('.mark-container').find('.text-overflow').append(
									'<a href="/screenshots/searchscreenshot?search='+v.name+'" class="highlight" target="_blank">'+v.name+'</a>'+
									'<span> , </span>'
							);							
						}else{
							$('#screenshot'+value.id).find('.mark-container').find('.text-overflow').append(
									'<a href="/screenshots/searchscreenshot?search='+v.name+'" target="_blank">'+v.name+'</a>'+
									'<span> , </span>'
							);	
						}
						marks.push({
							id:v.id,
							name:v.name
						});
					});
					/* 遍历ScreenshotsContent */
					$.each(value.screenShotContents,function(k,v){
						screenShotContents.push({
							type:v.type,
							url:v.pic.mediumFileUrl+'&method=attachment'
						});
					});
					//浏览图片Modal需要的数据					
					var application={
						screenShotId:value.id,
						pic:value.pic.originFileUrl,
						appVersion:value.appVersion,
						likeCount:value.likeCount,
						applicationName:value.application.name,
						applicationIcon:value.application.icon.thumbFileUrl,
						updatedTime:value.createdAt,
						marks:marks,
						screenShotContents:screenShotContents
					};
					$('#screenshot'+value.id).data('application',application)
					.find('.mark-container').find('span:last').remove();
				});
				lazyload();
				returnJson.status=0;
				returnJson.msg='正常加载数据';
				Enabled($('.loadMore'),'加载更多');
			}
			else{
				console.log('page out of range');
				$('.loadTips').text('没有更多数据').stop().fadeIn(500).fadeOut(1500);
				returnJson.status=1;
				returnJson.msg='没有更多数据';
				Enabled($('.loadMore'),'没有更多了');
			}
			$('#footer-total-count,#resultsCount').text(data.count);
			defer.resolve(returnJson);
		},
		error:function(data,status){
			console.log(status);
			Enabled($('.loadMore'),'加载更多');
			$('.loadTips').text('加载数据异常,请重试！').stop().fadeIn(500).fadeOut(2000);
			returnJson.status=2;
			returnJson.msg='加载数据异常';
			defer.reject(returnJson);
		}
	});
	return defer.promise();
}