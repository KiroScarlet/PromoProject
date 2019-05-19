function changeType() {
	if ($('#select_search_type option:selected').val() == "text") {
		document.getElementById("search_input").name="keyword";
	}else if ($('#select_search_type option:selected').val() == "id") {
		document.getElementById("search_input").name="user_id";
	};
}

function disableSubmitButton(){
	$('.form-actions .blue').addClass('disabled');
}

var EventUpdate = function () {

	var handleHotEventUpdate = function() {
            
		$('.hot-event-basic-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                event_id: {
	                    required: true,
	                    number: true
	                }
	            },

	            messages: {
	                event_id: {
	                    required: "请输入需要置顶的事件ID",
	                    number: "请输入合法的数字"
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-danger', $('.hot-event-basic-form')).show();
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

//	        $('.hot-event-basic-form').keypress(function (e) {
//	            if (e.which == 13) {
//	                if ($('.hot-event-basic-form').validate().form()) {
//	                    $('.hot-event-basic-form').submit(); //form validation success, call ajax form submit
//	                }
//	                return false;
//	            }
//	        });
	};

	var handleEventCreate = function() {
            
		$('.event-create-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                longitude: {
	                    required: true,
	                    number: true
	                },
	                latitude: {
	                    required: true,
	                    number: true
	                },
	                province: {
	                    required: true
	                },
	                city: {
	                    required: true
	                },
	                district: {
	                    required: true
	                },
	                content: {
	                    required: true
	                },
	                image: {
	                    required: true
	                }
	            },

	            messages: {
	                longitude: {
	                    required: "请输入经度",
	                    number: "请输入合法的数字"
	                },
	                latitude: {
	                    required: "请输入纬度",
	                    number: "请输入合法的数字"
	                },
	                province: {
	                    required: "请输入省份"
	                },
	                city: {
	                    required: "请输入城市"
	                },
	                district: {
	                    required: "请输入行政区域"
	                },
	                content: {
	                    required: "请输入文本"
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
	                form.submit(); // form validation success, call ajax form submit
	            }
	        });

//	        $('.event-create-form').keypress(function (e) {
//	            if (e.which == 13) {
//	                if ($('.event-create-form').validate().form()) {
//	                	disableSubmitButton();
//	                    $('.event-create-form').submit(); //form validation success, call ajax form submit
//	                }
//	                return false;
//	            }
//	        });
	};
    
    return {
        //main function to initiate the module
        init: function () {
        	
        	handleHotEventUpdate();
	       	handleEventCreate();
        }

    };

}();