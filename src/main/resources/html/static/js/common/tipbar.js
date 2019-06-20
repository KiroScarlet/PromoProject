(function( $ ){  
	  

	  
	  var methods = {  
	    init : function( options ){
	    	var $this = this;
	    	options = $.extend( $.fn.drtipbar.options, options ); 
	    	return this.each(function(){
//	    		this.isShow = false;
	    		var $this = $(this);
	    		$this.data("isShow", false);
	    		$this.data("disappearTimer" , null);
//	    		this.disappearTimer = null;
	    	});

	    },
	    showMsg:function(msg){
	    	
	    	return this.each(function(){
		    	var $this = $(this);
		    	if($this.data("isShow")){
		    		//直接显示msg
		    		$("#drTipbarContent").text(msg);
		    		$this.data("isShow", true);
		    		if($this.data("disappearTimer") != null){
		    			clearTimeout($this.data("disappearTimer") );
		    			var disappearTimer=setTimeout(function(){
		    				//消失动画
		    				$this.removeClass("drTipShow").addClass("drTipHide");
						  	$this.one(($.getTransitionEnd()).end, function() { 
						  		$this.data("disappearTimer",null) 
						  		$this.data("isShow",false) 
						  	}); 
						  	
		    				
		    			},3000);
		    			$this.data("disappearTimer",disappearTimer) 
		    		}
		    		
		    	}else{
		    		$this.data("isShow", true);
		    		$("#drTipbarContent").text(msg);
		    		$this.removeClass("drTipHide").addClass("drTipShow");
		    		var disappearTimer=setTimeout(function(){
	    				//消失动画
	    				$this.removeClass("drTipShow").addClass("drTipHide");
					  	$this.one(($.getTransitionEnd()).end, function() { 
					  		$this.data("disappearTimer",null) 
					  		$this.data("isShow",false) 
					  	}); 
	    			},3000);
		    		$this.data("disappearTimer",disappearTimer) 
		    	}
	    	});

	    }

		

	  };  
	  

	  
	  $.fn.drtipbar = function( method ) {  
	      
	    // Method calling logic  
	    if ( methods[method] ) {  
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));  
	    } else if ( typeof method === 'object' || ! method ) {  
	      return methods.init.apply( this, arguments );  
	    } else {  
	      $.error( 'Method ' +  method + ' does not exist on jQuery.drtipbar' );  
	    }      
	    
	  };  
	  
	  $.fn.drtipbar.options = {};

	  
})( jQuery ); 