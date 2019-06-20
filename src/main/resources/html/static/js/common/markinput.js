(function( $ ){  
	  

	  
	  var methods = {  
	    init : function( options ){
	    	var $this = this;
	    	options = $.extend( $.fn.markinput.options, options ); 
	    	return this.each(function(){
	    		var $thisMarkInput = $(this);
	    		var markData = options.markData;
	    		if(markData == null){
	    			markData = [];
	    		}
	    		$thisMarkInput .data("markData",markData);
	    		var adjustLeftComponent = options.adjustLeftComponent;
	    		if(adjustLeftComponent != null){
	    			$thisMarkInput .data("adjustLeftComponent",adjustLeftComponent);
	    		}
	    		var $appendVar = $('<div id="drMarkInputContentContainer"><div id="drMarkInputContent" contentEditable="true" data-placeHolder="添加至多 3 个标签（输入标签后按回车确定）"></div></div>\
							        <div id="drMarkInputErrorPopoverContainer" style="display:none;">\
							            <div  id="drMarkInputErrorPopover">\
							              <p id="drMarkInputErrorPopoverContent">输入内容过长</p>\
							            </div>\
							        </div>\
							        <div id="drMarkInputPopoverSearchContainer" style="display:none;">\
							            <ul id="drMarkInputPopoverSearch">\
							            </ul>\
							        </div>');
	    		$thisMarkInput.append($appendVar);

	    		for(var i = 0; i < markData.length; i++){
		    		$element = $("<span></span>");
			        $element.text(markData[i]);
			        $element.addClass("drMarkSpanContainer");
			        $element.insertBefore($("#drMarkInputContentContainer"));
	    		}

	    		if(markData.length > 0){
					$("#drMarkInputContent")[0].setAttribute("data-placeholder","");
	    		}else{
					$("#drMarkInputContent")[0].setAttribute("data-placeholder","添加至多 3 个标签（输入标签后按回车确定）");
	    		}




				function isMarkInputErrorShown(){
				    return $("#drMarkInputContent").data('bs.popover').tip().hasClass('in');
				}
				function isMarkSearchResShown(){
					return $("#drMarkInputContentContainer").data('bs.popover').tip().hasClass('in');
				}

		        function deleteOneMark($element){
		        	var markData = $thisMarkInput.data("markData");
			        if(markData.length <= 0){
			            return;
			        }
			        if($element == null){
			            //删除最后一个
			            $(".drMarkSpanContainer")[markData.length - 1].remove();
			            markData.splice(markData.length-1,1);
			            if(markData.length > 0){
			                $("#drMarkInputContent")[0].setAttribute("data-placeholder","");
			            }else{
			                $("#drMarkInputContent")[0].setAttribute("data-placeholder","添加至多 3 个标签（输入标签后按回车确定）");
			            }
			        }else{
			            
			            var tagName = $element.text();
			             
			            for(var i = 0; i < markData.length; i++){
			              	if(markData[i] == tagName){
			                   markData.splice(i,1);
			                	break;
			              	}
			            }
			            if(markData.length > 0){
			               $("#drMarkInputContent")[0].setAttribute("data-placeholder","");
			            }else{
			               $("#drMarkInputContent")[0].setAttribute("data-placeholder","添加至多 3 个标签（输入标签后按回车确定）");
			            }
			            $element.remove();
			         }
		        }
		        function addOneMark(markName){
		        	var markData = $thisMarkInput.data("markData");
		        	if(markName == ""){
			            return;
			        }else if(markName.length > 30){
			            //提示长度
			            $("#drMarkInputErrorPopoverContent").text("标签最大字数为 30 个");
		                if(isMarkInputErrorShown()){

		                }else{
		    	        	$("#drMarkInputContent").popover("show");
		                }
			            return;
			        }

			        for(var i = 0; i < markData.length; i++){
			            if(markName == markData[i]){
			                //提示重复
				            $("#drMarkInputErrorPopoverContent").text("已经添加了该标签");
			                if(isMarkInputErrorShown()){

			                }else{
			    	        	$("#drMarkInputContent").popover("show");
			                }
			                return;
			            }
			        }

			        markData.push(markName);
			    	 if(markData.length > 0){
			    		 $("#drMarkInputContent")[0].setAttribute("data-placeholder","");
			    	 }else{
			    		 $("#drMarkInputContent")[0].setAttribute("data-placeholder","添加至多 3 个标签（输入标签后按回车确定）");
			    	 }
			    	 
			        $element = $("<span></span>");
			        $element.text(markName);
			        $element.addClass("drMarkSpanContainer");
			        $element.insertBefore($("#drMarkInputContentContainer"));
			        $("#drMarkInputContent").text("");
		          	if(isMarkSearchResShown()){
		            	$("#drMarkInputContentContainer").popover("hide");
		          	}
		        }

				function searchMarkKeyword(keyword){
					if(keyword == null || keyword == ""){
		                if(isMarkSearchResShown()){
		                	$("#drMarkInputContentContainer").popover("hide");
		                }
					    return;
					}
					keyword = encodeURIComponent(keyword);
			        var jRequest = $.ajax({
			            type : "GET",  
			            contentType : "application/x-www-form-urlencoded",  
			            url : "/marks/searchforchoose?q="+keyword,
			            beforeSend:function(){
			               $('#loadingBar').drloadingbar("startLoad");
			               var currentReq = $("#drMarkInputContentContainer").data("jRequest");
		                   if(currentReq != null){
		                       currentReq.abort();
		                   }

			            },
			            success : function(data){
			                $('#loadingBar').drloadingbar("stopLoad");

			                var dataLength = data.length;
			                if(dataLength > 0){
			                   if(isMarkSearchResShown()){
			                	    $("#drMarkInputContentContainer").popover("hide");
		                      }
			                  $("#drMarkInputPopoverSearch").empty();
			                   for(var i = 0; i < dataLength; i++){
			                	    $element = $("<li class='drMarkInputPopoverSearchList'><span><strong>"+data[i].name+"</strong>（"+data[i].useCount+"）</span></li>");
			                	    $element.appendTo($("#drMarkInputPopoverSearch"));
			                   }
			                   


			                   
			                   $("#drMarkInputContentContainer").popover("show");
			                }else{
			                    if(isMarkSearchResShown()){
			                    	$("#drMarkInputContentContainer").popover("hide");
			                    }
			                }

			                
			            },  
			            error : function(data){
			       
		                    if(data.statusText=="abort"){
		                        return;
		                    }
		                    $('#loadingBar').drloadingbar("stopLoad");

			           }});
			        $("#drMarkInputContentContainer").data("jRequest",jRequest);
				}
			    $("#drMarkInputContent").on("paste",function(e){
			    	var markData = $thisMarkInput.data("markData");

				    if(markData.length >= 3){
				        //提示只能输入3个标签
			            $("#drMarkInputErrorPopoverContent").text("只能添加 3 个标签");
		                if(isMarkInputErrorShown()){

		                }else{
		    	        	$("#drMarkInputContent").popover("show");
		                }

			            
				    	e.preventDefault();
				        return
				    }
		            if(isMarkInputErrorShown()){
				        $("#drMarkInputContent").popover("hide");
		            }
					var pasteText = e.originalEvent.clipboardData.getData("text/plain");
					pasteText = pasteText.replace(/\r\n/g,"");
					pasteText = pasteText.replace(/\r/g,"");
					pasteText = pasteText.replace(/\n/g,"");
					document.execCommand("insertHTML", false, pasteText);
					e.preventDefault();

					
					searchMarkKeyword($(this).text());
			    });



			    $("#drMarkInputContent").on("blur",function(e){
		            if(isMarkInputErrorShown()){
		            	$("#drMarkInputContent").popover("hide");
		            }
		            if(isMarkSearchResShown()){

		                setTimeout(function(){
		                    //延迟200毫秒触发，否则若点击在content cell内部则立马被hide掉，无法触发
		                	$("#drMarkInputContentContainer").popover("hide");
		                },200);

		            }
		    	});


			    $("#drMarkInputContent").on("keydown",function(e){

			    	var markData = $thisMarkInput.data("markData");
				    var keyCode = e.keyCode;
				    if(keyCode == 8 || keyCode == 46){
				    	if(isMarkInputErrorShown()){
		    	        	$("#drMarkInputContent").popover("hide");
		                }
				        if($(this).text() == "" && markData.length > 0){
				        	deleteOneMark();
					  	     
				        	e.preventDefault();
					        return;   
				        }
				    }
				    if(markData.length >= 3){
				    	$(this).text("");
				        //提示只能输入3个标签
			            $("#drMarkInputErrorPopoverContent").text("只能添加 3 个标签");
		                if(isMarkInputErrorShown()){

		                }else{
		    	        	$("#drMarkInputContent").popover("show");
		                }

				    	e.preventDefault();
				        return;
				    }
		            if(isMarkInputErrorShown()){
				        $("#drMarkInputContent").popover("hide");
		            }
				    

		        if(keyCode == 13 || keyCode == 108){
				    e.preventDefault();
		            if(isMarkInputErrorShown()){
		    		      $("#drMarkInputContent").popover("hide");
		            }

				        //处理标签
		            var content = "";
		            if(isMarkSearchResShown() && $(".drMarkInputPopoverSearchList.isActive").length > 0){

		                content = $(".drMarkInputPopoverSearchList.isActive span strong").text();
		                $("#drMarkInputContentContainer").popover("hide");
		            }else{
		    		        content = $(this).text();
		            }
		            var checkContent = $.trim(content);
		            if(checkContent != ""){
		                addOneMark(content);
		            }

				    return;
				 }else if(keyCode==40){
				        //下
		                if(isMarkSearchResShown()){
		                	if($(".drMarkInputPopoverSearchList.isActive").length > 0){
		                		if($(".drMarkInputPopoverSearchList.isActive")[0].nextSibling == null){
		                		    //指向第一个
		                			$(".drMarkInputPopoverSearchList.isActive").removeClass("isActive");
		                			$(".drMarkInputPopoverSearchList").first().addClass("isActive");
		                		}else{
		                		    //指向下一个
		                			var nextNode = $($(".drMarkInputPopoverSearchList.isActive")[0].nextSibling);
		                			$(".drMarkInputPopoverSearchList.isActive").removeClass("isActive");
		                			nextNode.addClass("isActive");
		            
		                		}
		                	}else{
		                	    //指向第一个
		                		$(".drMarkInputPopoverSearchList").first().addClass("isActive");
		                	}
		               	 e.preventDefault();
		                }
				        
				 }else if(keyCode==38){
				        //上
		                if(isMarkSearchResShown()){
		                	if($(".drMarkInputPopoverSearchList.isActive").length > 0){
		                		if($(".drMarkInputPopoverSearchList.isActive")[0].previousSibling == null){
		                		    //指向最后一个
		                			$(".drMarkInputPopoverSearchList.isActive").removeClass("isActive");
		                			$(".drMarkInputPopoverSearchList").last().addClass("isActive");
		                		}else{
		                		    //指向上一个
		                			var previousNode = $($(".drMarkInputPopoverSearchList.isActive")[0].previousSibling);
		                			$(".drMarkInputPopoverSearchList.isActive").removeClass("isActive");
		                			previousNode.addClass("isActive");
		           
		                		}
		                	}else{
		                	    //指向最后一个
		                		$(".drMarkInputPopoverSearchList").last().addClass("isActive");
		                	}
		               	 e.preventDefault();
		                 }
		               
				        
				 }else{
					    var $this = $(this);
					    setTimeout(function(){
						    searchMarkKeyword($this.text());
					    }, 100);
			     }




			    });

		       $("#drMarkInputContent").popover({
		            trigger:"manual",
		            html : true, 
		            animation:false,
		            placement:"top",
		            content: function(){
		                return $('#drMarkInputErrorPopoverContainer').html();
		            }
		       });

		        $("#drMarkInputContent").on('hide.bs.popover', function(e){
		            if(e.target != $("#drMarkInputContent")[0]){
		         	    return;
		            }
		            $('#drMarkInputErrorPopoverContainer').append($('#drMarkInputErrorPopover'));


		        });
		        $("#drMarkInputContent").on('shown.bs.popover', function(e){
		            if(e.target != $("#drMarkInputContent")[0]){
		         	    return;
		            }
		           $('#drMarkInputErrorPopoverContainer #drMarkInputErrorPopover').remove();
		        });



		        $("#drMarkInputContentContainer").popover({
		            trigger:"manual",
		            html : true, 
		            animation:false,
		            placement:"bottom",
		            content: function(){
		                return $('#drMarkInputPopoverSearchContainer').html();
		            }
		        });

		        $("#drMarkInputContentContainer").on('hide.bs.popover',function(e){
		            if(e.target != $("#drMarkInputContentContainer")[0]){
		     	    	return;
		            }
		            $('#drMarkInputPopoverSearchContainer').append($('#drMarkInputPopoverSearch'));


		        });
		        $("#drMarkInputContentContainer").on('shown.bs.popover',function(e){
			        if(e.target != $("#drMarkInputContentContainer")[0]){
			         	 return;
			        }
			    	var topVal = parseInt($('#drMarkInputContentContainer+.popover').css('top').substr(0,$('#drMarkInputContentContainer+.popover').css('top').length - 2));
			    	$('#drMarkInputContentContainer+.popover').css('top',(topVal - 15 ) + 'px');
			    	  //重新计算left
			    	var left = 0;
			    	var adjustLeftComponent = $thisMarkInput.data("adjustLeftComponent");
			    	if(adjustLeftComponent == null){
			    	    left = $("#drMarkInputContentContainer").offset().left;
			    	}else{
			    		var left1 = $("#drMarkInputContentContainer").offset().left;
			    		var left2 = adjustLeftComponent.offset().left;
			    		left = left1 - left2;
			    	}

					//var left = $("#markInputContentContainer+.popover").css('left');
			    	

			    	var inText = $("#drMarkInputContent").text();
			    	  
			    	$('#drMarkInputContentContainer+.popover').css('left', (left - 20) + 'px');
			    	$('#drMarkInputContentContainer+.popover .arrow').css('left', (20 + 14 * inText.length / 2 ) + 'px');

			    	  
			        $('#drMarkInputPopoverSearchContainer #drMarkInputPopoverSearch').remove();

			        $("#drMarkInputPopoverSearch").off("mouseenter");
			        $("#drMarkInputPopoverSearch").off("mouseleave");
			        $("#drMarkInputPopoverSearch").off("click");
			        $("#drMarkInputPopoverSearch").on("mouseenter",".drMarkInputPopoverSearchList",function(){
			      	  if(!$(this).hasClass("isActive")){
                      	$(".drMarkInputPopoverSearchList.isActive").each(function(){
                      		$(this).removeClass("isActive");
                      	});
                      	$(this).addClass("isActive");
			      	  }
			        });
			        $("#drMarkInputPopoverSearch").on("mouseleave",".drMarkInputPopoverSearchList",function(){
			        	$(this).removeClass("isActive"); 
			        });
			        $("#drMarkInputPopoverSearch").on("click",".drMarkInputPopoverSearchList.isActive",function(){
			      	   //选中输入
			      	   var content = $(this).find("span strong").text();
			      	   addOneMark(content);
			      	   $("#drMarkInputContent").focus();
			        });
		      	});


      

		        
      

		        $thisMarkInput.on("click",".drMarkSpanContainer",function(e){

		    	  deleteOneMark($(this));
		  	     
		        });




	    	});

	    },
	    getMarkArray:function(){
	    	return this.data("markData");
	    }
	};
	  

	  
	  $.fn.markinput = function( method ) {  
	      
	    // Method calling logic  
	    if ( methods[method] ) {  
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));  
	    } else if ( typeof method === 'object' || ! method ) {  
	      return methods.init.apply( this, arguments );  
	    } else {  
	      $.error( 'Method ' +  method + ' does not exist on jQuery.markinput' );  
	    }      
	    
	  };  
	  
	  $.fn.markinput.options = {};

	  
})( jQuery ); 