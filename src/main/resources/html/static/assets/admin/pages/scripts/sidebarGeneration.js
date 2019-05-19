function setHome(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		insertContent = '<li class="start active"><a href="/dashboard/console"><i class="fa fa-home"></i><span class="title"> 首页 </span><span class="selected"></span></a></li>';
		
	}else {
		insertContent = '<li><a href="/dashboard/console"><i class="fa fa-home"></i><span class="title"> 首页 </span></a></li>';
	};

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setUser(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		insertContent = '<li class="active open"><a href="/users" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="用户都在干什么"><i class="fa fa-group"></i><span class="title"> 用户管理 </span><span class="selected"></span></a></li>';
	}else {
		insertContent = '<li class=""><a href="/users" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="用户都在干什么"><i class="fa fa-group"></i><span class="title"> 用户管理 </span></a></li>';
	};

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setEventCreate(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		switch (active_number)
		{
			case 1:
				insertContent = '<li class="active open"><a href="javascript:;"><i class="fa fa-rocket"></i><span class="title"> 原子弹投放 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li class="active"><a href="/users/sendevent"> 小知男投放 </a></li><li><a href="/users/listrobotuser"> 选水军 </a></li></ul></li>';
				break;
			case 2:
				insertContent = '<li class="active open"><a href="javascript:;"><i class="fa fa-rocket"></i><span class="title"> 原子弹投放 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li><a href="/users/sendevent"> 小知男投放 </a></li><li class="active"><a href="/users/listrobotuser"> 选水军 </a></li></ul></li>';
				break;
			default:
				insertContent = "";
		}
		
	}else {
		insertContent = '<li><a href="javascript:;"><i class="fa fa-rocket"></i><span class="title"> 原子弹投放 </span><span class="arrow"></span></a><ul class="sub-menu"><li><a href="/users/sendevent"> 小知男投放 </a></li><li><a href="/users/listrobotuser"> 选水军 </a></li></ul></li>';
	}

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setEventList(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		insertContent = '<li class="active open"><a href="/events?disabled_flag=0" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="偷窥每个人都发了什么图片"><i class="fa fa-bullhorn"></i><span class="title"> 用户都在干嘛 </span><span class="selected"></span></a></li>';
	}else {
		insertContent = '<li class=""><a href="/events?disabled_flag=0" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="偷窥每个人都发了什么图片"><i class="fa fa-bullhorn"></i><span class="title"> 用户都在干嘛 </span></a></li>';
	};

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setHotEvent(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		switch (active_number)
		{
			case 1:
				insertContent = '<li class="active open"><a href="javascript:;"><i class="fa fa-flag"></i><span class="title"> 火热事件 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li class="active"><a href="/events/listhotevent">所有火热事件 </a></li><li><a href="/events/newhotevent">置顶一个事件 </a></li></ul></li>';
				break;
			case 2:
				insertContent = '<li class="active open"><a href="javascript:;"><i class="fa fa-flag"></i><span class="title"> 火热事件 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li><a href="/events/listhotevent">所有火热事件 </a></li><li class="active"><a href="/events/newhotevent">置顶一个事件 </a></li></ul></li>';
				break;
			default:
				insertContent = "";
		}
		
	}else {
		insertContent = '<li><a href="javascript:;"><i class="fa fa-flag"></i><span class="title"> 火热事件 </span><span class="arrow"></span></a><ul class="sub-menu"><li><a href="/events/listhotevent">所有火热事件 </a></li><li><a href="/events/newhotevent">置顶一个事件 </a></li></ul></li>';
	};

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setChatHistory(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		insertContent = '<li class="active open"><a href="/users/chatrecords" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="偷窥他们的小秘密"><i class="fa fa-bullhorn"></i><span class="title"> 对话记录 </span><span class="selected"></span></a></li>';
	}else {
		insertContent = '<li class=""><a href="/users/chatrecords" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="偷窥他们的小秘密"><i class="fa fa-bullhorn"></i><span class="title"> 对话记录 </span></a></li>';
	};

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setStickerCreate(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		switch (active_number)
		{
			case 1:
				insertContent = '<li class="active"><a href="javascript:;"><i class="fa fa-camera"></i><span class="title"> 贴纸系统 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li class="active"><a href="/stickers?type=普通">贴纸库 </a></li><li><a href="/packages">贴纸主题包 </a></li><li><a href="/stickers/listhotsticker">热门贴纸</a></li></ul></li>';
				break;
			case 2:
				insertContent ='<li class="active"><a href="javascript:;"><i class="fa fa-camera"></i><span class="title"> 贴纸系统 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li><a href="/stickers?type=普通">贴纸库 </a></li><li class="active"><a href="/packages">贴纸主题包 </a></li><li><a href="/stickers/listhotsticker">热门贴纸</a></li></ul></li>';
				break;
			case 3:
				insertContent='<li class="active"><a href="javascript:;"><i class="fa fa-camera"></i><span class="title"> 贴纸系统 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li><a href="/stickers?type=普通">贴纸库 </a></li><li><a href="/packages">贴纸主题包 </a></li><li class="active"><a href="/stickers/listhotsticker">热门贴纸</a></li></ul></li>';
				break;
			default:
				insertContent = '';
		}
		
	}else {
		insertContent = '<li><a href="javascript:;"><i class="fa fa-camera"></i><span class="title"> 贴纸系统 </span><span class="arrow"></span></a><ul class="sub-menu"><li><a href="/stickers?type=普通">贴纸库 </a></li><li><a href="/packages">贴纸主题包 </a></li><li><a href="/stickers/listhotsticker">热门贴纸</a></li></ul></li>';
	};

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setBanner(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		insertContent = '<li class="active open"><a href="/advertisements" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="位于贴纸墙顶部，客户端目前仅支持显示最新一条."><i class="fa fa-indent"></i><span class="title"> Banner </span><span class="selected"></span></a></li>';
	}else {
		insertContent = '<li class=""><a href="/advertisements" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="位于贴纸墙顶部，客户端目前仅支持显示最新一条."><i class="fa fa-indent"></i><span class="title"> Banner </span></a></li>';
	};

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setTopic(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		insertContent = '<li class="active open"><a href="/topics" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="位于主屏顶部，客户端同一时间段仅显示一条."><i class="fa fa-bullseye"></i><span class="title"> Topic </span><span class="selected"></span></a></li>';
	}else {
		insertContent = '<li class=""><a href="/topics" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="位于主屏顶部，客户端同一时间段仅显示一条."><i class="fa fa-bullseye"></i><span class="title"> Topic </span></a></li>';
	};

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setActivity(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		insertContent = '<li class="active open"><a href="/activities" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="位于主屏Topic下方，展示基于时间和LBS的活动."><i class="fa fa-bolt"></i><span class="title"> Activity </span><span class="selected"></span></a></li>';
	}else {
		insertContent = '<li class=""><a href="/activities" class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="位于主屏Topic下方，展示基于时间和LBS的活动."><i class="fa fa-bolt"></i><span class="title"> Activity </span></a></li>';
	};

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setMark(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		switch (active_number)
		{
			case 1:
				insertContent = '<li class="active open"><a href="javascript:;"><i class="fa fa-tags"></i><span class="title"> 标签 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li class="active"><a href="/marks"> Mark </a></li><li><a href="/markcontainers"> MarkContainer </a></li></ul></li>';
				break;
			case 2:
				insertContent = '<li class="active open"><a href="javascript:;"><i class="fa fa-tags"></i><span class="title"> 标签 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li><a href="/marks"> Mark </a></li><li class="active"><a href="/markcontainers"> MarkContainer </a></li></ul></li>';
				break;
			default:
				insertContent = "";
		}
		
	}else {
		insertContent = '<li><a href="javascript:;"><i class="fa fa-tags"></i><span class="title"> 标签 </span><span class="arrow"></span></a><ul class="sub-menu"><li><a href="/marks"> Mark </a></li><li><a href="/markcontainers"> MarkContainer </a></li></ul></li>';
	}

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setPerformanceStatistic(isOpen,active_number) {
	var insertContent;
	if (isOpen) {
		switch (active_number)
		{
			case 1:
				insertContent = '<li class="active open"><a href="javascript:;"><i class="fa fa-bar-chart-o"></i><span class="title"> 性能分析 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li class="active"><a href="/performancestatistics/listhttpstatuscodestatistic"> Http状态码统计 </a></li><li><a href="/performancestatistics/listhttpresponsetimestatistic"> 接口响应时间统计 </a></li></ul></li>';
				break;
			case 2:
				insertContent = '<li class="active open"><a href="javascript:;"><i class="fa fa-bar-chart-o"></i><span class="title"> 性能分析 </span><span class="arrow open"></span><span class="selected"></span></a><ul class="sub-menu"><li><a href="/performancestatistics/listhttpstatuscodestatistic"> Http状态码统计 </a></li><li class="active"><a href="/performancestatistics/listhttpresponsetimestatistic"> 接口响应时间统计 </a></li></ul></li>';
				break;
			default:
				insertContent = "";
		}

	}else {
		insertContent = '<li><a href="javascript:;"><i class="fa fa-bar-chart-o"></i><span class="title"> 性能分析 </span><span class="arrow"></span></a><ul class="sub-menu"><li><a href="/performancestatistics/listhttpstatuscodestatistic"> Http状态码统计 </a></li><li><a href="/performancestatistics/listhttpresponsetimestatistic"> 接口响应时间统计 </a></li></ul></li>';
	}

	document.getElementById('sidebar-container').innerHTML = document.getElementById('sidebar-container').innerHTML + insertContent;
}

