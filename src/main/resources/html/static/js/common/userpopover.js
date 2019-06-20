(function( $ ){  
	  

	  
	  var methods = {  
	    init : function( options ){
	    	var $this = this;
	    	options = $.extend( $.fn.userpopover.options, options ); 
	    	return this.each(function(){
	    		var $this = $(this);
	    		var userEntity = options.userEntity;
	    		var idName = options.idName;
	    		var id = options.id;
	    		var shownFunc = options.shownFunc;
	    		var currentUserId = options.currentUserId;
	    		var changeFollowFunc = options.changeFollowFunc;
	    		var hasLogin = options.hasLogin;
	    		var redirectLoginUrl = options.redirectLoginUrl;
	    		if(userEntity == null){
	    			return;
	    		}
	    		$this.data("userEntity",userEntity);
	    		$this.data("idName",idName);
	    		$this.data("id",id);
	    		$this.data("currentUserId",currentUserId);
	    		$this.data("hasLogin",hasLogin);
	    		$this.data("redirectLoginUrl",redirectLoginUrl);
	    		//加上对应data标记
	    		$this.attr("data-userpopover",id);

	    		$this.popover({
                        trigger:"manual",
                        html : true, 
                        animation:false,
                        container:"body",
                        content: (function(arg){
    
                            return function(){
                                return $this.userpopover("getPopoverHtml",userEntity,idName,id);
                            }
    
                        })(id)
                });

                $this.on("mouseenter",(function(arg){
            
                    return function(e){
                    	var appearTimeOut = setTimeout(function(){
                    		appearTimeOut = null;
	                    	$this.off("mouseleave");
	                        if($this.data('bs.popover').tip().hasClass('in')){
	                          return;
	                        }
	                        $this.userpopover("showPopover");
	      
	  
	              
	                        var timeout = null;
	                        $this.on("mouseleave",function(e){
	                            timeout = setTimeout(function(){
	                              $this.userpopover("hidePopover");

	                            },500);
	                        });
	                        $("#"+idName + arg ).parent().parent().off("mouseenter");
	                        
	                        $("#"+idName + arg ).parent().parent().on("mouseenter",function(){
	  
	                            if(timeout != null){
	                              clearTimeout(timeout);
	                              timeout = null;
	                            }

	                            $("#"+idName + arg ).parent().parent().off("mouseleave");
	                            $("#"+idName + arg ).parent().parent().on("mouseleave",function(){
	                                $this.userpopover("hidePopover");

	                            });

	                        });

                    	},500);

                    	$this.on("mouseleave",function(){

                    		if(appearTimeOut != null){
                    			clearTimeout(appearTimeOut);
                    			appearTimeOut = null;
                    		}
                    	});




                        
                    }

                })(id));


				$this.on('shown.bs.popover',(function(arg){

					if(shownFunc != null){
						return shownFunc;
					}else{
						return function(e){
							var currentUserId = $this.data("currentUserId");
							var hasLogin = $this.data("hasLogin");
							var redirectLoginUrl = $this.data("redirectLoginUrl");
							var dataplacement = $this.data("placement");
							
							//调整位置
				            var oldTop = $('.popover').css('top');
				            oldTop = parseInt(oldTop.substr(0,oldTop.length - 2));
				            var newTop = 0;
				            if(dataplacement == "top"){
				            	newTop = oldTop - 5;
				            }else{
				            	newTop = oldTop + 5;
				            }

				            $('.popover').css('top', newTop + "px");
				            var oldLeft = $('.popover').css('left');
				            oldLeft = parseInt(oldLeft.substr(0,oldLeft.length - 2));
				            var newLeft = oldLeft;
				            var outerWidth = $('.popover').outerWidth();
				            newLeft = $(e.target).offset().left - 50;
				            var contentWidth = e.target.offsetWidth;
				            $('.popover').css('left', newLeft + "px");
				            $('.arrow').css('left',contentWidth/2 + 50 + 'px');

				            var role = $("[data-popoverfollowuserid]").data("popoveruserrole");
				            var popUserId = $("[data-popoverfollowuserid]").data("popoverfollowuserid");
				            if(role == "超级管理员" || currentUserId == popUserId ){
				                $("[data-popoverfollowuserid]").hide();
				            }

				            $("[data-popoverfollowuserid]").on("click",function(e){
				                e.preventDefault();
				                if(!hasLogin){
				                	window.location.href=redirectLoginUrl;
				                	return;
				                }
				                var followUserId = $("[data-popoverfollowuserid]").data("popoverfollowuserid");
				                var isYourFollow = $("[data-popoverfollowuserid]").data("popoverisfollowuser");
				                if(isYourFollow == 0){
				                		
	                                    $("[data-popoverfollowuserid="+followUserId+"]").addClass("active");
	                                    $("[data-popoverfollowuserid="+followUserId+"]").text("已关注");
	                                    $("[data-popoverfollowuserid="+followUserId+"]").data("popoverisfollowuser",1);
	                                      
	                                    if(changeFollowFunc != null){
	                                    	changeFollowFunc(followUserId,1);
	                                    }
				                        var jRequest = jQuery.ajax({
				                                type : "POST",  
				                                contentType : "application/x-www-form-urlencoded",  
				                                url : "/users/follow",
				                                data : "follow_id=" + followUserId,
				                                beforeSend:function(){
				                                    var currentReq = $("[data-popoverfollowuserid]").data("jRequest");
				                                    if(currentReq != null){
				                                        currentReq.abort();
				                                    }
				                                            
				                                },
				                                complete:function(){
				                                    $("[data-popoverFollowUserId]").data("jRequest",null);
				                                },
				                                success : function(data){
				                                    //刷新ui
				                                    $("[data-popoverfollowuserid="+followUserId+"]").addClass("active");
				                                    $("[data-popoverfollowuserid="+followUserId+"]").text("已关注");
				                                    $("[data-popoverfollowuserid="+followUserId+"]").data("popoverisfollowuser",1);
				                                      
				                                    if(changeFollowFunc != null){
				                                    	changeFollowFunc(followUserId,1);
				                                    }

				                                },  
				                                error : function(data){
				                                    if(data.statusText=="abort"){
				                                        return;
				                                    }
				                                    $("[data-popoverfollowuserid="+followUserId+"]").removeClass("active");
				                                    $("[data-popoverfollowuserid="+followUserId+"]").text("关注");
				                                    $("[data-popoverfollowuserid="+followUserId+"]").data("popoverisfollowuser",0);
				                                    if(changeFollowFunc != null){
				                                    	changeFollowFunc(followUserId,0);
				                                    }

				                                }});

				                                $("[data-popoverfollowuserid]").data("jRequest",jRequest);
				                        }else{
				                            //取消关注
		                                    $("[data-popoverfollowuserid="+followUserId+"]").removeClass("active");
		                                    $("[data-popoverfollowuserid="+followUserId+"]").text("关注");
		                                    $("[data-popoverfollowuserid="+followUserId+"]").data("popoverisfollowuser",0);
		                                    if(changeFollowFunc != null){
		                                    	changeFollowFunc(followUserId,0);
		                                    }
				                            var jRequest = jQuery.ajax({
				                                    type : "POST",  
				                                    contentType : "application/x-www-form-urlencoded",  
				                                    url : "/users/unfollow",
				                                    data : "follow_id=" + followUserId,
				                                    beforeSend:function(){
				                                        var currentReq = $("[data-popoverfollowuserid]").data("jRequest");
				                                        if(currentReq != null){
				                                            currentReq.abort();
				                                        }
				                                            
				                                    },
				                                    complete:function(){
				                                        $("[data-popoverfollowuserid]").data("jRequest",null);
				                                    },
				                                    success : function(data){
					                                    $("[data-popoverfollowuserid="+followUserId+"]").removeClass("active");
					                                    $("[data-popoverfollowuserid="+followUserId+"]").text("关注");
					                                    $("[data-popoverfollowuserid="+followUserId+"]").data("popoverisfollowuser",0);
					                                    if(changeFollowFunc != null){
					                                    	changeFollowFunc(followUserId,0);
					                                    }
				                                    },  
				                                    error : function(data){
				                                        if(data.statusText=="abort"){
				                                            return;
				                                        }
					                                    $("[data-popoverfollowuserid="+followUserId+"]").addClass("active");
					                                    $("[data-popoverfollowuserid="+followUserId+"]").text("已关注");
					                                    $("[data-popoverfollowuserid="+followUserId+"]").data("popoverisfollowuser",1);
					                                      
					                                    if(changeFollowFunc != null){
					                                    	changeFollowFunc(followUserId,1);
					                                    }
				                                    }
				                                });

				                                $("[data-popoverfollowuserid]").data("jRequest",jRequest);
				                }

				              });
						}
					}


                })(id));


	    		

	    	});

	    },
	    showPopover:function(){
	    	var $this = this;
	    	return this.each(function(){
	    		//hide掉其他所有的
	    		$("[data-userpopover]").popover("hide");
	    		$this.popover("show");
	    	});
	    },
	    hidePopover:function(){
	    	var $this = this;
	    	return this.each(function(){
	    		$this.popover("hide");
	    	});
	    },
	    getPopoverHtml:function(userEntity,idName,id){
	    	
	    	if(userEntity == null){
	    		return null;
	    	}
	    	var fromUserAvatarUrl = userEntity.avatarThumbUrl;
	    	var fromUserName = userEntity.userName;
	    	var fromUserWord = userEntity.word;
	    	var fromUserArticleCount = userEntity.articleCount;
	    	var fromUserFanCount = userEntity.fanCount;
	    	var userPopoverFollowStr = "";
	    	var userPopoverFollowStrClass = "";
	    	var fromUserGuid = userEntity.guid;
	        if(userEntity.isYourFollow == 1){
	            userPopoverFollowStr = "已关注";
	            userPopoverFollowStrClass = "btnBlue active ";

	        }else{
	            userPopoverFollowStr = "关注";
	            userPopoverFollowStrClass = "btnBlue ";
	        }
	          
	    	return '<div id="' + idName + id + '" class="userPopoverContentContainer">\
            <div>\
                <a target="_blank" href="/users/get?guid='+fromUserGuid+'"><img class="userPopoverUserAvatar img-circle" src="'+fromUserAvatarUrl+'"/></a>\
                <div class="userPopoverUserInfoContainer">\
                  <p class="userPopoverUserName"><a target="_blank" href="/users/get?guid='+fromUserGuid+'">'+$.htmlspecialchars(fromUserName)+'</a></p>\
                  <p class="userPopoverUserWord">'+$.htmlspecialchars(fromUserWord)+'</p>\
                </div>\
                <div class="clear"></div>\
                <div class="divider"></div>\
            </div>\
            <div class="userPopoverContentCountInfoContainer">\
              <div class="userPopoverContentCountInfo">\
                  <div class="userPopoverContentArticleCountContainer"><span>'+fromUserArticleCount+'</span><span>文章</span></div>\
                  <div class="userPopoverContentFanCountContainer"><span>'+fromUserFanCount+'</span><span>粉丝</span></div>\
              </div>\
              <button class="'+userPopoverFollowStrClass+' userPopoverFollowButton" data-popoveruserrole="'+userEntity.role+'" data-popoverisfollowuser='+userEntity.isYourFollow+' data-popoverfollowuserid="'+userEntity.id+'" id="userPopoverFollowButton'+id+'">'+userPopoverFollowStr+'</button>\
              <div class="clear"></div>\
            </div>\
        </div>';
	    }
	};
	  

	  
	  $.fn.userpopover = function( method ) {  
	      
	    // Method calling logic  
	    if ( methods[method] ) {  
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));  
	    } else if ( typeof method === 'object' || ! method ) {  
	      return methods.init.apply( this, arguments );  
	    } else {  
	      $.error( 'Method ' +  method + ' does not exist on jQuery.userpopover' );  
	    }      
	    
	  };  
	  
	  $.fn.userpopover.options = {};

	  
})( jQuery ); 