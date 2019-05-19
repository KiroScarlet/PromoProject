(function($) {
    var methods = {
        init: function(options) {
            var $this = this;
            options = $.extend($.fn.searchUser.options, options);
            return this.each(function() {
                var $thisSearchUser = $(this);
                var userData = [].concat(options.userData); // 用户数组[{userId, userName}](解除引用传递)
                var adjustLeftComponent = options.adjustLeftComponent; // 对齐控件
                var limitUser = options.limitUser; // 限制用户数量
                var isChangeable = options.isChangeable; // 是否可以改变用户
                var placeholder = options.placeholder; // 搜索控件提示文字
                var deleteOneUserFunc = options.deleteOneUserFunc;  //删除一个用户的回调函数
                var addOneUserFunc = options.addOneUserFunc;   //加入一个用户的回调函数

                $thisSearchUser.data("userData", userData); 
                $thisSearchUser.data("adjustLeftComponent", adjustLeftComponent);
                $thisSearchUser.data("limitUser", limitUser);
                $thisSearchUser.data("isChangeable", isChangeable);
                $thisSearchUser.data("placeholder", placeholder);
                $thisSearchUser.data("deleteOneUserFunc", deleteOneUserFunc);
                $thisSearchUser.data("addOneUserFunc", addOneUserFunc);

                
                //初始化外部预设的user
                $(".drUserSpanContainer").off("click");
                $(".drUserSpanContainer").remove();
                
                
                
                for(var i = 0; i < userData.length; i++){
                	 $thisSearchUser.searchUser("addOneUserSpanView",userData[i]);
                }
                
                //初始化placeholder
                $thisSearchUser.searchUser("setChangeable",isChangeable);
 
                

                // 搜索用户
                function searchUserKeyword(keyword) {
                    if ($.trim(keyword) == "") {
                        if ($thisSearchUser.searchUser("isUserSearchShown")) {
                            $("#drSearchUserContainer").popover("hide");
                        }
                        return;
                    }
                    keyword = encodeURIComponent(keyword);
                    var jRequest = $.ajax({
                        type: "GET",
                        contentType: "application/x-www-form-urlencoded",
                        url: "/indexhome/indexsearch?type=2&searchtype=3&top=8&keyword=" + keyword,
                        beforeSend: function() {
                            $('#loadingBar').drloadingbar("startLoad");
                            var currentReq = $("#drSearchUserContainer").data("jRequest");
                            if (currentReq != null) { // 前面的请求还未完成
                                currentReq.abort();
                            }
                        },
                        success: function(data) {
                            $('#loadingBar').drloadingbar("stopLoad");
                            var userArray = data.content,
                                userLength = userArray.length;
                            if (userLength > 0) {
                                if ($thisSearchUser.searchUser("isUserSearchShown")) {
                                    $("#drSearchUserContainer").popover("hide");
                                }
                                $("#drSearchUserContainer").popover("show");
                                for (var i = 0; i < userLength; i++) {
                                    $element = $("<li class='drUserInputPopoverSearchList'><span><img src='" + userArray[i].avatarThumbUrl + "&w=60&h=60' class='img-circle' /></span><span data-userid='" + userArray[i].id + "' ><strong>" + $.htmlspecialchars(userArray[i].userName) + "</strong></span></li>");
                                    if(i == 0){ // 默认选中第一个用户
                                    	$element.addClass("isActive");
                                    }
                                    $element.appendTo($("#drUserInputPopoverSearch"));
                                }
                                $("#drUserInputPopoverSearch").off("mouseenter");
	                            $("#drUserInputPopoverSearch").off("click");
	                            // 鼠标移到上面高亮显示
	                            $("#drUserInputPopoverSearch").on("mouseenter", ".drUserInputPopoverSearchList", function() {
	                            	if(!$(this).hasClass("isActive")){
	                                	$(".drUserInputPopoverSearchList.isActive").each(function(){
	                                		$(this).removeClass("isActive");
	                                	});
	                                	$(this).addClass("isActive");
	                            	}
	                            });
	                            // 鼠标单击选中
	                            $("#drUserInputPopoverSearch").on("click", ".drUserInputPopoverSearchList.isActive", function(e) {
	    	                        var content = $(this).find("span strong").text();
	    	                        var userId = $(this).find("span[data-userid]").attr("data-userid");
	    	                        $thisSearchUser.searchUser("addOneUser",userId, content);
	    	                        $("#drSearchUser").focus();
	                            });
                            } else {
                                if ($thisSearchUser.searchUser("isUserSearchShown")) {
                                    $("#drSearchUserContainer").popover("hide");
                                }
                            }
                        },
                        error: function(data) {
                            if (data.statusText == "abort") {
                                return;
                            }
                            $('#loadingBar').drloadingbar("stopLoad");
                        }
                    });
                    $("#drSearchUserContainer").data("jRequest", jRequest);
                }
                // 粘贴事件
                $("#drSearchUser").on("paste", function(e) {
                	var userData = $thisSearchUser.data("userData");
                	var limitUser = $thisSearchUser.data("limitUser");
                    if (userData.length >= limitUser) {
                        // 提示只能输入多少个用户
                        $("#drUserInputErrorPopoverContent").text("只能添加 " + limitUser + " 个用户");
                        if (!$thisSearchUser.searchUser("isUserInputErrorShown")) {
                            $("#drSearchUser").popover("show");
                        }
                        e.preventDefault();
                        return;
                    }
                    if ($thisSearchUser.searchUser("isUserInputErrorShown")) {
                        $("#drSearchUser").popover("hide");
                    }
                    var pasteText = e.originalEvent.clipboardData.getData("text/plain");
                    pasteText = pasteText.replace(/\r\n/g, "");
                    pasteText = pasteText.replace(/\r/g, "");
                    pasteText = pasteText.replace(/\n/g, "");
                    document.execCommand("insertHTML", false, pasteText);
                    searchUserKeyword($(this).text());
                });
                // 光标离开事件
                $("#drSearchUser").on("blur", function(e) {
                	//return;
                    if ($thisSearchUser.searchUser("isUserInputErrorShown")) {
                        $("#drSearchUser").popover("hide");
                    }
                    if ($thisSearchUser.searchUser("isUserSearchShown")) {
                        setTimeout(function() {
                            // 延迟200毫秒触发，否则若点击在content cell内部则立马被hide掉，无法触发
                            $("#drSearchUserContainer").popover("hide");
                        }, 200);
                    }
                });
                // 键盘按键事件
                $("#drSearchUser").on("keydown", function(e) {
                	var userData = $thisSearchUser.data("userData");
                	var limitUser = $thisSearchUser.data("limitUser");
                	var isChangeable = $thisSearchUser.data("isChangeable");
                    var keyCode = e.keyCode;
                    if(!isChangeable){
                    	e.preventDefault();
                    	return;
                    }
                    if (keyCode == 8 || keyCode == 46) { // BackSpace, Delete
                    	if ($thisSearchUser.searchUser("isUserInputErrorShown")) {
                            $("#drSearchUser").popover("hide");
                        }
                        if ($(this).text() == "" && userData.length > 0) {
                        	e.preventDefault();
                        	$thisSearchUser.searchUser("deleteOneUser");
                            return;
                        }
                    }
                    if (userData.length >= limitUser) {
                    	e.preventDefault();
                    	$(this).text("");
                        if (!$thisSearchUser.searchUser("isUserInputErrorShown")) {
                        	$("#drSearchUser").popover("show");
                        	// 提示只能输入多少个用户
                            $("#drUserInputErrorPopoverContent").text("只能添加 " + limitUser + " 个用户");
                        }
                        return;
                    }
                    if ($thisSearchUser.searchUser("isUserInputErrorShown")) {
                        $("#drSearchUser").popover("hide");
                    }
                    if (keyCode == 13 || keyCode == 108) { // Enter键
                        e.preventDefault();
                        // 处理标签
                        if ($thisSearchUser.searchUser("isUserSearchShown")) {
                        	var content = $(".drUserInputPopoverSearchList.isActive span strong").text();
                        	var userId = $(".drUserInputPopoverSearchList.isActive span[data-userid]").attr("data-userid");
                        	$thisSearchUser.searchUser("addOneUser",userId, content);
                            $("#drSearchUserContainer").popover("hide");
                        }
                    } else if (keyCode == 40) { // 下方向键
                        if ($thisSearchUser.searchUser("isUserSearchShown")) {
                        	var $nextNode = $($(".drUserInputPopoverSearchList.isActive")[0].nextSibling);
                        	$(".drUserInputPopoverSearchList.isActive").removeClass("isActive");
                            if ($nextNode.length == 0) {
                                // 指向第一个
                                $(".drUserInputPopoverSearchList").first().addClass("isActive");
                            } else {
                                // 指向下一个
                                $nextNode.addClass("isActive");
                            }
                        }
                    } else if (keyCode == 38) { // 上方向键
                        if ($thisSearchUser.searchUser("isUserSearchShown")) {
                        	var $previousNode = $($(".drUserInputPopoverSearchList.isActive")[0].previousSibling);
                        	$(".drUserInputPopoverSearchList.isActive").removeClass("isActive");
                        	if ($previousNode.length == 0) {
                                // 指向最后一个
                                $(".drUserInputPopoverSearchList").last().addClass("isActive");
                            } else {
                                // 指向上一个
                                $previousNode.addClass("isActive");
                            }
                        }
                    } else {
                        var $this = $(this);
                        setTimeout(function() {
                            searchUserKeyword($this.text());
                        }, 100);
                    }
                });
                // 错误弹出框初始化
                $("#drSearchUser").popover({
                    trigger: "manual",
                    html: true,
                    animation: false,
                    placement: "top",
                    content: '<div id="userInputErrorPopoverContainer"><div id="userInputErrorPopover"><p id="drUserInputErrorPopoverContent"></p></div></div>'
                });
                // 搜索弹出框初始化
                $("#drSearchUserContainer").popover({
                    trigger: "manual",
                    html: true,
                    animation: false,
                    placement: "bottom",
                    content: "<div id='userInputPopoverSearchContainer'><ul id='drUserInputPopoverSearch'></ul></div>"
                });
                // 搜索弹出框显示后调整位置
                $("#drSearchUserContainer").on('shown.bs.popover', function(e) {
                    if (e.target != $("#drSearchUserContainer")[0]) {
                        return;
                    }
                    var topVal = parseInt($('#drSearchUserContainer+.popover').css('top').substr(0, $('#drSearchUserContainer+.popover').css('top').length - 2)),
                    	inText = $("#drSearchUser").text();
                    $('#drSearchUserContainer+.popover').css('top', (topVal - 15) + 'px');
                    // 重新计算left
                    var left = 0;
                    if (!adjustLeftComponent) {
                        left = $("#drSearchUserContainer").offset().left;
                    } else {
                        var left1 = $("#drSearchUserContainer").offset().left;
                        var left2 = adjustLeftComponent.offset().left;
                        left = left1 - left2;
                    }
                    $('#drSearchUserContainer+.popover').css('left', (left - 20) + 'px');
                    $('#drSearchUserContainer+.popover .arrow').css('left', (20 + 14 * inText.length / 2) + 'px');
                });
                // 单击删除一个用户
                $thisSearchUser.on("click", ".drUserSpanContainer", function(e) {
                	var isChangeable = $thisSearchUser.data("isChangeable");
                	if(!isChangeable){
                    	e.preventDefault();
                    	return;
                    }
                	$thisSearchUser.searchUser("deleteOneUser",$(e.target).data("userid"));
                });
            });
        }, // init End
        getUserArray: function() {
            return this.data("userData");
        },
        resetData:function(userData,isChangeable,limitUser){
        	this.data("userData", userData);
        	this.data("limitUser", limitUser);
        	this.searchUser("setChangeable", isChangeable);
            $(".drUserSpanContainer").off("click");
            $(".drUserSpanContainer").remove();
            for(var i = 0; i < userData.length; i++){
            	 this.searchUser("addOneUserSpanView", userData[i]);
            }
        },

        setPlaceholder:function(text){
           var userData = this.data("userData");
           if(userData.length > 0){
        	   $("#drSearchUser")[0].setAttribute("data-placeholder", "");
           }else{
               $("#drSearchUser")[0].setAttribute("data-placeholder", text);
           }

        },
        setChangeable:function(isChangeable){
            this.data("isChangeable",isChangeable);
            var placeholder = this.data("placeholder");
            if(isChangeable){
                $("#drSearchUser").css("visibility", "visible");
                this.searchUser("setPlaceholder",placeholder);
            }else{
                $("#drSearchUser").css("visibility", "hidden");
            }
        },
        // 错误输入框popover是否存在
        isUserInputErrorShown:function(){
        	if($("#drSearchUser").data('bs.popover') != null){
                return $("#drSearchUser").data('bs.popover').tip().hasClass('in');
        	}else{
        		return false;
        	}

        },
        // 用户popover是否存在
        isUserSearchShown:function(){
        	if($("#drSearchUserContainer").data('bs.popover') != null){
        	      return $("#drSearchUserContainer").data('bs.popover').tip().hasClass('in');
        	}else{
        		return false;
        	}
      
        },
        //删除一个用户
        deleteOneUser:function(userId) {
            var userData = this.data("userData");
            var placeholder = this.data("placeholder");
            var deleteOneUserFunc = this.data("deleteOneUserFunc");
            var limitUser = this.data("limitUser");
            if (userData.length <= limitUser) {
                if (this.searchUser("isUserInputErrorShown")) {
                    $("#drSearchUser").popover("hide");
                }
            }
            
            if(userData.length == 0){
                return;
            }
            var deleteUserData = {};
            if(userId == null){
                //删除最后一个
                var $deleteElement = $($(".drUserSpanContainer")[userData.length - 1]);
                $deleteElement.off("click");
                $deleteElement.remove();
                deleteUserData = userData[userData.length-1];
                userData.splice(userData.length-1, 1);
                this.searchUser("setPlaceholder",placeholder);
            }else{
                var $deleteElement = $(".drUserSpanContainer[data-userid="+userId+"]");
                $deleteElement.off("click");
                $deleteElement.remove();
                for(var i = 0; i < userData.length; i++){
                    if(userData[i].userId == userId){
                        deleteUserData = userData[i];
                        userData.splice(i, 1);

                        break;
                    }
                }
                this.searchUser("setPlaceholder",placeholder);
            }
            if(deleteOneUserFunc != null){
            	if(arguments.length <= 1){
                    deleteOneUserFunc(deleteUserData);
            	}

            }
        },
        //增加用户对应的view操作
        addOneUserSpanView:function(userDataElement){
            $element = $("<span></span>");
            $element.text(userDataElement.userName);
            $element.attr("data-userid", userDataElement.userId);
            $element.addClass("drUserSpanContainer");
            $element.insertBefore($("#drSearchUserContainer"));
        },
        // 增加用户
        addOneUser:function(userId, userName) {
            var userData = this.data("userData");
            var placeholder = this.data("placeholder");
            var limitUser = this.data("limitUser");
            var addOneUserFunc = this.data("addOneUserFunc");
            if (userName == "") {
                return;
            }
            if (userData.length >= limitUser) {
                // 提示只能输入多少个用户

                if (!this.searchUser("isUserInputErrorShown")) {
                    $("#drSearchUser").popover("show");
                    $("#drUserInputErrorPopoverContent").text("只能添加 " + limitUser + " 个用户");
                }
                return;
            }
            
            for(var i = 0; i < userData.length; i++){
                if(userId == userData[i].userId){
                    //提示重复
                    if(!this.searchUser("isUserInputErrorShown")){
                        $("#drSearchUser").popover("show");
                        $("#drUserInputErrorPopoverContent").text("已经添加了该用户");
                    }
                    return;
                }
            }
            var addUserData = {userId:userId, userName:userName};
            userData.push(addUserData);
            this.searchUser("setPlaceholder",placeholder);
            // 添加一个标签
            this.searchUser("addOneUserSpanView",addUserData);
            
            $("#drSearchUser").text("");
            if(this.searchUser("isUserSearchShown")){
                $("#drSearchUserContainer").popover("hide");
            }
            if(addOneUserFunc != null){
            	if(arguments.length <= 2){
                    addOneUserFunc(addUserData);
            	}

            }
        }
        
    };

    $.fn.searchUser = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.searchUser');
        }
    };

    $.fn.searchUser.options = {userData: [], limitUser: 1, isChangeable: false, placeholder: "搜索收件人"};

})(jQuery);