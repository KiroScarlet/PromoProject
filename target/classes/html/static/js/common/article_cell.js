(function(old) {
  $.fn.attr = function() {
    if(arguments.length === 0) {
      if(this.length === 0) {
        return null;
      }

      var obj = {};
      $.each(this[0].attributes, function() {
        if(this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }

    return old.apply(this, arguments);
  };
})($.fn.attr);

jQuery.extend({
	getCommonProblemCellElement:function(problemEntity,cellId,options){
    	if(options == null){
    		options = {};
    	}
    	var elementStr = "";
    	var problemId = problemEntity.id;
    	var mainId = 0;
    	if(options.isShowFeedInfo){
    		
    		var feedObjForId = options.feedObj;
    		mainId = feedObjForId.id;
    	   	
    	}else if(options.isShowTrendInfo){
    		var trendObjForId = options.trendObj;
    		mainId = trendObjForId.id;
    	}else if(options.customId != null){
    		mainId = options.customId;
    	}else{
    		mainId = problemId;
    	   	
    	}
    	
    	elementStr += '<div id="' + cellId + mainId + '" class="commonProblemCell">';
    	
    	if(options.isShowFeedInfo){
    		var feedObj = options.feedObj;
    		if(feedObj != null){
        			var feedFromUser = feedObj.fromUser;
        			var feedFromUserAvatar = "";
        			var feedFromUserName = "";
        			var feedInfo = "";
        			var feedFromUserGuid = "";
        			if(feedFromUser == null){
        				feedFromUserAvatar = "/public/img/default_avatar.jpg";
        				feedFromUserName = "该用户已被删除";
        			}else{
        				feedFromUserAvatar = feedFromUser.avatarThumbUrl + "&w=60&h=60";
        				feedFromUserName = feedFromUser.userName;
        				feedFromUserGuid = feedFromUser.guid;
        			}
        			var feedCreationTime = $.getMeaningfulTimeStr(feedObj.creationTime);
        			if(feedObj.type == 5){
        				feedInfo = " 关注了一个问题 • "+feedCreationTime;
        			}
        			
        			elementStr += '<div class="commonProblemCellFeedInfo">\
        				<div class="commonProblemCellFeedUserInfo">\
        					<a target="_blank" href="/users/get?guid='+feedFromUserGuid+'"><img data-placement="bottom" class="img-circle commonProblemCellFeedAvatar" src="'+feedFromUserAvatar+'"/></a>\
        					<div class="commonProblemCellFeedUserNameInfo">\
        						<p><a data-placement="bottom" target="_blank" href="/users/get?guid='+feedFromUserGuid+'">'+$.htmlspecialchars(feedFromUserName)+'</a>'+$.htmlspecialchars(feedInfo)+'</p>\
        					</div>\
        					<div class="clear"></div>\
        				</div>';
        			
        			elementStr += '<div class="clear"></div></div>';
    			

    			
    		}
    	}else if(options.isShowTrendInfo){
    		var trendObj = options.trendObj;
    		if(trendObj != null){
        			var trendFromUser = trendObj.user;
        			var trendFromUserAvatar = "";
        			var trendFromUserName = "";
        			var trendInfo = "";
        			var trendFromUserGuid = "";
        			if(trendFromUser == null){
        				trendFromUserAvatar = "/public/img/default_avatar.jpg";
        				trendFromUserName = "该用户已被删除";
        			}else{
        				trendFromUserAvatar = trendFromUser.avatarThumbUrl + "&w=60&h=60";
        				trendFromUserName = trendFromUser.userName;
        				trendFromUserGuid = trendFromUser.guid;
        			}
        			var trendCreationTime = $.getMeaningfulTimeStr(trendObj.creationTime);
        			if(trendObj.type == 3){
        				trendInfo = " 关注了一个问题 • "+trendCreationTime;
        			}
        			
        			elementStr += '<div class="commonProblemCellFeedInfo">\
        				<div class="commonProblemCellFeedUserInfo">\
        					<a target="_blank" href="/users/get?guid='+trendFromUserGuid+'"><img data-placement="bottom" class="img-circle commonProblemCellFeedAvatar" src="'+trendFromUserAvatar+'"/></a>\
        					<div class="commonProblemCellFeedUserNameInfo">\
        						<p><a data-placement="bottom" target="_blank" href="/users/get?guid='+trendFromUserGuid+'">'+$.htmlspecialchars(trendFromUserName)+'</a>'+$.htmlspecialchars(trendInfo)+'</p>\
        					</div>\
        					<div class="clear"></div>\
        				</div>';
        			
        			elementStr += '<div class="clear"></div></div>';
    			

    			
    		}
    	}
    	
		if(options.isNotShowMark){
			
		}else{
	        var markElementStr = "";
	        var markArr = problemEntity.marks;
	        for(var j = 0; j < markArr.length; j++){
	            markElementStr += '<a target="_blank" href="/articles/listbymark?mark_id='+markArr[j].id+'"><span class="commonProblemCellMarkSpanContainer">'+$.htmlspecialchars(markArr[j].name)+'</span></a>';
	        }

	        
	    	elementStr += '<div class="commonProblemCellMarkContainer">'+markElementStr+'</div>';
		}
		
    	
    	var problemTitle = problemEntity.content;

    	problemTitle = $.htmlspecialchars(problemTitle);
    	
		if(options.isNotShowTitle){
			
		}else{
	    	elementStr += '<p class="commonProblemCellTitle"><a href="/problems/get?guid='+problemEntity.guid+'" target="_blank">'+problemTitle+'</a></p>';
		}



        var followCount = problemEntity.followCount;
        var followClass = "";
        if(problemEntity.hasFollow == 1){
           followClass = "dragonfont-unfollow";
           followCount = "已关注｜" + followCount;
        }else{
           followClass = "dragonfont-follow";
           followCount = "关注问题｜" + followCount;
        }
        
		if(options.isNotShowCount){
			
		}else{
	        elementStr += '<div class="commonProblemCellCountContainer">\
	            <a id="commonProblemCellFollow'+mainId+'" href="javascript:;" class="linkBlue commonProblemCellFollow">\
		        	<span class="dragonfont '+followClass+'"></span>\
		        	<span>'+followCount+'</span>\
	        	</a>\
	        </div>';
		}
		

        elementStr += '</div>';
        var element = $(elementStr);
        return element;
        
		
	},
	
    getCommonArticleCellElement:function(articleEntity,cellId,options) {
    	if(options == null){
    		options = {};
    	}
    	var elementStr = "";
    	var articleId = articleEntity.id;
    	var mainId = 0;
    	if(options.isShowFeedInfo){
    		
    		var feedObjForId = options.feedObj;
    		mainId = feedObjForId.id;
    	   	
    	}else if(options.isShowTrendInfo){
    		var trendObjForId = options.trendObj;
    		mainId = trendObjForId.id;
    	}else if(options.customId != null){
    		mainId = options.customId;
    	}else{
    		mainId = articleId;
    	   	
    	}
    	elementStr += '<div id="' + cellId + mainId + '" class="commonArticleCell">';
    	
    	if(options.isShowFeedInfo){
    		var feedObj = options.feedObj;
    		if(feedObj != null){
    				if(feedObj.type == 3 || feedObj.type == 4){
            			var feedFromUser = feedObj.fromUser;
            			var feedFromUserAvatar = "";
            			var feedFromUserName = "";
            			var feedInfo = "";
            			var feedFromUserGuid = "";
            			if(feedFromUser == null){
            				feedFromUserAvatar = "/public/img/default_avatar.jpg";
            				feedFromUserName = "该用户已被删除";
            			}else{
            				feedFromUserAvatar = feedFromUser.avatarThumbUrl + "&w=60&h=60";
            				feedFromUserName = feedFromUser.userName;
            				feedFromUserGuid = feedFromUser.guid;
            			}
            			var feedCreationTime = $.getMeaningfulTimeStr(feedObj.creationTime);
            			if(feedObj.type == 3){
            				feedInfo = " 回答了一个问题 • "+feedCreationTime;
            			}else if(feedObj.type == 4){
            				feedInfo = " 推荐了一个回答 • "+feedCreationTime;
            			}
            			
            			var feedHasTeamClass = "";
            			if(articleEntity.team_id > 0){
            				feedHasTeamClass = "hasTeamInfo";
            			}
            			elementStr += '<div class="commonArticleCellFeedInfo">\
            				<div class="commonArticleCellFeedUserInfo '+feedHasTeamClass+' ">\
            					<a target="_blank" href="/users/get?guid='+feedFromUserGuid+'"><img data-placement="bottom" class="img-circle commonArticleCellFeedAvatar" src="'+feedFromUserAvatar+'"/></a>\
            					<div class="commonArticleCellFeedUserNameInfo">\
            						<p><a data-placement="bottom" target="_blank" href="/users/get?guid='+feedFromUserGuid+'">'+$.htmlspecialchars(feedFromUserName)+'</a>'+$.htmlspecialchars(feedInfo)+'</p>\
            					</div>\
            					<div class="clear"></div>\
            				</div>';
            			
            			//team相关信息在feed内显示在此处
            			if(articleEntity.team_id > 0){
                			var feedTeamIcon = "";
                			var feedTeamName = "";
                			var feedTeamId = 0;
                			if(articleEntity.team == null){
                				feedTeamName = "该团队已被删除";
                			}else{
                				feedTeamIcon = articleEntity.team.iconThumbUrl + "&w=60&h=60";
                				feedTeamName = articleEntity.team.name;
                				feedTeamId = articleEntity.team.id;
                			}
                			elementStr += '<div class="commonArticleCellFeedTeamPartInfo">\
        						<a target="_blank" href="/teams/get?id='+feedTeamId+'"><img data-placement="bottom" class="img-circle commonArticleCellFeedTeamPartAvatar" src='+feedTeamIcon+'/></a>\
        						<div class="commonArticleCellFeedTeamPartName">\
    								<p><a data-placement="bottom" target="_blank" href="/teams/get?id='+feedTeamId+'">'+$.htmlspecialchars(feedTeamName)+'</a></p>\
    							</div>\
        						<div class="clear"></div>\
        						</div>';
            			}
            			
            			elementStr += '<div class="clear"></div></div>';
    				}else if(feedObj.type == 6){
            			var feedFromTeam = feedObj.fromTeam;
            			var feedFromTeamIcon = "";
            			var feedFromTeamName = "";
            			var feedInfo = "";
            			var feedFromTeamId = 0;
            			if(feedFromTeam == null){
            				feedFromTeamName = "该团队已被删除";
            			}else{
            				feedFromTeamIcon = feedFromTeam.iconThumbUrl + "&w=60&h=60";
            				feedFromTeamName = feedFromTeam.name;
            				feedFromTeamId = feedFromTeam.id;
            			}
            			if(feedObj.type == 6){
            				feedInfo = " 团队添加了一个回答";
            			}
            			
            			elementStr += '<div class="commonArticleCellFeedInfo">\
            				<div class="commonArticleCellFeedTeamInfo">\
            					<a target="_blank" href="/teams/get?id='+feedFromTeamId+'"><img data-placement="bottom" class="img-circle commonArticleCellFeedAvatar" src="'+feedFromTeamIcon+'"/></a>\
            					<div class="commonArticleCellFeedTeamNameInfo">\
            						<p><a data-placement="bottom" target="_blank" href="/teams/get?id='+feedFromTeamId+'">'+$.htmlspecialchars(feedFromTeamName)+'</a>'+$.htmlspecialchars(feedInfo)+'</p>\
            					</div>\
            					<div class="clear"></div>\
            				</div>';
            			
            			elementStr += '<div class="clear"></div></div>';
    				}

    			

    			
    		}
    	}else if(options.isShowTrendInfo){
    		var trendObj = options.trendObj;
    		if(trendObj != null){
        			var trendFromUser = trendObj.user;
        			var trendFromUserAvatar = "";
        			var trendFromUserName = "";
        			var trendInfo = "";
        			var trendFromUserGuid = "";
        			if(trendFromUser == null){
        				trendFromUserAvatar = "/public/img/default_avatar.jpg";
        				trendFromUserName = "该用户已被删除";
        			}else{
        				trendFromUserAvatar = trendFromUser.avatarThumbUrl + "&w=60&h=60";
        				trendFromUserName = trendFromUser.userName;
        				trendFromUserGuid = trendFromUser.guid;
        			}
        			var trendCreationTime = $.getMeaningfulTimeStr(trendObj.creationTime);
        			if(trendObj.type == 1){
        				trendInfo = " 回答了一个问题 • "+trendCreationTime;
        			}else if(trendObj.type == 2){
        				trendInfo = " 推荐了一个回答 • "+trendCreationTime;
        			}
        			
        			elementStr += '<div class="commonArticleCellFeedInfo">\
        				<div class="commonArticleCellFeedUserInfo">\
        					<a target="_blank" href="/users/get?guid='+trendFromUserGuid+'"><img data-placement="bottom" class="img-circle commonArticleCellFeedAvatar" src="'+trendFromUserAvatar+'"/></a>\
        					<div class="commonArticleCellFeedUserNameInfo">\
        						<p><a data-placement="bottom" target="_blank" href="/users/get?guid='+trendFromUserGuid+'">'+$.htmlspecialchars(trendFromUserName)+'</a>'+$.htmlspecialchars(trendInfo)+'</p>\
        					</div>\
        					<div class="clear"></div>\
        				</div>';
        			
        			elementStr += '<div class="clear"></div></div>';
    			

    			
    		}
    	}
    	
    	if(articleEntity.team_id != 0){
    		var teamId = articleEntity.team_id;
    		var teamName = "";
    		var teamIconUrl = "";
    		if(articleEntity.team == null){
    			teamName = "该团队已被删除";
    		}else{
    			teamName = articleEntity.team.name;
    			teamIconUrl = articleEntity.team.iconThumbUrl + "&w=60&h=60";
    		}
    		if(options.isNotShowTeam){
    			
    		}else{
           		elementStr += '<div class="commonArticleCellTeamContainer">';
        		elementStr += '<a target="_blank" href="/teams/get?id='+teamId+'"><img data-placement="bottom" class="img-circle commonArticleCellTeamIcon" src="'+teamIconUrl+'"/></a>';
        		elementStr += '<a target="_blank" href="/teams/get?id='+teamId+'" data-placement="bottom" class="commonArticleCellTeamName">'+teamName+'</a>'
        		elementStr += '</div>';
    		}
    	}
    	
    	var articleTitle = "";
    	if(articleEntity.problem_id != 0){

    		if(articleEntity.problem == null){

    			articleTitle = "该问题已被删除";

    		}else{
    			articleTitle = articleEntity.problem.content;
    		}
    		

    		
    	}else{
    		articleTitle = articleEntity.title;
    	}
    	articleTitle = $.htmlspecialchars(articleTitle);
    	
		if(options.isNotShowTitle){
			
		}else{
			if(articleEntity.problem_id != 0){
				//link为问题detail
		    	elementStr += '<p class="commonArticleCellTitle"><a href="/problems/get?guid='+articleEntity.problem.guid+'" target="_blank">'+articleTitle+'</a></p>';
			}else{
				//link为文章detail
		    	elementStr += '<p class="commonArticleCellTitle"><a href="/articles/get?guid='+articleEntity.guid+'" target="_blank">'+articleTitle+'</a></p>';
			}

		}


    	var articleCreatorId = articleEntity.creator_id;
    	var articleCreator = articleEntity.creator;
    	var articleCreatorAvatar = "";
    	var articleCreatorUserName = "";
    	var articleCreatorWord = "";
    	var articleCreatorGuid = "";

    	if(articleCreator == null){
    		articleCreatorAvatar = "/public/img/default_avatar.jpg";
    		articleCreatorUserName = "该用户已被删除";
    		articleCreatorWord = "";
    		articleCreatorGuid = "";

    	}else{
        	articleCreatorAvatar = articleCreator.avatarThumbUrl + "&w=100&h=100";
        	articleCreatorUserName = articleCreator.userName;
        	articleCreatorWord = articleCreator.word;
        	articleCreatorGuid = articleCreator.guid;
        	if(articleCreatorWord != ""){
            	articleCreatorWord = "，"+articleCreatorWord;
        	}

    	}
    	

		if(options.isNotShowCreator){
			
		}else{
	    	elementStr += '<div class="commonArticleCellCreatorInfo">';
	    	elementStr += '<a target="_blank" href="/users/get?guid='+articleCreatorGuid+'"><img data-placement="bottom"  src="'+articleCreatorAvatar+'" class="img-circle commonArticleCellCreatorAvatar"></a>';
	    	elementStr += '<p class="commonArticleCellCreatorNameInfo"><a data-placement="bottom" target="_blank"  href="/users/get?guid='+articleCreatorGuid+'">'+$.htmlspecialchars(articleCreatorUserName)+'</a>'+$.htmlspecialchars(articleCreatorWord)+'</p>';
	    	elementStr += '<div class="clear"></div>'
	    	elementStr += '</div>';
		}
		

    	if(articleEntity.coverlist_id != 0){
    		
    		var coverUrl = articleEntity.coverListMediumUrl;
    		if(options.isNotShowCover){
    			
    		}else{
        		elementStr += '<a href="/articles/get?guid='+articleEntity.guid+'" target="_blank"><img class="commonArticleCellCover" src="'+coverUrl+'"/></a>';
    		}

    	}
    	var articleContent = articleEntity.content;
    	var bMore = false;
    	if(articleContent.length > 110){
    		articleContent = articleContent.substr(0,111);
    		articleContent = articleContent + "……";
    		bMore = true;
    	}
    	articleContent = $.htmlspecialchars(articleContent);
    	
		if(options.isNotShowContent){
			
		}else{
			if(bMore){
				elementStr += '<p id="commonArticleCellContent'+mainId+'" class="commonArticleCellContent">'+articleContent+'<a id="commonArticleCellShowMore'+mainId+'" class="commonArticleCellShowMore" href="/articles/get?guid='+articleEntity.guid+'" target="_blank">(更多)</a></p>';
			}else{
		    	elementStr += '<p id="commonArticleCellContent'+mainId+'" class="commonArticleCellContent">'+articleContent+'</p>';
			}

		}

        var recommendCount = articleEntity.recommendCount;
        var remarkCount = articleEntity.remarkCount;
        var heatClass = "dragonfont-heartempty";
        
        var appendElement = "";
        if(articleEntity.problem_id > 0){
        	//是回答显示关注
        	if(articleEntity.problem != null){
                var followCount = articleEntity.problem.followCount;
                var followClass = "";
                if(articleEntity.problem.hasFollow == 1){
                   followClass = "dragonfont-unfollow";
                   followCount = "已关注｜" + followCount;
                }else{
                   followClass = "dragonfont-follow";
                   followCount = "关注问题｜" + followCount;
                }
            	appendElement = '<a id="commonArticleCellFollow'+mainId+'" href="javascript:;" class="linkGray commonArticleCellFollow">\
            	<span class="dragonfont '+followClass+'"></span>\
            	<span>'+followCount+'</span>\
            	</a>';
        	}


        }
        
        if(articleEntity.hasRecommend == 1){
        	recommendCount = '已推荐｜' + recommendCount;
        	heatClass = "dragonfont-heart";
        }else{
        	recommendCount = '推荐｜' + recommendCount;
        	heatClass = "dragonfont-heartempty";
        }
		if(options.isNotShowCount){
			
		}else{
	        elementStr += '<div class="commonArticleCellCountContainer">\
	            <a id="commonArticleCellRecommend'+mainId+'" href="javascript:;" class="linkBlue commonArticleCellRecommend">\
		        	<span class="dragonfont '+heatClass+'"></span>\
		        	<span>'+recommendCount+'</span>\
	        	</a>'+appendElement+'\
			    <a href="/articles/get?guid='+articleEntity.guid+'&source=remark" target="_blank" class="linkGray commonArticleCellRemark">\
			        <span class="dragonfont dragonfont-chatbubble"></span>\
			        <span>'+remarkCount+' 条评论</span>\
			    </a>\
	        </div>';
		}
		

        
        var timeStr = $.getMeaningfulTimeStr(articleEntity.createdAt);
        
		if(options.isNotShowTimeAndOpr){
			
		}else{
	        elementStr += '<div class="commonArticleCellOprContainer">\
	            <span>'+timeStr+'</span>\
	            <span id="commonArticleCellDot'+mainId+'" class="commonArticleCellDot">•</span>\
	            <a href="javascript:;" tabindex="0" id="commonArticleCellOpr'+mainId+'" class="linkGray commonArticleCellOpr"><span class="dragonfont dragonfont-ellipsis"></span></a>\
	        </div>';
		}
		


        elementStr += '</div>';
        var element = $(elementStr);
        return element;
    },
    installCommonProblemCellEffect:function(id,options){
    	//安装点关注相关
    	var hasLogin = options.hasLogin;
    	var problemEntity = options.problemEntity;
    	var redirectLoginUrl = options.redirectLoginUrl;
    	
        //问题关注操作
        $("#commonProblemCellFollow"+id).click(function(){
        	   if(!hasLogin){
                   window.location.href=redirectLoginUrl;
                   return;
               }
               if(problemEntity == null){
            	   return;
               }
               if(problemEntity.hasFollow == 0){
                      
            	   problemEntity.hasFollow  = 1;
            	   problemEntity.followCount = problemEntity.followCount  + 1;

                      $("#commonProblemCellFollow"+id + " > span:first-child").removeClass("dragonfont-follow").addClass('dragonfont-unfollow');
                      $("#commonProblemCellFollow"+id + " > span:eq(1)").text("已关注｜" + problemEntity.followCount );
                      //$("#feedProblemCellFollow"+arg).removeClass("feedProblemCellUnFollow").addClass("feedProblemCellAlreadyFollow");
                      var jRequest = jQuery.ajax({
                            type : "POST",  
                            contentType : "application/x-www-form-urlencoded",  
                            url : "/problems/followproblem",
                            data : "problem_id=" + problemEntity.id,
                            beforeSend:function(){
                                var currentReq = $("#commonProblemCellFollow"+id).data("jRequest");
                                if(currentReq != null){
                                    currentReq.abort();
                                }
                                      
                            },
                            complete:function(){
                                $("#commonProblemCellFollow"+id).data("jRequest",null);
                            },
                            success : function(data){

                            	problemEntity.followCount = data.followCount;
                                $("#commonProblemCellFollow"+id + " > span:eq(1)").text("已关注｜" + problemEntity.followCount );
                            },  
                            error : function(data){
                                if(data.statusText=="abort"){
                                    return;
                                }
                                problemEntity.hasFollow = 0;
                                problemEntity.followCount = problemEntity.followCount - 1;

                                $("#commonProblemCellFollow"+id + " > span:first-child").removeClass("dragonfont-unfollow").addClass('dragonfont-follow');
                                $("#commonProblemCellFollow"+id + " > span:eq(1)").text("关注问题｜" + problemEntity.followCount );
                                //$("#feedProblemCellFollow"+arg).removeClass("feedProblemCellAlreadyFollow").addClass("feedProblemCellUnFollow");
                            }});

                            $("#commonProblemCellFollow"+id).data("jRequest",jRequest);


                }else{
                	problemEntity.hasFollow  = 0;
                	problemEntity.followCount = problemEntity.followCount  - 1;

                      $("#commonProblemCellFollow"+id + " > span:first-child").removeClass("dragonfont-unfollow").addClass('dragonfont-follow');
                      $("#commonProblemCellFollow"+id + " > span:eq(1)").text("关注问题｜" + problemEntity.followCount );
                      //$("#feedProblemCellFollow"+arg).removeClass("feedProblemCellAlreadyFollow").addClass("feedProblemCellUnFollow");
                      var jRequest = jQuery.ajax({
                            type : "POST",  
                            contentType : "application/x-www-form-urlencoded",  
                            url : "/problems/unfollowproblem",
                            data : "problem_id=" + problemEntity.id,
                            beforeSend:function(){
                                var currentReq = $("#commonProblemCellFollow"+id).data("jRequest");
                                if(currentReq != null){
                                    currentReq.abort();
                                }
                                      
                            },
                            complete:function(){
                                $("#commonProblemCellFollow"+id).data("jRequest",null);
                            },
                            success : function(data){

                            	problemEntity.followCount = data.followCount;
                                $("#commonProblemCellFollow"+id + " > span:eq(1)").text("关注问题｜" + problemEntity.followCount );
                            },  
                            error : function(data){
                                if(data.statusText=="abort"){
                                    return;
                                }
                                problemEntity.hasFollow = 0;
                                problemEntity.followCount = problemEntity.followCount - 1;

                                $("#commonProblemCellFollow"+id + " > span:first-child").removeClass("dragonfont-follow").addClass('dragonfont-unfollow');
                                $("#commonProblemCellFollow"+id + " > span:eq(1)").text("已关注｜" + problemEntity.followCount );
                                //$("#feedProblemCellFollow"+arg).removeClass("feedProblemCellUnFollow").addClass("feedProblemCellAlreadyFollow");
                            }});

                            $("#commonProblemCellFollow"+id).data("jRequest",jRequest);
                   }


              });
    	
    },
    installCommonArticleCellEffect:function(id,options){
    	if($("#commonArticleCellShowMore" + id).length > 0){
    		//安装hover内容同步hover更多
    		$("#commonArticleCellContent" + id).hover(function(){
    			$("#commonArticleCellShowMore" + id).addClass("commonArticleCellShowMoreDynamic");
    		},function(){
    			$("#commonArticleCellShowMore" + id).removeClass("commonArticleCellShowMoreDynamic");
    		});
    		
    	} 
    	var articleEntity = options.articleEntity;
    	//安装原文链接跳转相关
    	$("#commonArticleCellContent" + id).on("click",function(){
    		window.open("/articles/get?guid="+articleEntity.guid);
    	});
    	
    	
    	//安装点赞相关
    	var hasLogin = options.hasLogin;
    	var redirectLoginUrl = options.redirectLoginUrl;
    	$("#commonArticleCellRecommend"+id).click(function(){
    		
    	  if(!hasLogin){
                window.location.href=redirectLoginUrl;
                return;
          }
    	  
          if(articleEntity == null){
              return;
          }
          if(articleEntity.hasRecommend == 0){
                
        	  articleEntity.hasRecommend = 1;
        	  articleEntity.recommendCount = articleEntity.recommendCount + 1;

                $("#commonArticleCellRecommend"+id + " > span:first-child").removeClass("dragonfont-heartempty").addClass('dragonfont-heart');
                $("#commonArticleCellRecommend"+id + " > span:eq(1)").text("已推荐｜" + articleEntity.recommendCount );
                var jRequest = jQuery.ajax({
                      type : "POST",  
                      contentType : "application/x-www-form-urlencoded",  
                      url : "/articles/recommend",
                      data : "articleId=" + articleEntity.id,
                      beforeSend:function(){
                          var currentReq = $("#commonArticleCellRecommend"+id).data("jRequest");
                          if(currentReq != null){
                              currentReq.abort();
                          }
                                
                      },
                      complete:function(){
                          $("#commonArticleCellRecommend"+id).data("jRequest",null);
                      },
                      success : function(data){

                    	  articleEntity.recommendCount = data.recommendCount;
                          $("#commonArticleCellRecommend"+id + " > span:eq(1)").text("已推荐｜" + articleEntity.recommendCount );
                      },  
                      error : function(data){
                          if(data.statusText=="abort"){
                              return;
                          }
                          articleEntity.hasRecommend = 0;
                          articleEntity.recommendCount = articleEntity.recommendCount - 1;

                          $("#commonArticleCellRecommend"+id + " > span:first-child").removeClass("dragonfont-heart").addClass('dragonfont-heartempty');
                          $("#commonArticleCellRecommend"+id + " > span:eq(1)").text("推荐｜" + articleEntity.recommendCount );
                      }});

                      $("#commonArticleCellRecommend"+id).data("jRequest",jRequest);


          }else{
        	  articleEntity.hasRecommend = 0;
        	  articleEntity.recommendCount = articleEntity.recommendCount - 1;

            $("#commonArticleCellRecommend"+id + " > span:first-child").removeClass("dragonfont-heart").addClass('dragonfont-heartempty');
            $("#commonArticleCellRecommend"+id + " > span:eq(1)").text("推荐｜" + articleEntity.recommendCount );
            var jRequest = jQuery.ajax({
                  type : "POST",  
                  contentType : "application/x-www-form-urlencoded",  
                  url : "/articles/unrecommend",
                  data : "articleId=" + articleEntity.id,
                  beforeSend:function(){
                      var currentReq = $("#commonArticleCellRecommend"+id).data("jRequest");
                      if(currentReq != null){
                          currentReq.abort();
                      }
                            
                  },
                  complete:function(){
                      $("#commonArticleCellRecommend"+id).data("jRequest",null);
                  },
                  success : function(data){

                	  articleEntity.recommendCount = data.recommendCount;
                      $("#commonArticleCellRecommend"+id + " > span:eq(1)").text("推荐｜" + articleEntity.recommendCount );
                  },  
                  error : function(data){
                      if(data.statusText=="abort"){
                          return;
                      }
                      articleEntity.hasRecommend = 1;
                      articleEntity.recommendCount = articleEntity.recommendCount + 1;

                      $("#commonArticleCellRecommend"+id + " > span:first-child").removeClass("dragonfont-heartempty").addClass('dragonfont-heart');
                      $("#commonArticleCellRecommend"+id + " > span:eq(1)").text("已推荐｜" + articleEntity.recommendCount );
                  }});

                  $("#commonArticleCellRecommend"+id).data("jRequest",jRequest);

             }
    	});
    	
    	//安装关注相关
    	var problemEntity = articleEntity.problem;
    	if(problemEntity != null){

    	
	        //问题关注操作
	        $("#commonArticleCellFollow"+id).click(function(){
	        	   if(!hasLogin){
	                   window.location.href=redirectLoginUrl;
	                   return;
	               }
	               if(problemEntity == null){
	            	   return;
	               }
	               if(problemEntity.hasFollow == 0){
	                      
	            	   problemEntity.hasFollow  = 1;
	            	   problemEntity.followCount = problemEntity.followCount  + 1;
	
	                      $("#commonArticleCellFollow"+id + " > span:first-child").removeClass("dragonfont-follow").addClass('dragonfont-unfollow');
	                      $("#commonArticleCellFollow"+id + " > span:eq(1)").text("已关注｜" + problemEntity.followCount );
	                      //$("#feedProblemCellFollow"+arg).removeClass("feedProblemCellUnFollow").addClass("feedProblemCellAlreadyFollow");
	                      var jRequest = jQuery.ajax({
	                            type : "POST",  
	                            contentType : "application/x-www-form-urlencoded",  
	                            url : "/problems/followproblem",
	                            data : "problem_id=" + problemEntity.id,
	                            beforeSend:function(){
	                                var currentReq = $("#commonArticleCellFollow"+id).data("jRequest");
	                                if(currentReq != null){
	                                    currentReq.abort();
	                                }
	                                      
	                            },
	                            complete:function(){
	                                $("#commonArticleCellFollow"+id).data("jRequest",null);
	                            },
	                            success : function(data){
	
	                            	problemEntity.followCount = data.followCount;
	                                $("#commonArticleCellFollow"+id + " > span:eq(1)").text("已关注｜" + problemEntity.followCount );
	                            },  
	                            error : function(data){
	                                if(data.statusText=="abort"){
	                                    return;
	                                }
	                                problemEntity.hasFollow = 0;
	                                problemEntity.followCount = problemEntity.followCount - 1;
	
	                                $("#commonArticleCellFollow"+id + " > span:first-child").removeClass("dragonfont-unfollow").addClass('dragonfont-follow');
	                                $("#commonArticleCellFollow"+id + " > span:eq(1)").text("关注问题｜" + problemEntity.followCount );
	                                //$("#feedProblemCellFollow"+arg).removeClass("feedProblemCellAlreadyFollow").addClass("feedProblemCellUnFollow");
	                            }});
	
	                            $("#commonArticleCellFollow"+id).data("jRequest",jRequest);
	
	
	                }else{
	                	problemEntity.hasFollow  = 0;
	                	problemEntity.followCount = problemEntity.followCount  - 1;
	
	                      $("#commonArticleCellFollow"+id + " > span:first-child").removeClass("dragonfont-unfollow").addClass('dragonfont-follow');
	                      $("#commonArticleCellFollow"+id + " > span:eq(1)").text("关注问题｜" + problemEntity.followCount );
	                      //$("#feedProblemCellFollow"+arg).removeClass("feedProblemCellAlreadyFollow").addClass("feedProblemCellUnFollow");
	                      var jRequest = jQuery.ajax({
	                            type : "POST",  
	                            contentType : "application/x-www-form-urlencoded",  
	                            url : "/problems/unfollowproblem",
	                            data : "problem_id=" + problemEntity.id,
	                            beforeSend:function(){
	                                var currentReq = $("#commonArticleCellFollow"+id).data("jRequest");
	                                if(currentReq != null){
	                                    currentReq.abort();
	                                }
	                                      
	                            },
	                            complete:function(){
	                                $("#commonArticleCellFollow"+id).data("jRequest",null);
	                            },
	                            success : function(data){
	
	                            	problemEntity.followCount = data.followCount;
	                                $("#commonArticleCellFollow"+id + " > span:eq(1)").text("关注问题｜" + problemEntity.followCount );
	                            },  
	                            error : function(data){
	                                if(data.statusText=="abort"){
	                                    return;
	                                }
	                                problemEntity.hasFollow = 0;
	                                problemEntity.followCount = problemEntity.followCount - 1;
	
	                                $("#commonArticleCellFollow"+id + " > span:first-child").removeClass("dragonfont-follow").addClass('dragonfont-unfollow');
	                                $("#commonArticleCellFollow"+id + " > span:eq(1)").text("已关注｜" + problemEntity.followCount );
	                                //$("#feedProblemCellFollow"+arg).removeClass("feedProblemCellUnFollow").addClass("feedProblemCellAlreadyFollow");
	                            }});
	
	                            $("#commonArticleCellFollow"+id).data("jRequest",jRequest);
	                   }
	
	
	           });
    	}
    }
	
	
	
	

});