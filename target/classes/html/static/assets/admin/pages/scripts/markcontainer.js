var MarkContainerOperate=function(){
	var HandleMarkContainerCreate=function(){
		addValidateRules();
		$('.markcontainer-create-form').validate({
			 	errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                startTime:{
	                	required: true
	                },
	                endTime:{
	                	required: true
	                },
	                image:{
	                	required: true
	                },
	                mark_id:{
	                	required: true
	                }
	            },
	            messages: {
	                startTime:{
	                	required: "请输入开始时间."
	                },
	                endTime:{
	                	required: "请输入结束时间."
	                },
	                image:{
	                	required: "上传标签配图哈."
	                },
	                mark_id:{
	                	required: "请输入标签Id."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-danger', $('.markcontainer-create-form')).show();
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
		
		
//		
//		$('.markcontainer-create-form').keypress(function (e) {
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
	
	
	var HandleMarkContainerUpdate=function(){
		
		addValidateRules();
		$('.event-create-form').validate({
			 	errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                startTime:{
	                	required: true
	                },
	                endTime:{
	                	required: true
	                },
	                mark_id:{
	                	required: true
	                }
	            },
	            messages: {
	                startTime:{
	                	required: "请输入开始时间."
	                },
	                endTime:{
	                	required: "请输入结束时间."
	                },
	                mark_id:{
	                	required: "请输入标签Id."
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
        	HandleMarkContainerUpdate();
        	HandleMarkContainerCreate();
        }
    }; 
}();

function disableSubmitButton(){
	$('.form-actions .blue-chambray').addClass('disabled');
}

function stringToTimeStamp(){
	var _now=new Date();
	var _today=_now.getFullYear()+'/'+(_now.getMonth()+1)+'/'+_now.getDate()+' ';
	var _startTime=_today+$('#mc_startTime input').val().replace(/(^\s*)|(\s*$)/g, "");
	var _endTime=_today+$('#mc_endTime input').val().replace(/(^\s*)|(\s*$)/g, "");
	var str_ts=(new Date(_startTime).getTime())/1000;
	var end_ts=(new Date(_endTime).getTime())/1000;
	$('#mc_startTime input').val(str_ts);
	$('#mc_endTime input').val(end_ts);
	
	var _isPush=$('#allPush .input-area #uniform-isPush span div').hasClass('checked')?1:0;
	$('#isPush').val(_isPush);
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