function setDropmenu() {
	var insertContent = '<li><a href="/dashboard/logout"><i class="fa fa-key"></i> 退出登录 </a></li>';

	document.getElementById('dropdown-container').innerHTML = insertContent;
}

//left bar and navbar init
var sideBarGeneration=function(){
	
	var sideBar=function(id){
		var url=window.location.pathname;
		//首页
		url=='/dashboard/console'?setHome(1,0):setHome(0,0);
		//用户管理
		url=='/users'||url=='/users/freezelist'?setUser(1,0):setUser(0,0);
		//原子弹投放
		if(id==1||id==16){
			url=='/users/sendevent'?setEventCreate(1,1):url=='/users/listrobotuser'||url=='/users/preparecreaterobot'||url=='/users/preparesendevent'?setEventCreate(1,2):setEventCreate(0,0);
		}
		//用户都在干嘛
		url=='/events'||url=='/events/geteventana'||url=='/events/eventschatrecords'?setEventList(1,0):setEventList(0,0);
		//火热事件
		url=='/events/listhotevent'?setHotEvent(1,1):url=='/events/newhotevent'?setHotEvent(1,2):setHotEvent(0,0);
		//对话纪录
		url=='/users/chatrecords'?setChatHistory(1,0):setChatHistory(0,0);
		//贴纸系统
		url=='/stickers'||url=='/stickers/newsticker'?setStickerCreate(1,1):url=='/packages'||url=='/packages/newpackager'?setStickerCreate(1,2):url=='/stickers/listhotsticker'?setStickerCreate(1,3):setStickerCreate(0,0);
		//Banner
		url=='/advertisements'||url=='/advertisements/newadvertisement'?setBanner(1,0):setBanner(0,0);
		//Topic
		url=='/topics'||url=='/topics/newtopic'?setTopic(1,0):setTopic(0,0);
		//Activity
		url=='/activities'||url=='/activities/newactivity'?setActivity(1,0):setActivity(0,0);
		//标签
		url=='/marks'||url=='/marks/newmark'?setMark(1,1):url=='/markcontainers'||url=='/markcontainers/newmarkcontainers'?setMark(1,2):setMark(0,0);
		//性能分析
		url=='/performancestatistics/listhttpstatuscodestatistic'?setPerformanceStatistic(1,1):url=='/performancestatistics/listhttpresponsetimestatistic'?setPerformanceStatistic(1,2):setPerformanceStatistic(0,0);
	};
	
	var navBar=function(){
		setDropmenu();
	};
	
	return {
		init:function(id){
			sideBar(id);
			navBar();
		}
	};
}();


	


