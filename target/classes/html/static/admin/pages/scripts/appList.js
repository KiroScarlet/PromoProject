var url = "/admin/applications/indexjson";
	
$('#dataTables-app').DataTable({
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
    	"url" : url,
    	"dataSrc" : "data.content"
    },
    columns : [   
         {"data" : "id"},  
         {"data" : "name"}, 
         {"data" : "iconUrl"}, 
         {"data" : "id"}
     ],
    columnDefs: [{
		//   指定第一列，从0开始，0表示第一列，1表示第二列……
     	targets: 2,
     	render: function(data, type, row) {
         	return "<img src='"+data+"' style='width:100px;' />";
         }
 	},{
     	targets: 3,
     	render: function(data, type, row) {
         	return "<a href='get?id="+data+"' class='btn btn-outline btn-circle red'><i class='fa fa-info-circle'></i> 查看详情</a>";
         	
         }
 	},
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

var AppAdd = function() {

    var handleAppAdd = function() {

        $('#form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                name: {
                    required: true
                },
                iconUrl: {
                    required: true,
                    url: true
                }
            },

            messages: {
            	name: {
                    required: "请输入名称"
                },
                iconUrl: {
                    required: "请输入下载url",
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

        	handleAppAdd();

        }

    };

}();

jQuery(document).ready(function() {
	AppAdd.init();
});

function addApp(){

	$.ajax( {    
	    url:'/admin/applications/create',    
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