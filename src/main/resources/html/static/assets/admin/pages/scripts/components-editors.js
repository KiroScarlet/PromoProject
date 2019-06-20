var ComponentsEditors = function () {
    
    var handleWysihtml5 = function () {
        if (!jQuery().wysihtml5) {
            return;
        }

        if ($('.wysihtml5').size() > 0) {
            $('.wysihtml5').wysihtml5({
                "stylesheets": ["../../assets/global/plugins/bootstrap-wysihtml5/wysiwyg-color.css"]
            });
        }
    }

    var handleSummernote = function () {
        $('#summernote_1').summernote({
            height: 600,
            onImageUpload: function (files,editor, $editable) { //the onImageUpload API
                //img = sendFile(files[0]);
                // console.log(files);
                // img = files;
                data = new FormData();
                data.append("image", files[0]);
                //增加额外的参数
                // data.append("folder", '商品信息');
                // data.append("guid", $("#ID").val());

                $.ajax({
                    data: data,
                    type: "POST",
                    url: "/pic/files/upload",
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (json) {
                        var url = json.data.originFileUrl;
                        editor.insertImage($editable, url); // the insertImage API
                    },
                    fail:function(e){
                        alert(e);
                    }
                });
            }
        });
        //API:
        //var sHTML = $('#summernote_1').code(); // get code
        //$('#summernote_1').destroy(); // destroy
    }

    return {
        //main function to initiate the module
        init: function () {
            handleWysihtml5();
            handleSummernote();
        }
    };

}();