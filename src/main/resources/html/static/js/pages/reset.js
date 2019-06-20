/**
 * reset.js
 */
$("button#submit").click(function(){
	doReset();
});
$(document).keydown(function(e) {
	if (e.keyCode == 13) {
		doReset();
	}
});

function doReset(){
	var email = $("#resetForm #email").val();
	if(email=="")
		return;
	
	$.ajax( {    
	    url:'/home/users/resetpassword',// 跳转到 action    
	    data:$('#resetForm').serialize(),    
	    type:'POST',
	    processData:true,
	    contentType:"application/x-www-form-urlencoded",
	    success:function(data) {   
	    	alert(data.status);
	    	if(data.status=="success"){
	    		location.href = "/home/user/validate.jsp";
	    	}else if(data.status=="fail"){
	    		alert(data.data.errMessage);
	    	}
	     },    
	     error : function(e) {    
	          // view("异常！");    
	          alert(e);    
	     }    
	}); 
	
}