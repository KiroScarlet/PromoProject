/**
 * form validation
 */
function formValidation(_element){
	if(_element.next('.help-block').length<1){
   		var $help_block=$('<span class="help-block"></span>');
   		$help_block.insertAfter(_element);
    }
	//	验证错误
	if(!_element.valid()){	
		_element.next('.help-block').children('.iconfont.success').remove();
		if(_element.next('.help-block').children('.iconfont').length<1){
	   		var $error_icon=$('<i class="iconfont fl error" >&#xe601;</i>');
	       	$error_icon.insertBefore(_element.next('.help-block').children('h5'));
	    }
	}
	//	验证成功
	else{
		_element.next('.help-block').children('.iconfont.error').remove();
		if(_element.next('.help-block').children('.iconfont').length<1){
	   		var $success_icon=$('<i class="iconfont fl success" >&#xe605;</i>');
	   		$success_icon.insertBefore(_element.next('.help-block').children('h5'));
        }
	}
}


function errorMessageShow(error,element){
	if(element.next('.help-block').length<1){
    	var $help_block=$('<span class="help-block"></span>');
    	$help_block.insertAfter(element);
    }
	error.appendTo(element.next('.help-block'));
	element.next('.help-block').children('.iconfont.success').remove();
	if(element.next('.help-block').children('.iconfont').length<1){
   		var $error_icon=$('<i class="iconfont fl error" >&#xe601;</i>');
       	$error_icon.insertBefore(element.next('.help-block').children('h5'));
    }
}