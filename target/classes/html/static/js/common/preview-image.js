/**
 * preview image 
 */
var PreviewImage=function(){
	var Preview=function(params,keyword){
		//关闭图片预览Modal
		$(document).on('click','.image-preview-close',function(){
			$('.image-preview-background').fadeOut(500).removeClass('image-preview-background-hover');
			$('.shot-container .curPreview').removeClass('curPreview');
		})

		//显示Modal浏览图片
		$(document).on('click','.shot-image .cover,.shot-image img',function(){
			var $curShot=$(this).parents('.shot');
			generatePreviewImgModal($curShot);
		})

		//鼠标点击下一张
		$(document).on('click','.image-preview-next',function(){	
			goToPage(false,params,keyword);
		})

		//鼠标点击上一张
		$(document).on('click','.image-preview-prev',function(){
			goToPage(true,params,keyword);
		})

		//方向键控制左右翻页
		$(document).keydown(function(event){
			//Modal处于显示状态才能触发翻页操作	
			if($('.image-preview-background').css('display')=='block'){
				//	-->
				if (event.keyCode == 39){
					goToPage(false,params,keyword);
				}
				//	<--
				else if(event.keyCode == 37){
					goToPage(true,params,keyword);
				}
			}
		}); 
	};
	
	
	return {
		init:function(params,keyword){
			Preview(params,keyword);
		}
	};
}();


/**
 * 图片预览左右翻页
 * 上一张：flag=true , 下一张：flag=false
 */
function goToPage(flag,params,keyword){
	//	上一张
	if(flag){
		//存在上一张	
		if($('.shot-container .curPreview').prev().length>=1){
			slider(true);
		}
		//已经是第一张	
		else{
			console.log('已经是第一张');
			$('.loadTips').text('已经是第一张 !').stop().fadeIn(500).fadeOut(1500);
		}
	}
	//  下一张	
	else{
		//存在下一张	
		if($('.shot-container .curPreview').next().length>=1){
			slider(false);
		}
		//已经是最后一张	
		else{
			//触发操作，加载更多数据
			params.page++;
			Disabled($('.loadMore'),'');
			Loading($('.loadMore'));
			$.when(keyword==''?getScreenShotList(params.url,params.page):getSearchScreenShotList(params.url,params.page,keyword))
			.done(function(data){
				if($('.shot-container .curPreview').next().length>=1){
					slider(false);
				}
				else{
					console.log('已经是最后一张');
					$('.loadTips').text('已经是最后一张 !').stop().fadeIn(500).fadeOut(1500);
				}
			});
		}	
	}
}

/**
 * slider效果
 * 上一张：flag=true , 下一张：flag=false
 */
function slider(flag){
	if(flag){
		$('.image-preview-container').addClass('image-preview-container-prev');
		var $curShot=$('.shot-container .curPreview').removeClass('curPreview').prev();
	}
	else{
		$('.image-preview-container').addClass('image-preview-container-next');
		var $curShot=$('.shot-container .curPreview').removeClass('curPreview').next();
	}
	generatePreviewImgModal($curShot);
	setTimeout(function(){
		if(flag){
			$('.image-preview-container').removeClass('image-preview-container-prev');
		}
		else{
			$('.image-preview-container').removeClass('image-preview-container-next');
		}		
	},500);
}

/**
 * 生成图片预览Modal
 */
function generatePreviewImgModal($curShot){
	$curShot.addClass('curPreview');
	//滚动条随预览图片滚动
	var scrollTop=$('.curPreview').offset().top;
	$("html,body").animate({scrollTop:scrollTop+"px"},500);
	
	var application=$curShot.data('application');
	if($('.image-preview-background').length<1){
		$('body').append(
				'<div class="image-preview-background is-hidden">'+
					'<i class="iconfont image-preview-ctrl image-preview-close">&#xe60b;</i>'+
					'<i class="iconfont image-preview-ctrl image-preview-prev">&#xe60a;</i>'+
					'<i class="iconfont image-preview-ctrl image-preview-next">&#xe60a;</i>'+
			
					'<div class="image-preview-wrapper">'+
						'<div class="image-preview-container white">'+
							'<div class="column three-fifths text-align-center">'+
								'<img class="main-image" src="">'+
								'<h6 class="fastKey">键盘快捷键:  ←  前一张图片    →  后一张图片</h6>'+
							'</div>'+
							'<div class="column two-fifths text-align-left">'+
								'<i class="iconfont like-icon inline-block">&#xe606;</i>&nbsp;&nbsp;喜欢&nbsp;&nbsp;<span class="likeCount"></span>'+
								
								'<div class="edit-screenshots-items">'+
								
								'</div>'+
								
								'<hr class="horizontal-line text-align-left">'+
								
								'<ul class="screenshot-info">'+
									'<li>'+
										'<img class="app-logo" src=""/>'+
										'<a class="app-name" target="_blank"></a>'+
									'</li>'+
									'<li>'+
										'<h6>版本号</h6>'+
										'<h6 class="app-version"></h6>'+
									'</li>'+
									'<li>'+
										'<h6>更新时间</h6>'+
										'<h6 class="updateTime"></h6>'+
									'</li>'+
									'<li>'+
										'<h6>所属标签</h6>'+
										'<div class="Marks">'+
										'</div>'+
									'</li>'+
								'</ul>'+
								
								'<div class="downloadPic-area">'+
								'</div>'+
								
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
		);
	}
	$image_preview_background=$('.image-preview-background');
	FillModalData(application,$image_preview_background);
	$('.image-preview-background').fadeIn(500).addClass('image-preview-background-hover');
}

