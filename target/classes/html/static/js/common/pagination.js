/**
 * pagination.js 
 * target container must be id "page-container"
 */
function setPage(currPage,totalCount,urlHeader) //currPage 当前页数; totalCount 总数量
{
	 var container =  document.getElementById('page-container');
	 var iPageSize = 20; //每页的数量
	 var b = ((totalCount%iPageSize)!=0);
	 var iPageCount = parseInt(totalCount/iPageSize)+(b?1:0);//总共页数
	 //if (currPage > iPageCount) return false;
	 currPage = parseInt(currPage);
	 var sTemp = "";
	 var sTemp1 = "<div class=\"page-number-container inline-block\"><span class=\"page-number\">"+ currPage +"</span>/<span class=\"page-number\">"+ iPageCount +"</span></div>";
	 var sTemp2 = "<div class=\"page-btn-container inline-block\"><input type=\"text\" id=\"goPageNo\" value=\""+currPage+"\" class=\"search-area-for-page border text-align-center\" /><a class=\"btn inline-block border-btn page-btn\" type=\"button\" href=\"Javascript:toPage('"+urlHeader+"');\");\">跳转</a></div>"
	 if (totalCount==0)
	 {
		 sTemp = "无";
		 container.innerHTML = sTemp;
	 }
	 else if (iPageCount==1)
	 {
		 sTemp = "<a href='#' class='disabled'>上一页</a>"+ sTemp1 +"<a href='#' class='disabled'>下一页</a>";
		 container.innerHTML = sTemp +"  "+ sTemp2 ;
	 }
	 else if (iPageCount==currPage)
	 {
		 sTemp = "<a href='#'>上一页</a>"+ sTemp1 +"<a href='#' class='disabled'>下一页</a>";
		 container.innerHTML = sTemp +"  "+ sTemp2 ;
	 }
	 else if (currPage==1)
	 {
		 sTemp = "<a href='#' class='disabled'>上一页</a>"+ sTemp1 +"<a href='#'>下一页</a>";
		 container.innerHTML = sTemp +"  "+ sTemp2 ;
	 }
	 else
	 {
		 sTemp = " <a href='#'>上一页</a>"+ sTemp1 +"<a href='#'>下一页</a>";
		 container.innerHTML = sTemp +"  "+ sTemp2 ;
	 }
	 
	 //事件点击
	 var pageClick = function() {
	    var oAlink = container.getElementsByTagName("a");
	    var inx = currPage; //初始的页码
	    if(oAlink.length > 1){
		    oAlink[0].onclick = function() { //点击上一页
		      if (inx == 1) {
		        return false;
		      }
		      inx--;
		      window.location.href=urlHeader+inx;
		      return false;
		    }
		    oAlink[1].onclick = function() { //点击下一页
		      if (inx == iPageCount) {
		        return false;
		      }
		      inx++;
		      //setPage(container, count, inx);
		      window.location.href=urlHeader+inx;
		      return false;
		    }
	    }
	  } ()
}

function toPage(s) {
	  var tempUrl = "";
	  tempUrl = s + document.getElementById('goPageNo').value;
	  window.location.href = tempUrl;
 } 