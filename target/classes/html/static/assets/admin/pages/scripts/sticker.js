var StickerOperate=function(){
	var HandleStickerCreate=function(){
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
	                limitEndTime:{
	                	required:true
	                },
	                image: {
	                    required: true
	                },
	                cover: {
	                    required: true
	                },
	                exampleImage: {
	                    required: true
	                }
	            },

	            messages: {
	                name: {
	                    required: "为你的贴纸取个名字吧"
	                },
	                content: {
	                    required: "描述下贴纸的内涵吧"
	                },
	                limitEndTime:{
	                	required:"限时贴纸，加个失效时间哦亲"
	                },
	                image: {
	                    required: "上传贴纸原图哈"
	                },
	                cover: {
	                    required: "上传贴纸封面哈"
	                },
	                exampleImage: {
	                    required: "上传贴纸预览图哈"
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
	
	var HandleStickerPager=function(allPage,page){
		$('#common_sticker_pager').bootpag({
            paginationClass: 'pagination',
            next: '<i class="fa fa-angle-right"></i>',
            prev: '<i class="fa fa-angle-left"></i>',
            total: allPage,
            page: page,
           	maxVisible:20
        }).on("page",function(event,num){
   			window.location.href='/stickers?type=普通&page='+num;
        });
        
        $('#timeLimit_sticker_pager').bootpag({
            paginationClass: 'pagination',
            next: '<i class="fa fa-angle-right"></i>',
            prev: '<i class="fa fa-angle-left"></i>',
            total: allPage,
            page: page,
           	maxVisible:20
        }).on("page",function(event,num){
   			window.location.href='/stickers?type=限时&page='+num;
        });
	};
	return {
        //main function to initiate the module
        init: function (flag,allPage,page) {
        	if(flag){
        		HandleStickerCreate();
        	}
        	else{
        		HandleStickerPager(allPage,page);
        	}
        }
    }; 
}();
