(function( $ ){  
	  
	  var methods = {  
	    init : function( options ){
	    	var $this = this;
	    	options = $.extend( $.fn.drnavbar.options, options ); 
	    	
	    	$this.data('previousScroll', 0);

			$('#drNavbarUser').click(function(e){
				var isVisible = $(".drNavbarPopover").is(":visible");
				if(isVisible){
					$this.drnavbar("hideDropDownMenu");
				}else{
					$('#drNavbarUser').trigger("drNavbarPopoverFocus");
				}
			});
			
			//focusout在safari下无法获取related target，不得已加入mousedown check focus out
			function installMouseDown(){
				$(document).one("mousedown",function(e){
					var target = e.target;
					if(target != null){
						if(target==$('#drNavbarUser')[0]){
							return;
						}
						var targetParents = $(target).parents();
						for(var i = 0; i < targetParents.length;i++){
							var parent = targetParents[i];
							if(parent == $(".drNavbarDropDownMenu")[0]){
								installMouseDown();
								return;
							}
						}
					}
					$('#drNavbarUser').trigger("click");
				});
			}
			$('#drNavbarUser').on("drNavbarPopoverFocus",function(){
				$this.drnavbar("showDropDownMenu");
				setTimeout(installMouseDown,200);
			});
			//设置
			$("#drNavbarDropdownSetting").hover(function(){
				$("#drNavbarDropdownSetting span").css("color","black");
			},function(){
				$("#drNavbarDropdownSetting span").css("color","");
			});
			//退出
			$("#drNavbarDropdownLogout").hover(function(){
				$("#drNavbarDropdownLogout span").css("color","black");
			},function(){
				$("#drNavbarDropdownLogout span").css("color","");
			});

	    
	    showDropDownMenu:function(){
			$(".drNavbarPopover").show();
			var deviceType = $.getDeviceWidthType();
			var deviceWidth = $.getDeviceWidth();
			var deviceHeight = $.getDeviceHeight();
			if(deviceType == 1){
				var top = 71;
				var width = deviceWidth;
				var height = deviceHeight - top;
				
				var arrowTop = -14;
				var arrowLeft = width - 38;
				$(".drNavbarPopover").css("top",top+"px");
				$(".drNavbarPopover").css("width",width+"px");
				$(".drNavbarPopover").css("height",height+"px");
				$(".drNavbarPopover").css("left","0px");
				$(".drNavbarPopoverArrow").css("left",arrowLeft+"px");
				
			}
		},
		hideDropDownMenu:function(){
			$(".drNavbarPopover").hide();
			$(".drNavbarPopover").css("top","");
			$(".drNavbarPopover").css("width","");
			$(".drNavbarPopover").css("height","");
			$(".drNavbarPopover").css("left","");
			$(".drNavbarPopoverArrow").css("left","");

		}
		

	  };  
	  
	 
	  
	  $.fn.drnavbar = function( method ) {  
	      
	    // Method calling logic  
	    if ( methods[method] ) {  
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));  
	    } else if ( typeof method === 'object' || ! method ) {  
	      return methods.init.apply( this, arguments );  
	    } else {  
	      $.error( 'Method ' +  method + ' does not exist on jQuery.drnavbar' );  
	    }      
	    
	  };  
	  
	  $.fn.drnavbar.options = {notificationUnReadTotalCount:0, personallettersUnReadTotalCount:0};
	  
})( jQuery ); 