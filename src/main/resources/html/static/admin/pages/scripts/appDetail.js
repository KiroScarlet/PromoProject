
var AppUpdate = function() {

    var handleAppUpdate = function() {

        $('#form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                name: {
                    required: true
                },
                icon_url: {
                    required: true,
                    url: true
                },
                ios_link: {
                    url: true
                },
                android_link: {
                    url: true
                }
            },

            messages: {
            	name: {
                    required: "请输入名称"
                },
                icon_url: {
                    required: "请输入下载url",
                    url: "请输入正确的url链接"
                },
                ios_link: {
                    url: "请输入正确的url链接"
                },
                android_link: {
                    url: "请输入正确的url链接"
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('input'));
            },

            submitHandler: function(form) {
                form.submit(); // form validation success, call ajax form submit
            }
        });

        $('.form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.form').validate().form()) {
                    $('#form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }

    return {
        //main function to initiate the module
        init: function() {

        	handleAppUpdate();

        }

    };

}();

jQuery(document).ready(function() {
	AppUpdate.init();
});

function updateApp(){

	$.ajax( {    
	    url:'/admin/applications/update',    
	    data:$('#form').serialize(),    
	    type:'POST',
	    processData:true,
	    contentType:"application/x-www-form-urlencoded",
	    success:function(data) {   
	    	alert(data.status);
	    	if(data.status=="success"){
	    		window.location.reload(true);
	    	}else if(data.status=="fail"){
	    		alert(data.data.errMessage);
	    	}
	     },    
	     error : function(e) {    
	          // view("异常！");    
	          alert(e);    
	     }    
	}); 
}