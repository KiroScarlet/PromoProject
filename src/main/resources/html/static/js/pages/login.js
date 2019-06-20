/**
 * login.js
 */
$("button#submit").click(function(){
	doLogin();
});
$(document).keydown(function(e) {
	if (e.keyCode == 13) {
		doLogin();
	}
});

function doLogin(){
	var email = $("#loginForm #email").val();
	var password = $("#loginForm #password").val();
	//alert(email + "  "+password);
	if(email=="" || password=="")
		return;

	$.ajax( {    
	    url:'/home/users/login',// 跳转到 action    
	    data:JSON.stringify(
	    {    
    		email : email,    
            password : password
	    }),    
	    type:'post',    
	    cache:false,    
	    dataType:'json',
	    contentType:"application/json;charset=utf-8",
	    success:function(data) {   
	    	if(data.status=="success"){
	    		location.href = "/home/index/index";
	    	}else if(data.status=="fail"){
	    		alert(data.data.errMessage);
	    	}
	     },    
	     error : function() {    
	          // view("异常！");    
	          alert("异常！");    
	     }    
	}); 
	
}