/**
 * LeftBar Generate
 */
var LeftBar=function(){
	
	var MarkCategory=function(text,markcategories_Array){
		/* LeftBar init*/
		$('.leftbar .title').text(text);
		$('.mark-category li:first').addClass('active');
		
		/* 切换标签类别 */
		$(document).on('click','.mark-category li',function(){
			var $this=$(this);
			$('.mark-category li').removeClass('active');
			$this.addClass('active');
			$('.mark-category').hide();
			$('.leftbar .title').text($this.text());
			var index=$this.attr('id');	
			$('.bar-content li:not(:first)').remove();
			for(var i=0;i<markcategories_Array[index].marks.length;i++){
				$('.bar-content').append('<li><a href="/marks/listscreenshotbymark?mark_id='+markcategories_Array[index].marks[i].id+'">'+markcategories_Array[index].marks[i].name+'</a></li>');
			}
		})
		/* 显示隐藏标签类别 */
		$(".dropdown-area").hover(function(){
			$('.mark-category').stop().slideDown('fast');
		},function(){
			$('.mark-category').stop().slideUp('fast');
		})
	};
	
	return {
		init:function(text,markcategories_Array){
			MarkCategory(text,markcategories_Array);
		}
	};
}();