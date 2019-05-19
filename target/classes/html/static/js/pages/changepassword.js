$(document).ready(function() {
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

$("button#submit").click(function(){
	doChange();
});
$(document).keydown(function(e) {
	if (e.keyCode == 13) {
		doChange();
	}
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
	    		alert("修改成功");
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