(function( $ ){  
	var methods = {
	    init : function( options ){
	    	var $this = this;
	    	options = $.extend( $.fn.spacepopover.options, options ); 
	    	return this.each(function(){
	    		var $this = $(this);
	    		var spaceEntity = $this.data("spaceData")||{};
	    		var idName = options.idName;
	    		var id = options.id;
	    		var shownFunc = options.shownFunc;
	    		var changeFollowFunc = options.changeFollowFunc;

	    		$this.data("data-id", id);
	    		$this.data("data-idName", idName);

	    		$this.popover({
                    placement: 'left',
                    trigger:"manual",
                    html : true, 
                    animation:false,
                    container:"body",
                    content: (function(arg){
                        return function(){
                            return $this.spacepopover("getPopoverHtml", spaceEntity, idName, id);
                        }
                    })(id)
                });

                $this.on("click", function(){
                	var $activePop = $(".popover.in");
        			if($activePop.length > 0){
        				$activePop.spacepopover("hidePopover");
        			}else{
        				$this.spacepopover("showPopover");
        			}
                });

				$this.on('shown.bs.popover', function(){
					if(shownFunc != null){
						return shownFunc;
					}else{
						$("#saveButton").on("click", function(e){
							$(this).attr('disabled', "true");

							var spaceEntity = $this.data("spaceData") || {};
							var $popContainer = $(this).parent();
							var totalCount = $popContainer.find(".totalCount").val();
								totalCount = $.trim(totalCount);

							if($.isEmptyObject(spaceEntity)){
								if(totalCount == ""){
									$("#drTipbar").drtipbar("showMsg", "开放工位不能为空");
									$(this).removeAttr('disabled');
									return false;
								}
								if(totalCount == 0){
									$("#drTipbar").drtipbar("showMsg", "开放工位必须大于0");
									$(this).removeAttr('disabled');
									return false;
								}
								$this.spacepopover("createAction", totalCount, $(this));
							} else {
								var spaceId = spaceEntity.id,
								  	useCount = spaceEntity.useCount;
								if(totalCount < useCount){
									$("#drTipbar").drtipbar("showMsg", "开放工位不能小于已售出工位");
									$(this).removeAttr('disabled');
									return false;
								}
								if(useCount > 0 && totalCount == spaceEntity.totalCount){
									return false;
								}
								if(totalCount == 0 || totalCount == ""){
									$this.spacepopover("deleteAction", spaceId, $(this));
								}else{
									$this.spacepopover("updateAction", spaceId, totalCount, $(this));
								}
							}
						});
					}
                });


	    	});

	    },
	    createAction: function(totalCount, $ele){
	    	var $this = $(this);
	    	var useDate = $this.data("useDate");
	    	var jRequest = jQuery.ajax({
                type : "POST",  
                contentType : "application/x-www-form-urlencoded",  
                url : "/spaces/create",
                data : "house_id=" + g_houseId + "&useDate=" + useDate + "&totalCount=" + totalCount,
                beforeSend:function(){
                    var currentReq = $this.data("jRequest");
                    if(currentReq != null){
                        currentReq.abort();
                    }  
                },
                complete:function(){
                    $this.data("jRequest",null);
                },
                success : function(data){
                	var countDiv = $this.find(".countDiv");
                	var slashSpan = $('<span/>').html("/");
                    var useSpan = $('<span/>');
						useSpan.addClass("useCount").html(data.useCount);
					var totalSpan = $('<span/>');
						totalSpan.addClass("totalCount").html(data.totalCount);

					countDiv
						.empty()
						.attr("class", "opened countDiv")
						.append(useSpan)
						.append(slashSpan)
						.append(totalSpan);
					
					$this.data('spaceData', data);

					$this.spacepopover("hidePopover");
                },  
                error : function(data){
                	$ele.removeAttr('disabled');
                	$("#drTipbar").drtipbar("showMsg", data.responseJSON.errMessage);
                    if(data.statusText=="abort"){
                        return;
                    }
                }
            });
			$this.data("jRequest", jRequest);
	    },
	    deleteAction: function(spaceId, $ele){
	    	var $this = $(this);
	    	var useDate = $this.data("useDate");
	    	var jRequest = jQuery.ajax({
                type : "POST",  
                contentType : "application/x-www-form-urlencoded",  
                url : "/spaces/delete",
                data : "space_id=" + spaceId,
                beforeSend:function(){
                    var currentReq = $this.data("jRequest");
                    if(currentReq != null){
                        currentReq.abort();
                    }  
                },
                complete:function(){
                    $this.data("jRequest",null);
                },
                success : function(data){
                	var countDiv = $this.find(".countDiv");
					countDiv
						.empty()
						.attr("class", "opening countDiv")
						.html("等待开放预约")
					
					$this.data('spaceData', data);

					$this.spacepopover("hidePopover");
                },  
                error : function(data){
                	$ele.removeAttr('disabled');
                	$("#drTipbar").drtipbar("showMsg", data.responseJSON.errMessage);
                    if(data.statusText=="abort"){
                        return;
                    }
                }
            });
			$this.data("jRequest", jRequest);
	    },
	    updateAction: function(spaceId, totalCount, $ele){
	    	var $this = $(this);
	    	var useDate = $this.data("useDate");
	    	var jRequest = jQuery.ajax({
                type : "POST",  
                contentType : "application/x-www-form-urlencoded",  
                url : "/spaces/update",
                data : "totalCount=" + totalCount + "&space_id=" + spaceId,
                beforeSend:function(){
                    var currentReq = $this.data("jRequest");
                    if(currentReq != null){
                        currentReq.abort();
                    }  
                },
                complete:function(){
                    $this.data("jRequest",null);
                },
                success : function(data){

                	$this.find(".useCount").html(data.useCount);
                	$this.find(".totalCount").html(data.totalCount);
					
					$this.data('spaceData', data);

					$this.spacepopover("hidePopover");
                },  
                error : function(data){
                	$ele.removeAttr('disabled');
                	$("#drTipbar").drtipbar("showMsg", data.responseJSON.errMessage);
                    if(data.statusText=="abort"){
                        return;
                    }
                }
            });
			$this.data("jRequest", jRequest);
	    },
	    showPopover:function(){
	    	var $this = $(this),
    		    spaceEntity = $this.data("spaceData") || {},
	    	    id = $this.data("data-id"),
	    	    idName = $this.data("data-idName");

    		$this.popover("show");

    		var popDiv = $("#"+idName+id);
	    	popDiv.find(".totalCount").val(spaceEntity.totalCount || 0);
	    	popDiv.find(".useCount").html(spaceEntity.useCount || 0);
	    	popDiv.find(".availableCount").html(spaceEntity.availableCount || 0);
	    },
	    hidePopover:function(){
	    	var $this = $(this);
	    	$this.popover("hide");
	    },
	    getPopoverHtml:function(spaceEntity, idName, id){
	    	var totalCount = spaceEntity.totalCount || 0,
	    		useCount = spaceEntity.useCount || 0,
	    		availableCount = spaceEntity.availableCount || 0;
	    		        
	    	return '<div id="' + idName + id + '" class="spacePopoverContentContainer">\
			            <p class="total">\
			                <span class="totalTitle">开放工位</span>\
			                <input class="totalCount rightPos" value="' + totalCount + '" onpaste="return false;" onkeypress="numberLimit()" />\
			                <div class="clear"></div>\
			            </p>\
			            <p class="use">\
			                <span class="useTitle">已售出工位</span>\
			                <span class="useCount rightPos">' + useCount + '</span>\
			                <div class="clear"></div>\
			            </p>\
			            <p class="available">\
			                <span class="availableTitle">剩余工位</span>\
			                <span class="availableCount rightPos">' + availableCount + '</span>\
			                <div class="clear"></div>\
			            </p>\
			            <button class="btnBlue" id="saveButton">保存</button>\
			        </div>';
		}
	};
	  

	  
	  $.fn.spacepopover = function( method ) {  
	      
	    // Method calling logic  
	    if ( methods[method] ) {  
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));  
	    } else if ( typeof method === 'object' || ! method ) {  
	      return methods.init.apply( this, arguments );  
	    } else {  
	      $.error( 'Method ' +  method + ' does not exist on jQuery.spacepopover' );  
	    }      
	    
	  };  
	  
	  $.fn.spacepopover.options = {};

	  
})( jQuery ); 