(function( $ ){  
	  
	  var methods = {  
	    init : function( options ){
	    	var $this = this;
	    	options = $.extend( $.fn.createproblem.options, options ); 

	    	return this.each(function(){
	    			  
	    			  $("#createProblemMarkContainer").markinput("init",{adjustLeftComponent:$("#problemModalBody")});



	    			  $("#createProblemSummary").on("keydown",function(e){
	    			        var keyCode = e.keyCode;
	    			        if(keyCode == 13){
	    			            e.preventDefault();
	    			        }
	    			        
	    			    });
	    			    $("#createProblemSummary").on("paste",function(e){
	    			      var pasteText = e.originalEvent.clipboardData.getData("text/plain");
	    			      pasteText = pasteText.replace(/\r\n/g,"");
	    			      pasteText = pasteText.replace(/\r/g,"");
	    			      pasteText = pasteText.replace(/\n/g,"");
	    			      document.execCommand("insertHTML", false, pasteText);
	    			      e.preventDefault();
	    			    });

	    			    //统计字数
	    			    $("#createProblemSummary").on("keydown cut copy paste",function(){
	    			       setTimeout(function(){
	    			           
	    			    	 $("#createProblemModel").modal("adjustBackdrop");
	    			    	 
	    			         var inputText = $("#createProblemSummary").text();
	    			         if(inputText.length > 500){
	    			            $("#problemSummaryLimit").show();
	    			            $("#problemSummaryLimit").css("color","red");
	    			            $("#problemSummaryLimit").text(inputText.length + " / 500");
	    			         }else if(inputText.length > 350){
	    			            $("#problemSummaryLimit").show();
	    			            $("#problemSummaryLimit").css("color","#838383");
	    			            $("#problemSummaryLimit").text(inputText.length + " / 500");
	    			         }else{
	    			            $("#problemSummaryLimit").hide();
	    			         }

	    			       },0);
	    			    });

	    			    $("#createProblemContent").on("keydown cut copy paste",function(){
	    			       setTimeout(function(){
	    			         var inputText = $("#createProblemContent").val();
	    			         if(inputText.length > 100){
	    			            $("#problemContentLimit").show();
	    			            $("#problemContentLimit").css("color","red");
	    			            $("#problemContentLimit").text(inputText.length + " / 100");
	    			         }else if(inputText.length > 80){
	    			            $("#problemContentLimit").show();
	    			            $("#problemContentLimit").css("color","#838383");
	    			            $("#problemContentLimit").text(inputText.length + " / 100");
	    			         }else{
	    			            $("#problemContentLimit").hide();
	    			         }

	    			       },0);
	    			    });


	    			    $("#createProblemCancel").on("click",function(){
	    			      $("#createProblemModel").modal("hide");
	    			    });

	    			    $("#createProblemSubmit").on("click",function(){
	    			        var problemContent = $("#createProblemContent").val();
	    			        var problemSummary = $("#createProblemSummary").text();
	    			        if(problemContent.length <= 0){
	    			          $("#drTipbar").drtipbar("showMsg","请输入问题");
	    			          return;
	    			        }
	    			        if(problemContent.length > 100){
	    			          $("#drTipbar").drtipbar("showMsg","问题内容最多100个字");
	    			          return;
	    			        }
	    			        if(problemSummary.length > 500){
	    			          $("#drTipbar").drtipbar("showMsg","问题描述最多500个字");
	    			          return;
	    			        }

	    			        //验证是否以问号结尾
	    			        var lastStr = problemContent.substr(problemContent.length - 1,problemContent.length);
	    			        if(lastStr != '?' && lastStr != '？'){
	    			          $("#drTipbar").drtipbar("showMsg","问题必须以问号结尾");
	    			          return;
	    			        }

	    			        problemContent = encodeURIComponent(problemContent);
	    			        problemSummary = encodeURIComponent(problemSummary);

	    			        var markArr = $("#createProblemMarkContainer").markinput("getMarkArray");
	    			        if(markArr.length == 0){
	    			        	$("#drTipbar").drtipbar("showMsg","问题必须带标签");
	    			        	return;
	    			        }
	    			        var markDataString = JSON.stringify(markArr);
	    			        markDataString = encodeURIComponent(markDataString);

	    			       $("#createProblemSubmit").attr("disabled",true);
	    			        jQuery.ajax({
	    			            type : "POST",  
	    			            contentType : "application/x-www-form-urlencoded",  
	    			            url : "/problems/create",
	    			            data : "content="+problemContent+"&summary="+problemSummary+"&markstr="+markDataString,
	    			          beforeSend: function(request) {

	    			           $('#loadingBar').drloadingbar("startLoad");
	    			         },
	    			            success : function(data){

	    			              //disable不能去除，在页面跳转前会有再被点的风险
	    			                $.drWindowLocation("/problems/get?guid="+data.guid,true);
	    			                


	    			            },  
	    			            error : function(data){
	    			              $('#loadingBar').drloadingbar("stopLoad");
	    			              $("#createProblemSubmit").removeAttr("disabled");
	    			            
	    			                if(data.responseJSON == null){
	    			                    $("#drTipbar").drtipbar("showMsg","网络不给力");
	    			                 }else{
	    			                    if(data.responseJSON.errCode != null){
	    			                       $("#drTipbar").drtipbar("showMsg",data.responseJSON.errMessage);
	    			                                   
	    			                    }else{
	    			                       $("#drTipbar").drtipbar("showMsg","网络不给力");
	    			                    }
	    			                 }
	    			  
	    			               
	    			                }
	    			            });

	    			    });
	    			    
	    			    
	    	});
	    	
	    },
	    
	    modalShow:function(){
	    	
	    	$("#createProblemModel").modal("show");
	    }
	    

		

	  };  
	  

	  
	  $.fn.createproblem = function( method ) {  
	      
	    // Method calling logic  
	    if ( methods[method] ) {  
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));  
	    } else if ( typeof method === 'object' || ! method ) {  
	      return methods.init.apply( this, arguments );  
	    } else {  
	      $.error( 'Method ' +  method + ' does not exist on jQuery.createproblem' );  
	    }      
	    
	  };  
	  
	  $.fn.createproblem.options = {};

	  
})( jQuery ); 