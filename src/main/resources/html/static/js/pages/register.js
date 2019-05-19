/**
 * register.js
 */
$("button#submit").click(function(){
	doRegister();
});
$(document).keydown(function(e) {
	if (e.keyCode == 13) {
		doRegister();
	}
});

function doRegister(){
	var email = $("#signinForm #email").val();
	var password = $("#signinForm #password").val();
	var domain = $("#signinForm #personalDomain").val();
	var userName = $("#signinForm #userName").val();
	
	if(email=="" || password=="" || domain=="" || userName=="")
		return;
	
	$.ajax( {    
	    url:'/home/users/register',// 跳转到 action    
	    data:JSON.stringify(
	    {    
    		email : email,    
            password : password,
            personalDomain : domain,
            userName : userName
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