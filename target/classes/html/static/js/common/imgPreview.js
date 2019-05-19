jQuery.fn.extend({
    imgPreview: function (opts) {
        var _self = this,
            _this = $(this);
        opts = jQuery.extend({
            id: "imgPreview",
            width: '100px',
            height: '100px',
            imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
            callback: function () {}
        }, opts || {});
        $("#" + opts.id).css({
			'width': opts.width,
			'height': opts.height
        });
        _self.getObjectURL = function (file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        };
        _this.change(function () {
            if (this.value) {
                if (!RegExp("\.(" + opts.imgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert("选择文件错误,图片类型必须是" + opts.imgType.join("，") + "中的一种");
                    this.value = "";
                    return false;
                }
                $("#" + opts.id).attr('src', _self.getObjectURL(this.files[0]));
                opts.callback();
            }
        })
    }
});