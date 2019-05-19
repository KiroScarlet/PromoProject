var ActivityOperate=function(){
	var HandleActivityCreate=function(){
		
		addValidateRules();
		
		$('.event-create-form').validate({
			 	errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                title: {
	                    required: true
	                },
	                startTime:{
	                	required: true
	                },
	                endTime:{
	                	required: true
	                },
	                longitude:{
	                	required: true,
	                	number:true
	                },
	                latitude:{
	                	required:true,
	                	number:true
	                },
	                maxDistance: {
	                    required: true,
	                	number:true
	                },
	                content:{
	                	required: true
	                },
	                image: {
	                    required: true
	                },
	                image2: {
	                    required: true
	                }
	            },
	            messages: {
	                title: {
	                    required: "请输入活动名称."
	                },
	                startTime:{
	                	required: "请输入开始时间."
	                },
	                endTime:{
	                	required: "请输入结束时间."
	                },
	                longitude:{
	                	required: "请输入经度",
	                	number:"输入数字哦亲"
	                },
	                latitude:{
	                	required: "请输入纬度",
	                	number:"输入数字哦亲"
	                },
	                maxDistance: {
	                    required: "请输入最远距离",
	                	number:"输入数字哦亲"
	                },
	                content:{
	                	required: "请简要描述下活动内容哦"
	                },
	                image: {
	                    required: "上传活动配图哈."
	                },
	                image2: {
	                    required: "上传预告配图哈."
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
					var isPush=$('#allPush .input-area #uniform-isPush span div').hasClass('checked')?1:0;
					$('#allPush input').val(isPush);
	                form.submit(); // form validation success, call ajax form submit
	            }
		});
//		$('.event-create-form').keypress(function (e) {
//          if (e.which == 13) {
//              if ($('.event-create-form').validate().form()) {
//              	disableSubmitButton();
//              	stringToTimeStamp();
//              	var isPush=$('#allPush .input-area #uniform-isPush span div').hasClass('checked')?1:0;
//					$('#allPush input').val(isPush);
//                  $('.event-create-form').submit(); //form validation success, call ajax form submit
//              }
//              return false;
//          }
//	    });
	};
	
	var HandleActivityUpdate=function(){
		
		addValidateRules();
		
		$('.event-create-form').validate({
			 	errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                title: {
	                    required: true
	                },
	                startTime:{
	                	required: true
	                },
	                endTime:{
	                	required: true
	                },
	                longitude:{
	                	required: true,
	                	number:true
	                },
	                latitude:{
	                	required:true,
	                	number:true
	                },
	                maxDistance: {
	                    required: true,
	                	number:true
	                },
	                content:{
	                	required: true
	                }
	            },
	            messages: {
	                title: {
	                    required: "请输入活动名称."
	                },
	                startTime:{
	                	required: "请输入开始时间."
	                },
	                endTime:{
	                	required: "请输入结束时间."
	                },
	                longitude:{
	                	required: "请输入经度",
	                	number:"输入数字哦亲"
	                },
	                latitude:{
	                	required: "请输入纬度",
	                	number:"输入数字哦亲"
	                },
	                maxDistance: {
	                    required: "请输入最远距离",
	                	number:"输入数字哦亲"
	                },
	                content:{
	                	required: "请简要描述下活动内容哦"
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
					appendAction();
	                form.submit(); // form validation success, call ajax form submit
	            }
		});
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
        init: function (flag) {
        	if(flag){
        		HandleActivityUpdate();
        	}
        	else{
        		HandleActivityCreate();
        	}
        }
    }; 
}();

function disableSubmitButton(){
	$('.form-actions .purple-studio').addClass('disabled');
}

function stringToTimeStamp(){
	var _startTime=$('#act_startTime input').val().replace(/(^\s*)|(\s*$)/g, "").replace('-','/')+':00';
	var _endTime=$('#act_endTime input').val().replace(/(^\s*)|(\s*$)/g, "").replace('-','/')+':00';
	var str_ts=(new Date(_startTime).getTime())/1000;
	var end_ts=(new Date(_endTime).getTime())/1000;
	$('#act_startTime input').val(str_ts);
	$('#act_endTime input').val(end_ts);
}

function appendAction(){
	var _id=$('#selected_id_value').val();
	var _title=$('#act_title input').val();
	var _content=$('#act_content textarea').val();
	var _startTime=$('#act_startTime input').val();
	var _endTime=$('#act_endTime input').val();
	var _lng=$('#act_lng input').val();
	var _lat=$('#act_lat input').val();
	var _maxDis=$('#act_maxDis input').val();
	var _isPush=$('#allPush .input-area #uniform-isPush span div').hasClass('checked')?1:0;
	var _pushContent=$('#pushContent').val();
	$('.event-create-form')
	.attr('action','/activities/update?id='+_id+'&title='+_title+'&startTime='+_startTime+'&endTime='+_endTime+'&longitude='+_lng+'&latitude='+_lat+'&maxDistance='+_maxDis+'&isPush='+_isPush+'&pushContent='+_pushContent);
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
