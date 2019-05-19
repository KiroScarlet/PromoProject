var MarkOperate=function(){
	var HandleMarkUpdate=function(){
		
		$('.event-create-form').validate({
			 	errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                title: {
	                    required: true
	                },
	                color:{
	                	required:true,
	                	maxlength:7
	                },
	                sort: {
	                    required: true,
	                    number:true
	                },
	                content:{
	                	required: true
	                },
	                image:{
	                	required: true
	                }
	            },
	            messages: {
	                title: {
	                    required: "请输入标签名称."
	                },
	                color:{
	                	required:"请选择标签颜色.",
	                	maxlength:'最多输入7个字符.'
	                },
	                sort: {
	                    required: "请输入排序数字",
	                    number:"输入数字哦亲"
	                },
	                content:{
	                	required: "请简要描述下标签内容哦"
	                },
	                image:{
	                	required: "请上传标签icon"
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
	                form.submit(); // form validation success, call ajax form submit
	            }
		});
		
		
//		
//		$('.event-create-form').keypress(function (e) {
//          if (e.which == 13) {
//              if ($('.event-create-form').validate().form()) {
//              	disableSubmitButton();
//              	stringToTimeStamp();
//              	appendAction();
//                  $('.event-create-form').submit(); //form validation success, call ajax form submit
//              }
//              return false;
//          }
//	    });
	};
	
	
	var HandleMarkCreate=function(){
		
		$('.event-create-form').validate({
			 	errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                title: {
	                    required: true
	                },
	                image:{
	                	required: true
	                }
	            },
	            messages: {
	                title: {
	                    required: "请输入标签名称."
	                },
	                image:{
	                	required: "请上传标签icon"
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
	                form.submit(); // form validation success, call ajax form submit
	            }
		});
		
		
//		
//		$('.event-create-form').keypress(function (e) {
//          if (e.which == 13) {
//              if ($('.event-create-form').validate().form()) {
//              	disableSubmitButton();
//              	stringToTimeStamp();
//              	appendAction();
//                  $('.event-create-form').submit(); //form validation success, call ajax form submit
//              }
//              return false;
//          }
//	    });
	};
	
	
	return {
        //main function to initiate the module
        init: function () {
        	HandleMarkUpdate();
        	HandleMarkCreate();
        }
    }; 
}();

function disableSubmitButton(){
	$('.form-actions .yellow-lemon').addClass('disabled');
}

