function disableSubmitButton(){
	$('.form-actions .blue-chambray').addClass('disabled');
}

var AdvertisementOperate=function(){
	var HandleAdvertisementCreate=function(){
		$('.event-create-form').validate({
			 	errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                type: {
	                    required: true
	                },
	                url: {
	                    required: true
	                },
	                updateTime:{
	                	required: true
	                },
	                content:{
	                	required: true
	                },
	                image: {
	                    required: true
	                }
	            },
	            messages: {
	                url: {
	                    required: "请输入需要跳转的URL."
	                },
	                updateTime:{
	                	required: "请输入更新时间，格式：更新于X月XX日"
	                },
	                content:{
	                	required: "请简要描述下更新内容哦"
	                },
	                image: {
	                    required: "上传banner图哈."
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

	                form.submit(); // form validation success, call ajax form submit
	            }
		});
//		$('.event-create-form').keypress(function (e) {
//          if (e.which == 13) {
//              if ($('.event-create-form').validate().form()) {
//              	
//                  $('.event-create-form').submit(); //form validation success, call ajax form submit
//              }
//              return false;
//          }
//	    });
	};
	
	
	var HandleAdvertisementUpdate=function(){
		
		addValidateRules();
		
		$('.event-create-form').validate({
			 	errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                type: {
	                    required: true
	                },
	                url: {
	                    required: true
	                },
	                updateTime:{
	                	required: true
	                },
	                content:{
	                	required: true
	                }
	            },
	            messages: {
	                url: {
	                    required: "请输入需要跳转的URL."
	                },
	                updateTime:{
	                	required: "请输入更新时间，格式：更新于X月XX日"
	                },
	                content:{
	                	required: "请简要描述下更新内容哦"
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
	            	appendAction();
	            	form.submit(); // form validation success, call ajax form submit
	            }
		});
//		$('.event-create-form').keypress(function (e) {
//          if (e.which == 13) {
//              if ($('.event-create-form').validate().form()) {
//              	disableSubmitButton();
//              	appendAction();
//                  $('.event-create-form').submit(); //form validation success, call ajax form submit
//              }
//              return false;
//          }
//	    });
	};
	
	return {
        //main function to initiate the module
        init: function (flag) {
        	if(flag){
        		HandleAdvertisementUpdate();
        	}
        	else{
        		HandleAdvertisementCreate();
        	}
        }
    }; 
}();

function appendAction(){
	var _id=$('#selected_id_value').val();
	var _type=$('.select2me option').val();
	var _url=$('#ad_url').val();
	var _update_time=$('#update_time').val();
	var _update_content=$('#update_content').val();
	var _isPush=$('#allPush .input-area #uniform-isPush span div').hasClass('checked')?1:0;
	var _pushContent=$('#pushContent').val();
	$('.event-create-form')
	.attr('action','/advertisements/update?id='+_id+'&type='+_type+'&url='+_url+'&updateTime='+_update_time+'&isPush='+_isPush+'&pushContent='+_pushContent);
}

function addValidateRules(){
	$(":submit").click(function(){
		var _isPush=$('#allPush .input-area #uniform-isPush span div').hasClass('checked')?true:false;
		if(_isPush){
			$('#pushContent').rules('add',{
				required:true,
				messages:{
					required: "请简要描述下推送内容哦"
				}
			});
		}
	});
}