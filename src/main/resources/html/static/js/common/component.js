(function(old) {
  $.fn.attr = function() {
    if(arguments.length === 0) {
      if(this.length === 0) {
        return null;
      }

      var obj = {};
      $.each(this[0].attributes, function() {
        if(this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }

    return old.apply(this, arguments);
  };
})($.fn.attr);

jQuery.extend({
	drWindowLocation:function(href,isShownLoading){
		if(isShownLoading){
			$('#loadingBar').drloadingbar("startLoad");
		}
		window.location.href=href;
	},
	adjustNode:function(node,isRoot){
		var childNodes = node.children();
 		var tagName = node[0].tagName.toLowerCase();
 		if(tagName == null){
 			//普通字符串节点，不转化
 			return;
 		}
 		
		if(childNodes.length > 0){
			//不是叶子节点，先去调整所有子节点
			for(var i = 0; i < childNodes.length; i++){
				$.adjustNode($(childNodes[i]),false);
			}
		}else{
			//叶子节点
	 		var display = $.getElementDefaultDisplay(tagName);
	 		if(display == "block" || display=="list-item"){
	 			if(tagName == "p"){
	 				//本身就是段落，不替换
	 			}else if(tagName == "hr"){
	 				//分割线，不替换
	 			}else{
	 				//替换成段落
	 				if(node.hasClass("drimgCaption")){
	 					//不替换
	 				}else{
	 					node.contents().unwrap().wrap("<p></p>");
	 				}
	 			}
	 		}else{
	 			//行内元素，不替换
	 			if(tagName=="img"){
	 				//图片元素，包裹imgcaption
	 				if(!node.parent().hasClass("drimgPackage")){
	 					node.wrap('<div class="drimgPackage"></div>');
	 					node.parent().append($('<div class="drimgCaption">&nbsp;<br></div>'));
	 				}
	 			}
	 		}
	 		return;
			
		}
		
		//非叶子节点调整完所有底部节点后

		//处理换行问题
		 var hasBr = false;;
		for(var i = 0; i < node.children().length; i++){
			if(node.children()[i].tagName.toLowerCase() == "br"){
				if(node.closest(".drimgPackage").length > 0){
					
				}else{
					hasBr = true;
				}
			
				break;
			}
		}
		if(hasBr){
			var brNodePosition = [];
			var contentsChild = node.contents();
			for(var i = 0; i < contentsChild.length; i++){
				var content = contentsChild[i];
				if(content.nodeType == 1){
					var contentTagName = content.tagName.toLowerCase();
					if(contentTagName == "br"){
						brNodePosition.push(i);
					}
				}
			}
			var shouldWrapNodePosition = [];
			var wrapGroup = [];
			for(var i = 0; i < brNodePosition.length;i++){
				var j = i + 1;
				var k = i - 1;
				var allPrevNode = [];
				if(i == 0){

					for(var index = 0;  index < brNodePosition[i]; index++ ){
						allPrevNode.push($(node.contents()[index]));
					}				
				}else{

				}
				var allPostNode = [];
				if(j < brNodePosition.length){

					for(var index = brNodePosition[i] + 1;  index < brNodePosition[j]; index++ ){
						allPostNode.push($(node.contents()[index]));
					}

				}else{
					for(var index = brNodePosition[i] + 1;  index < node.contents().length; index++ ){
						allPostNode.push($(node.contents()[index]));
					}

				}
				wrapGroup.push(allPrevNode);
				wrapGroup.push(allPostNode);
				

				
			}

			var originContent = node.contents();
			for(var i = 0; i < wrapGroup.length; i++){
				var wrapObj = originContent.filter(function(){
					for(var j = 0; j < wrapGroup[i].length;j++){
						if(wrapGroup[i][j][0] == this){
							return true;
						}
					}
					return false;
				});
				wrapObj.wrapAll("<p></p>");
			}
			//去掉br
			node.find("br").remove();
			
		}
		if(isRoot){
			return;
		}
		 var display = $.getElementDefaultDisplay(tagName);
		 if(display == "block" || display=="list-item"){
			 if(tagName == "p"){
			 	//本身就是段落，不替换
			 }else if(tagName=="aside" || tagName=="blockquote" || tagName == "ul" || tagName == "ol" || tagName =="dl" 
				 || tagName == "div" || tagName=="section" || tagName=="article" || tagName=="header" || tagName=="footer"
				 || tagName == "div" || tagName =="form" || tagName == "head" || tagName == "nav"){
	 				//容器类
				 	if(tagName == "div" && (node.hasClass("drimgPackage") ||  node.hasClass("drimgCaption") )){
				 		
				 	}else{
		 				var prev = node.prev();
		 				var next = node.next();
		 				var parent = node.parent();
		 				if(prev.length > 0){
		 					node.children().insertAfter(prev);
		 				}else if(next.length > 0){
		 					node.children().insertBefore(next);
		 				}else{
		 					node.children().prependTo(parent);
		 				}
		 				node.remove();
				 	}

	 				
	 		  }else{
	 				$newElement = $("<p></p>");
	 				var oldAttrs = node.attr();
	 				for(var key in oldAttrs){
	 					$newElement.attr(key,oldAttrs[key]);
	 				}
	 				$newElement.html(node.html());
	 				$newElement.insertAfter(node);	
	 				node.remove();
	 		  }

		 }else{
			 //行内元素


		 }
	 		
		
	},
	getElementDefaultDisplay:function(tag) {
	    var cStyle,
	        t = document.createElement(tag),
	        gcs = "getComputedStyle" in window;

	    document.body.appendChild(t);
	    cStyle = (gcs ? window.getComputedStyle(t, "") : t.currentStyle).display; 
	    document.body.removeChild(t);

	    return cStyle;
	},
	clearNode:function(node){
 		if(node != null){
 			if(node.hasClass("drimgCaption")){
 				node.removeAttr("class");
 				node.addClass("drimgCaption");
 			}else if(node.hasClass("drimgPackage")){
 				node.removeAttr("class");
 				node.addClass("drimgPackage");
 			}else{
 				node.removeAttr("class");
 			}

 			
 			node.removeAttr("style");
 			
 			if(node[0].tagName == null){
 				//普通文本，没有tag
 				return false;
 				
 			}
 			
 			//去掉所有内置属性
 			var tagName = node[0].tagName.toLowerCase();
 			var attrObj = node.attr();
 			for(var key in attrObj){
 				if(tagName == "img" && key == "src"){
 					continue;
 				}else if(tagName=="a" && key=="href"){
 					node.attr("target","_blank");
 					continue;
 				}else if(tagName=="a" && key=="target"){
 					continue;
 				}else if(key=="class"){
 					continue;
 				}
 				node.removeAttr(key);
 			}

 			if($.shouldbeEmptyNode(node)){

 				//本节点自身为空,去除
 				return true;
 			}else{
 	 			var children = node.children();
 	 			var removeNode = [];
 	 			for(var i = 0; i < children.length; i++){
 	 				if($.clearNode($(children[i]))){
 	 					removeNode.push($(children[i]));
 	 				}
 	 			}
 	 			
 	 			for(var i = 0; i < removeNode.length; i++){
 	 				removeNode[i].remove();
 	 			}
 	 			//子节点移除后判断父节点是否为空
 	 			if($.shouldbeEmptyNode(node)){

 	 				return true;
 	 			}
 	 			return false;
 	 			
 			}

 		}
 	},
 	shouldbeEmptyNode:function(node){
 		var tagName = node[0].tagName.toLowerCase();
 		
 		if(tagName == "img"){
 			return false;
 		}
 		if(tagName == "hr"){
 			return false;
 		}
 		if(tagName == "br"){

 			return false;
 		}
 		if(tagName == "div" && (node.hasClass("drimgCaption") || node.hasClass("drimgPackage"))){
 			return false;
 		}
 		var ret = ($.trim(node.text()) === '' && node.children().length == 0);
 		return ret;
 	},
 	removeEmptyNode:function(node){
 		node.filter(function() {
 	        var returnValue = ($.trim($(this).text()) === '' && $(this).children().length == 0);
 	        return returnValue;
 	    }).remove();
 	},
	getGuid:function(){
	    function S4() {
	        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	     }
	    return (S4()+S4()+""+S4()+""+S4()+""+S4()+""+S4()+S4()+S4());
	},
//	processContentEditableStr:function(blockElement){
//        var content = "";
//        var inputChildren = blockElement.children();
//        for(var i = 0; i < inputChildren.length; i++){
//          if($(inputChildren[i])[0].tagName.toLowerCase() == "br"){
//            content = content + "\n";
//            continue;
//          }
//          var tagName = inputChildren[i].tagName.toLowerCase();
//          
//          if($.getElementDefaultDisplay(tagName)=="block" || $.getElementDefaultDisplay(tagName)=="list-item"){
//        	if($(inputChildren[i]).text() != ""){
//                content = content + "\n" + $.processContentEditableStr($(inputChildren[i]));
//        	}else{
//        		content = content + $.processContentEditableStr($(inputChildren[i]));
//        	}
//
//          }else{
//            content = content + $(inputChildren[i]).text();
//          }
//        
//        }
//        var parentContent = blockElement.contents().filter(function() {
//          return this.nodeType === 3;
//        }).text();
//        content = parentContent + content;
//        return content;
//	},
	processContentEditableStr:function(blockElement,isRoot){
        var content = "";
        var inputChildren = blockElement.contents();
        
        for(var i = 0; i < inputChildren.length; i++){
          if(inputChildren[i].nodeType === 3){
        	  content = content + $(inputChildren[i]).text();
        	  continue;
          }
          if(inputChildren[i].tagName.toLowerCase() == "br"){
            content = content + "\n";
            continue;
          }
          var tagName = inputChildren[i].tagName.toLowerCase();
          
          if($.getElementDefaultDisplay(tagName)=="block" || $.getElementDefaultDisplay(tagName)=="list-item"){
        	var textNode= $(inputChildren[i]).contents().filter(function() {
                return this.nodeType === 3;
            });
        	if(textNode.length > 0){
                content = content + "\n" + $.processContentEditableStr($(inputChildren[i]),false);
        	}else{
        		content = content + $.processContentEditableStr($(inputChildren[i]),false);
        	}

          }else{
        	  content = content + $.processContentEditableStr($(inputChildren[i]),false);
          }
        
        }
//        var parentContent = blockElement.contents().filter(function() {
//          return this.nodeType === 3;
//        }).text();
//        content = parentContent + content;
        if(isRoot){
        	//去掉第一个回车
        	if(content != "" && content[0] == "\n"){
        		content = content.substring(1,content.length);
        	}
        }
        return content;
	},
	nl2br:function(str, is_xhtml) {
	    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br/>' : '<br>';
	    //return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	    str=str.replace(/\r\n/g,breakTag);
	    str=str.replace(/\n/g,breakTag);  
	    return str;
	},
	setSelectionRange:function(input, selectionStart, selectionEnd) {
		  if (input.setSelectionRange) {
		    input.focus();
		    input.setSelectionRange(selectionStart, selectionEnd);
		  }
		  else if (input.createTextRange) {
		    var range = input.createTextRange();
		    range.collapse(true);
		    range.moveEnd('character', selectionEnd);
		    range.moveStart('character', selectionStart);
		    range.select();
		  }
	},
	focuscurorInContentEditable:function(selector,position){
		selector.each(function(){
			var el = this;
			var range = document.createRange();
			var sel = window.getSelection();
			range.setStart(el.childNodes[0], position);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		});

	},
	
    getDeviceWidthType: function(){
    	var clientWidth = document.documentElement.clientWidth;
    	if(clientWidth <= 800){
    		return 1;
    	}else{
    		return 4;    //>800统一按照pc处理暂时
    	}
    
    },

	getDeviceWidth:function(){
		var clientWidth = document.documentElement.clientWidth;
		return clientWidth;
	},
	getDeviceHeight:function(){
		var clientHeight = document.documentElement.clientHeight;
		return clientHeight;
	},
	
	htmlspecialchars:function(str){
		str = str.replace(/&/g, '&amp;'); 
		str = str.replace(/</g, '&lt;'); 
		str = str.replace(/>/g, '&gt;'); 
		str = str.replace(/"/g, '&quot;'); 
		str = str.replace(/'/g, '&#039;'); 
		return str; 
	},
	
	getDateFormat:function(time){
		time = new Date(time*1000);
        var   year=time.getYear() + 1900;     
        var   month=time.getMonth()+1;     
        var   date=time.getDate();     
        var   hour=time.getHours();     
        var   minute=time.getMinutes();     
        var   second=time.getSeconds();     
        return   year+"."+month+"."+date;  
    },     
   

	getMeaningfulTimeStr:function(time){
		var nowTime = (Date.parse(new Date()))/1000;
		var time = time;
		var delta = nowTime-time;
		if(delta < 60){
			return "1 分钟前";
		}else if(delta < 3600){
			delta = Math.floor(delta/60);
			return delta+" 分钟前";
		}else if(delta < 86400){
			delta = Math.floor(delta/3600);
			return delta+" 小时前";
		}else {
			//判断是否是昨天
			var today = new Date();
			today.setHours(0);
			today.setMinutes(0);
			today.setSeconds(0);
			today.setMilliseconds(0);
			var oneday = 1000* 60 * 60 * 24;
			var yesterday = new Date(today - oneday);
			var yesterdayTime = (Date.parse(yesterday))/1000;
			
			timeDate = new Date(time*1000);
	        var   year=timeDate.getYear() + 1900;     
	        var   month=timeDate.getMonth()+1;     
	        var   date=timeDate.getDate();     
	        var   hour=timeDate.getHours();     
	        var   minute=timeDate.getMinutes();     
	        var   second=timeDate.getSeconds();     
	        
	        if (month.toString().length == 1) {
	        	month = "0" + month;
	        }
	        if (date.toString().length == 1) {
	        	date = "0" + date;
	        }
	        
	        if (minute.toString().length == 1) {
	        	minute = "0" + minute;
	        }
	        
	        if (hour.toString().length == 1) {
	        	hour = "0" + hour;
	        }
	        if (second.toString().length == 1) {
	        	second = "0" + second;
	        }
	        
			if(yesterdayTime <= time){
				//是昨天
				return "昨天 " + hour +":"+minute;
				
			}else{
				return   year+"-"+month+"-"+date + " " + hour +":"+minute;  
			}
			
		}
	},
	
    getTransitionEnd:function() {
        var el = document.createElement('dragon')

        var transEndEventNames = {
          WebkitTransition : 'webkitTransitionEnd',
          MozTransition    : 'transitionend',
          OTransition      : 'oTransitionEnd otransitionend',
          transition       : 'transitionend'
        }

        for (var name in transEndEventNames) {
          if (el.style[name] !== undefined) {
            return { end: transEndEventNames[name] }
          }
        }

        return false // explicit for ie8 (  ._.)
      }
	
	

});

//补充jquery被废弃的broswer变量判断浏览器类型
var matched, browser;

jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie)[\s?]([\w.]+)/.exec( ua ) ||       
        /(trident)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};

matched = jQuery.uaMatch( navigator.userAgent );
//IE 11+ fix (Trident) 
matched.browser = matched.browser == 'trident' ? 'msie' : matched.browser;
browser = {};

if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
    browser.webkit = true;
} else if ( browser.webkit ) {
    browser.safari = true;
}

jQuery.browser = browser;


(function( $ ){  
	  
	  var methods = {  
	    init : function( options ){
	    	var $this = this;
	    	options = $.extend( $.fn.drcontenteditable.options, options ); 
	    	return this.each(function(){
	    		
	    		$this.on("paste",function(e){
	    			
		    		var pasteText = e.originalEvent.clipboardData.getData("text/plain");
		    		//替换/r/n为br
					pasteText = pasteText.replace(/\r\n/g,"<br/>");
					pasteText = pasteText.replace(/\r/g,"<br/>");
					pasteText = pasteText.replace(/\n/g,"<br/>");
		    		document.execCommand("insertHTML", false, pasteText);
		    		e.preventDefault();
	    		});
	    		

	    	});
	    	
	    },
	    
	    getContent:function(){
	    	
	   
	    	function extractTextWithWhitespaceWorker(elems, lineBreakNodeName)
	    	{
	    	    var ret = "";
	    	    var elem;

	    	    for (var i = 0; elems[i]; i++)
	    	    {
	    	        elem = elems[i];

	    	        if (elem.nodeType === 3     // text node
	    	            || elem.nodeType === 4) // CDATA node
	    	        {
	    	            ret += elem.nodeValue;
	    	        }

	    	        if (elem.nodeName === lineBreakNodeName )
	    	        {
	    	        	if(elem.nodeType == 1 && $(elem).text() != ""){
		    	            ret += "\n";
	    	        	}

	    	        }
	    	        
	    	        if(elem.nodeName === "BR"){
	    	        	ret += "\n";
	    	        }

	    	        if (elem.nodeType !== 8) // comment node
	    	        {
	    	            ret += extractTextWithWhitespace(elem.childNodes, lineBreakNodeName);
	    	        }
	    	    }

	    	    return ret;
	    	}
	    	
	    	
	    	function extractTextWithWhitespace(elems)
	    	{
	    	    var lineBreakNodeName = "BR"; // Use <br> as a default
	    	    if ($.browser.webkit)
	    	    {
	    	        lineBreakNodeName = "DIV";
	    	    }
	    	    else if ($.browser.msie)
	    	    {
	    	        lineBreakNodeName = "P";
	    	    }
	    	    else if ($.browser.mozilla)
	    	    {
	    	        lineBreakNodeName = "BR";
	    	    }
	    	    else if ($.browser.opera)
	    	    {
	    	        lineBreakNodeName = "P";
	    	    }
	    	    var extractedText = extractTextWithWhitespaceWorker(elems, lineBreakNodeName);

	    	    return extractedText;
	    	}

	    	return  extractTextWithWhitespace(this.contents());
	    }
		

	  };  
	  

	  
	  $.fn.drcontenteditable = function( method ) {  
	      
	    // Method calling logic  
	    if ( methods[method] ) {  
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));  
	    } else if ( typeof method === 'object' || ! method ) {  
	      return methods.init.apply( this, arguments );  
	    } else {  
	      $.error( 'Method ' +  method + ' does not exist on jQuery.drcontenteditable' );  
	    }      
	    
	  };  
	  
	  $.fn.drcontenteditable.options = {};

	  
})( jQuery ); 