//container 容器，count 总页数 pageindex 当前页数
var paging_url;
function setUrl (urlstring)  {
	paging_url = urlstring;
}
function setPage(container, count, pageindex) {
var container = container;
var count = count;
var pageindex = pageindex;
var a = [];
  //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
  if (pageindex == 1) {
    a[a.length] = "<li class=\"disabled\"><a href=\"#\">上一页</a></li>";
  } else {
    a[a.length] = "<li><a href=\"#\">上一页</a></li>";
  }
  function setPageList() {
    if (pageindex == i) {
      a[a.length] = "<li class=\"disabled\"><a href=\"#\">" + i + "</a></li>";
    } else {
      a[a.length] = "<li><a href=\"#\">" + i + "</a></li>";
    }
  }
  //总页数小于10
  if (count <= 10) {
    for (var i = 1; i <= count; i++) {
      setPageList();
    }
  }
  //总页数大于10页
  else {
    if (pageindex <= 4) {
      for (var i = 1; i <= 5; i++) {
        setPageList();
      }
      a[a.length] = "<li><span>...</span></li><li><a href=\"#\">" + count + "</a></li>";
    } else if (pageindex >= count - 3) {
      a[a.length] = "<li><a href=\"#\"> 1 </a></li><li><span>...</span></li>";
      for (var i = count - 4; i <= count; i++) {
        setPageList();
      }
    }
    else { //当前页在中间部分
      a[a.length] = "<li><a href=\"#\"> 1 </a></li><li><span>...</span></li>";
      for (var i = pageindex - 2; i <= pageindex + 2; i++) {
        setPageList();
      }
      a[a.length] = "<li><span>...</span></li><li><a href=\"#\">" + count + " </a></li>";
    }
  }
  if (pageindex == count) {
    a[a.length] = "<li class=\"disabled\"><a href=\"#\">下一页</a></li>";
  } else {
    a[a.length] = "<li><a href=\"#\">下一页</a></li>";
  }
  container.innerHTML = a.join("");
  //事件点击
  var pageClick = function() {
    var oAlink = container.getElementsByTagName("a");
    var inx = pageindex; //初始的页码
    oAlink[0].onclick = function() { //点击上一页
      if (inx == 1) {
        return false;
      }
      inx--;
      //setPage(container, count, inx);
      window.location.href=paging_url+inx;
      return false;
    }
    for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
      oAlink[i].onclick = function() {
        inx = parseInt(this.innerHTML);
        //setPage(container, count, inx);
        window.location.href=paging_url+inx;
        return false;
      }
    }
    oAlink[oAlink.length - 1].onclick = function() { //点击下一页
      if (inx == count) {
        return false;
      }
      inx++;
      //setPage(container, count, inx);
      window.location.href=paging_url+inx;
      return false;
    }
  } ()
}