/**
 * 填充Modal数据
 */
function FillModalData(application,$image_preview_background){
	$image_preview_background.find('.column.three-fifths img').attr('src',application.pic);
	$image_preview_background.find('.column.two-fifths .likeCount').text(application.likeCount);
	$image_preview_background.find('.app-logo').attr('src',application.applicationIcon);
	$image_preview_background.find('.app-name').text(application.applicationName).attr('href','/applications/get/'+application.id);
	$image_preview_background.find('.app-version').text(application.appVersion);
	$image_preview_background.find('.updateTime').text(timeStampToDateString(application.updatedTime));	
	//遍历Marks		
	$image_preview_background.find('.screenshot-info .Marks').empty();
	$.each(application.marks,function(key,value){
		$image_preview_background.find('.screenshot-info .Marks').append(
			'<a class="edit-btn" href="/screenshots/searchscreenshot?search='+value.name+'" target="_blank">'+value.name+'</a>'
		);
	});

	var sizeArray=['640X960','640X1136','750X1334','1080X1920'];
	//	按Type从小到大排序
	var newArray=application.screenShotContents;
	if(newArray.length<1){
		$image_preview_background.find('.downloadPic-area').empty().append('抱歉，暂时没有更新下载截图。')
	}
	else{
		$image_preview_background.find('.downloadPic-area').empty().append('下载:');
		newArray.sort(getSortFun('asc', 'type'));
		//遍历screenShotContents	
		$.each(newArray,function(key,value){
			$image_preview_background.find('.downloadPic-area').append(
				'<a class="downloadPic-btn" href="'+value.url+'">'+sizeArray[value.type-1]+'</a>'
			);
		});
	}
	
    //EditScreenShot	
	var EditScreenShot_Array=[{
		'module':'default',
		'controller':'screenshots',
		'action':'enterscreenshotcontent',
		'method':'GET',
		'menuItem':'编辑截图包'
	},
	{
		'module':'default',
		'controller':'screenshots',
		'action':'enterupdate',
		'method':'GET',
		'menuItem':'编辑基本信息'
	},
	{
		'module':'default',
		'controller':'screenshots',
		'action':'delete',
		'method':'POST',
		'menuItem':'删除界面'
	}];

	$('.edit-screenshots-items').empty();
	for(var i=0;i<EditScreenShot_Array.length;i++){
		$('.edit-screenshots-items').append('<a class="is-hidden edit-btn edit-btn-'+i+'" href="" target="_blank">'+EditScreenShot_Array[i].menuItem+'</a>');
	}	
	var $editScreenShot=$('.edit-screenshots-items');
	$editScreenShot.find(".edit-btn-0").attr('href','/screenshots/enterscreenshotcontent?screenShotId='+application.screenShotId);
	$editScreenShot.find(".edit-btn-1").attr('href','/screenshots/enterupdate/'+application.screenShotId);
	$editScreenShot.find(".edit-btn-2").attr('href','/screenshots/delete/'+application.screenShotId);
	
	/* 根据权限显示ScreenShot操作按钮 */
	var returnValue=hasAuth(EditScreenShot_Array,authList_array);
	for(var i=0;i<returnValue.length;i++){
		$editScreenShot.find('.edit-btn-'+returnValue[i].index).removeClass('is-hidden');
	}
	$editScreenShot.find('.is-hidden').remove();
	
}

