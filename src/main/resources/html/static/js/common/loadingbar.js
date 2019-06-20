(function( $ ){  
	  
	  var methods = {  
	    init : function( options ){
	    	var $this = this;
	    	options = $.extend( $.fn.drloadingbar.options, options ); 
	    	$this.data("isLoading",false);
	    	$this.data("loadingLoop",false);
	    	return this.each(function(){

	    	});
	    	
	    },
	    startLoad:function(){
	    	
	    	return this.each(function(){
		    	var $this = $(this);
		    	function loading(){


					$this.removeClass("loadingBarLoadStaticPhase").addClass("loadingBarLoadPhase1");
					$this.one(($.getTransitionEnd()).end, function() { 
	
					//$this.one('webkitTransitionEnd', function() { 
						   $this.removeClass("loadingBarLoadPhase1").addClass("loadingBarLoadStaticPhase");
						   if($this.data("loadingLoop")){
							   $this.data("nextTimer",setTimeout(loading,500));
							   //setTimeout(loading,500);
							   //loading();
						   }else{
							   //console.log("已停止");
							   $this.data("isLoading",false);
						   }

							
						}); 
		    	}
		        if(!$this.data("isLoading")){
			    	$this.data("isLoading",true);
			    	$this.data("loadingLoop",true);
			    	//console.log("开始");
			    	loading();
				}else{
					//console.log("运行中");
				}

	    	});

	    },
	    stopLoad:function(){
	    	return this.each(function(){
		    	var $this = $(this);
		    	//console.log("结束");
		    	$this.data("loadingLoop", false);
		    	
		    	var timer = $this.data("nextTimer");
		    	if(timer != null){
		    		clearTimeout(timer);
		    		$this.data("nextTimer",null);
		    		$this.data("isLoading",false);
		    	}
	    	});
	    	

	    }
		

	  };  
	  

	  
	  $.fn.drloadingbar = function( method ) {  
	      
	    // Method calling logic  
	    if ( methods[method] ) {  
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));  
	    } else if ( typeof method === 'object' || ! method ) {  
	      return methods.init.apply( this, arguments );  
	    } else {  
	      $.error( 'Method ' +  method + ' does not exist on jQuery.drloadingbar' );  
	    }      
	    
	  };  
	  
	  $.fn.drloadingbar.options = {};

	  
})( jQuery ); 