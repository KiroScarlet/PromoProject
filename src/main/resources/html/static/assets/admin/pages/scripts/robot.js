function disableSubmitButton(){
	$('.form-actions .blue').addClass('disabled');
}

var RobotCreate = function () {
	
	var handleRobotCreate = function() {
            
		$('.event-create-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                telPhone: {
	                    required: true,
	                    number: true
	                },
	                password: {
	                    required: true
	                },
	                userName: {
	                    required: true,
	                    maxlength:12
	                },
	                birthday: {
	                    required: true
	                },
	                image: {
	                    required: true
	                }
	            },

	            messages: {
	                telPhone: {
	                    required: "请输入手机号",
	                    number: "请输入数字"
	                },
	                password: {
	                    required: "请输入密码"
	                },
	                userName: {
	                    required: "请输入昵称",
	                    maxlength: "昵称最多12个字符"
	                },
	                birthday: {
	                    required: "请输入出生日期"
	                },
	                image: {
	                    required: "请上传照片"
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-danger', $('.event-create-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-area'));
	            },

	            submitHandler: function (form) {
					disableSubmitButton();
					stringToTimeStamp();
	                form.submit(); // form validation success, call ajax form submit
	            }
	        });

	};
    
    return {
        //main function to initiate the module
        init: function () {
	       	handleRobotCreate();
        }

    };

}();

function stringToTimeStamp(){
	var _now=new Date();
	var str_birthday=$('#birthday input').val().replace('-','/')+' 00:00:00';
	var str_ts=(new Date(str_birthday).getTime())/1000;
	$('#birthday input').val(str_ts);
}