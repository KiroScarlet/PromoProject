
(function($){$.fn.inputlimitor=function(options){var opts=$.extend({},$.fn.inputlimitor.defaults,options);if(opts.boxAttach&&!$('#'+opts.boxId).length)
{$('<div/>').appendTo("body").attr({id:opts.boxId,'class':opts.boxClass}).css({'position':'absolute'}).hide();if($.fn.bgiframe)
$('#'+opts.boxId).bgiframe();}
$(this).each(function(i){$(this).keyup(function(e){if($(this).val().length>opts.limit)
$(this).val($(this).val().substring(0,opts.limit));if(opts.boxAttach)
{$('#'+opts.boxId).css({'width':$(this).outerWidth()-($('#'+opts.boxId).outerWidth()-$('#'+opts.boxId).width())+'px','left':$(this).offset().left+'px','top':($(this).offset().top+$(this).outerHeight())-1+'px'});}
var remText=opts.remText;remText=remText.replace(/\%n/g,opts.limit-$(this).val().length);remText=remText.replace(/\%s/g,(opts.limit-$(this).val().length==1?'':'s'));var limitText=opts.limitText;limitText=limitText.replace(/\%n/g,opts.limit);limitText=limitText.replace(/\%s/g,(opts.limit==1?'':'s'));if(opts.limitTextShow)
{$('#'+opts.boxId).html(remText+' '+limitText);var textWidth=$("<span/>").appendTo("body").attr({id:'19cc9195583bfae1fad88e19d443be7a','class':opts.boxClass}).html(remText+' '+limitText).innerWidth();$("#19cc9195583bfae1fad88e19d443be7a").remove();if(textWidth>$('#'+opts.boxId).innerWidth()){$('#'+opts.boxId).html(remText+'<br />'+limitText);}
$('#'+opts.boxId).show();}
else
$('#'+opts.boxId).html(remText).show();});$(this).keypress(function(e){if((!e.keyCode||(e.keyCode>46&&e.keyCode<90))&&$(this).val().length>=opts.limit)
return false;});$(this).blur(function(){if(opts.boxAttach)
{$('#'+opts.boxId).fadeOut('fast');}
else if(opts.remTextHideOnBlur)
{var limitText=opts.limitText;limitText=limitText.replace(/\%n/g,opts.limit);limitText=limitText.replace(/\%s/g,(opts.limit==1?'':'s'));$('#'+opts.boxId).html(limitText);}});});};$.fn.inputlimitor.defaults={limit:255,boxAttach:true,boxId:'limitorBox',boxClass:'limitorBox',remText:'%n character%s remaining.',remTextHideOnBlur:true,limitTextShow:true,limitText:'Field limited to %n character%s.'};})(jQuery);