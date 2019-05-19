(function($) {
	$(document).ready(function(){
		var currentPathName = window.location.pathname;
		// 格式化粘贴文本控件初始化
		$("#createPersonallettersContent").drcontenteditable("init");
		// 取消
		$("#createPersonallettersCancel").on("click", function(){
			$("#createPersonallettersModel").modal("hide");
		});
		// 统计字数
	    $("#createPersonallettersContent").on("keydown cut copy paste", function(){
	       setTimeout(function(){
	         var inputText = $("#createPersonallettersContent").drcontenteditable("getContent");
	         $("#createPersonallettersModel").modal("adjustBackdrop");
	         if(inputText.length > 3000){
	            $("#personallettersContentLimit").show();
	            $("#personallettersContentLimit").css("color","red");
	            $("#personallettersContentLimit").text(inputText.length + " / 3000");
	         }else if(inputText.length > 2500){
	            $("#personallettersContentLimit").show();
	            $("#personallettersContentLimit").css("color","#838383");
	            $("#personallettersContentLimit").text(inputText.length + " / 3000");
	         }else{
	            $("#personallettersContentLimit").hide();
	         }
	       }, 0);
	    });
		// 提交
		$("#createPersonallettersSubmit").on("click", function(){
			var toUserId = $(".drUserSpanContainer[data-userid]").attr("data-userid");
			var content = $("#createPersonallettersContent").drcontenteditable("getContent");
	       
	        if(!toUserId){
	          $("#drTipbar").drtipbar("showMsg","请选择收件人");
	          return;
	        }
	        if(content.length == 0){
	          $("#drTipbar").drtipbar("showMsg","私信内容不能为空");
	          return;
	        }
	        if(content.length > 3000){
	          $("#drTipbar").drtipbar("showMsg","私信内容最多3000个字");
	          return;
	        }

	        content = encodeURIComponent(content);

	        $("#createPersonallettersSubmit").attr("disabled",true);
	        jQuery.ajax({
	            type : "POST",  
	            contentType : "application/x-www-form-urlencoded",  
	            url : "/personalletters/create",
	            data : "content="+content+"&toUserId="+toUserId,
	            beforeSend : function(request) {
	            	$('#loadingBar').drloadingbar("startLoad");
	            },
	            success : function(data){
	            	$("#createPersonallettersContent").empty();
	            	$('#loadingBar').drloadingbar("stopLoad");
	            	$("#drTipbar").drtipbar("showMsg","发送成功");
	            	$("#createPersonallettersModel").modal("hide");
	            	$('#createPersonallettersModel').on('hidden.bs.modal', function (e) {
	            		$("#createPersonallettersSubmit").removeAttr("disabled");
	            	});
	            	if(currentPathName == "/personalletters/enterlistconversations" || currentPathName == "/personalletters/enterlistletters"){
	            		window.location.reload();
	            	}
	            },  
	            error : function(data){
	              $('#loadingBar').drloadingbar("stopLoad");
	              $("#createPersonallettersSubmit").removeAttr("disabled");
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
})(jQuery);