var PackageOperate=function(){
	var HandlePackageCreate=function(){
		$('.event-create-form').validate({
			 	errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                name: {
	                    required: true
	                },
	                content: {
	                    required: true
	                },
	                totalSize:{
	                	required:true,
	                	number:true
	                },
	                image: {
	                    required: true
	                },
	                stickerIds:{
	                	required: true
	                }
	            },

	            messages: {
	                name: {
	                    required: "为你的主题取个名字吧"
	                },
	                content: {
	                    required: "描述下主题的内涵吧"
	                },
	               	totalSize:{
	                	required:"表忘了输入主题包的大小哦",
	                	number:"输入数字哦亲"
	                },
	                image: {
	                    required: "上传主题包封面哈"
	                },
	                stickerIds: {
	                    required: "选择合适的贴纸加入主题包啦"
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
//                  $('.event-create-form').submit(); //form validation success, call ajax form submit
//              }
//              return false;
//          }
//	    });
	};
	
	var HandlePackagePager=function(allPage,page){
		$('#packages_pager').bootpag({
            paginationClass: 'pagination',
            next: '<i class="fa fa-angle-right"></i>',
            prev: '<i class="fa fa-angle-left"></i>',
            total: allPage,
            page: page,
           	maxVisible:20
       }).on("page",function(event,num){
   			window.location.href='/packages?page='+num;
        });
	};
	return {
        //main function to initiate the module
        init: function (flag,allPage,page) {
        	if(flag){
        		HandlePackageCreate();
        	}
        	else{
        		HandlePackagePager(allPage,page);
        	}
        }
    }; 
}();
