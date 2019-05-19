var TopicOperate=function(){
	var HandleTopicCreate=function(){
		
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
	                content:{
	                	required: true
	                },
	                image: {
	                    required: true
	                }
	            },
	            messages: {
	                title: {
	                    required: "请输入话题名称."
	                },
	                startTime:{
	                	required: "请输入开始时间."
	                },
	                endTime:{
	                	required: "请输入结束时间."
	                },
	                content:{
	                	required: "请简要描述下话题内容哦"
	                },
	                image: {
	                    required: "上传话题配图哈."
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
		
		
//		
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
	
	var HandleTopicUpdate=function(){
		
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
	                content:{
	                	required: true
	                }
	            },
	            messages: {
	                title: {
	                    required: "请输入话题名称."
	                },
	                startTime:{
	                	required: "请输入开始时间."
	                },
	                endTime:{
	                	required: "请输入结束时间."
	                },
	                content:{
	                	required: "请简要描述下话题内容哦"
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
        init: function (flag) {
        	if(flag){
        		HandleTopicUpdate();
        	}
        	else{
        		HandleTopicCreate();
        	}
        }
    }; 
}();

function disableSubmitButton(){
	$('.form-actions .green-seagreen').addClass('disabled');
}

function stringToTimeStamp(){
	var _now=new Date();
	var _today=_now.getFullYear()+'/'+(_now.getMonth()+1)+'/'+_now.getDate()+' ';
	var _startTime=_today+$('#tp_startTime input').val().replace(/(^\s*)|(\s*$)/g, "");
	var _endTime=_today+$('#tp_endTime input').val().replace(/(^\s*)|(\s*$)/g, "");
	var str_ts=(new Date(_startTime).getTime())/1000;
	var end_ts=(new Date(_endTime).getTime())/1000;
	$('#tp_startTime input').val(str_ts);
	$('#tp_endTime input').val(end_ts);
}

function appendAction(){
	var _id=$('#selected_id_value').val();
	var _title=$('#tp_title input').val();
	var _content=$('#tp_content textarea').val();
	var _startTime=$('#tp_startTime input').val();
	var _endTime=$('#tp_endTime input').val();
	var _isPush=$('#allPush .input-area #uniform-isPush span div').hasClass('checked')?1:0;
	var _pushContent=$('#pushContent').val();
	$('.event-create-form')
	.attr('action','/topics/update?id='+_id+'&title='+_title+'&startTime='+_startTime+'&endTime='+_endTime+'&isPush='+_isPush+'&pushContent='+_pushContent);
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