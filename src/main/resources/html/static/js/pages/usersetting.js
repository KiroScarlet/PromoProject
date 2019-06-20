//表单验证
$(document).ready(function() {
    $('#profileForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	nickname: {
        		trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '快想个昵称'
                    },
                    stringLength: {
                        min: 2,
                        max: 20,
                        message: '2到20个字符'
                    }
                }
            },
            domain: {
            	trigger: 'blur',
                validators: {
                    stringLength: {
                        min: 1,
                        max: 200,
                        message: '最多200个字符'
                    }
                }
            },
            intro: {
            	trigger: 'blur',
                validators: {
                	stringLength: {
                        min: 1,
                        max: 140,
                        message: '最多140个字符'
                    }
                }
            }
        }
    });
    
    $('#changePassForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	oldpass: {
        		trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '原密码还没有输噢'
                    },
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: '6到20个字符'
                    }
                }
            },
            newpass: {
            	trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '快输个新密码吧'
                    },
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: '6到20个字符'
                    }
                }
            },
            newpass_confirm: {
            	trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: '再输一次新密码，别打错了'
                    },
                    identical: {
                        field: 'newpass',
                        message: '两次新密码输入的不一样'
                    },
                	stringLength: {
                        min: 6,
                        max: 20,
                        message: '6到20个字符'
                    }
                }
            }
        }
    });
});

//个人资料的请求
$("button#submit_profile").click(function(){
	doUpdate();
});
$(document).keydown(function(e) {
	if (e.keyCode == 13 && $('#profile-panel').hasClass("active")) {
		doUpdate();
	}else if (e.keyCode == 13 && $('#password-panel').hasClass("active")) {
		doChange();
	}
});

function doUpdate(){
	var nickname = $("#profileForm #nickname").val();
	var domain = $("#profileForm #domain").val();
	var intro = $("#profileForm #intro").val();
	var avatarID = "";
	
	$.ajax( {    
	    url:'/home/users/usersetting',// 跳转到 action    
	    data:JSON.stringify(
	    {    
	    	userName : nickname,    
	    	personalDomain : domain,
	    	word : intro,
	    	avatarId : avatarID
	    }),    
	    type:'post',    
	    cache:false,    
	    dataType:'json',
	    contentType:"application/json;charset=utf-8",
	    success:function(data) {   
	    	if(data.status=="success"){
	    		alert("资料修改成功!");
	    		window.location.reload(true);
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

//修改密码的请求
$("button#submit_password").click(function(){
	doChange();
});

function doChange(){
	var oldPass = $("#changePassForm #oldpass").val();
	var newPass = $("#changePassForm #newpass").val();
	
	$.ajax( {    
	    url:'/home/users/changepassword',// 跳转到 action    
	    data:JSON.stringify(
	    {    
	    	oldPassword : oldPass,    
	    	newPassword : newPass
	    }),    
	    type:'post',    
	    cache:false,    
	    dataType:'json',
	    contentType:"application/json;charset=utf-8",
	    success:function(data) {   
	    	if(data.status=="success"){
	    		alert("密码修改成功!");
	    		window.location.reload(true);
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