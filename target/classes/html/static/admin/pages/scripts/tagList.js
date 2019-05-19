var url = "/admin/tags/indexjson";

function refreshList(a){
	if(a!=0){
		var urlTmp = url + "?categoryId=" + a;
	}else var urlTmp = url;
	
	$('#dataTables-tag').DataTable({
		"bPaginate": true,
	    "bLengthChange": false,
	    "bSort": false,
	    "bFilter": true,
	    "bAutoWidth": true,
	    "bStateSave": true,
	    "bServerSide": false,
	    "bProcessing":true,
	    "iDisplayLength": 20,
	    "searching": true,
	    "deferRender": true,
	    "bDestroy":true,
	    ajax:{
	    	"url" : urlTmp,
	    	"dataSrc" : "data"
	    },
	    columns : [   
	         {"data" : "id"},  
	         {"data" : "name"} , 
	         {"data" : "useCount"},
	         {"data" : "categoryVO.name"}
	     ],
	    columnDefs: [
	    {
	        //屏蔽警告
	    	 sDefaultContent : '',
	         aTargets : [ '_all' ]
	    }
	    ],
	    language: {
	        "sProcessing": "处理中...",
	        "sLengthMenu": "显示 _MENU_ 项结果",
	        "sZeroRecords": "没有匹配结果",
	        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
	        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
	        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
	        "sInfoPostFix": "",
	        "sSearch": "搜索:",
	        "sUrl": "",
	        "sEmptyTable": "表中数据为空",
	        "sLoadingRecords": "载入中...",
	        "sInfoThousands": ",",
	        "oPaginate": {
	            "sFirst": "首页",
	            "sPrevious": "上页",
	            "sNext": "下页",
	            "sLast": "末页"
	        },
	        "oAria": {
	            "sSortAscending": ": 以升序排列此列",
	            "sSortDescending": ": 以降序排列此列"
	        }
	    }
	        
	});	
}

function loadCategories(){
	$.ajax( {    
	    url:'/admin/tags/indexcategoryjson',      
	    type:'GET',
	    success:function(data) {
	    	if(data.status=="success"){
	    		for(var i=0;i<data.data.length;i++){
	    			var h = "<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>";
	    			$('#category-container').append(h);
	    			$('#category-container2').append(h);
	    		}
	    		$('select').select2();
	    		refreshList(data.data[0].id);
	    		
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

var TagAdd = function() {

    var handleTagAdd = function() {

        $('#form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                name: {
                    required: true
                }
            },

            messages: {
            	name: {
                    required: "请输入名称"
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

            handleTagAdd();

        }

    };

}();

jQuery(document).ready(function() {
	TagAdd.init();
});

function addTag(){

	$.ajax( {    
	    url:'/admin/tags/create',    
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