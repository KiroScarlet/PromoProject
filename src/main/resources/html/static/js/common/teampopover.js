(function($) {
    var methods = {
        init: function(options) {
            var $this = this;
            options = $.extend($.fn.teampopover.options, options);
            return this.each(function() {
                var $this = $(this);
                var teamEntity = options.teamEntity;
                var idName = options.idName;
                var id = options.id;
                var shownFunc = options.shownFunc;
                var changeFollowFunc = options.changeFollowFunc;
                var hasLogin = options.hasLogin;
                var redirectLoginUrl = options.redirectLoginUrl;
                if (teamEntity == null) {
                    return;
                }
                $this.data("teamEntity", teamEntity);
                $this.data("idName", idName);
                $this.data("id", id);
                $this.data("hasLogin", hasLogin);
                $this.data("redirectLoginUrl", redirectLoginUrl);
                //加上对应data标记
                $this.attr("data-teampopover", id);

                $this.popover({
                    trigger: "manual",
                    html: true,
                    animation: false,
                    container: "body",
                    content: (function(arg) {
                        return function() {
                            return $this.teampopover("getPopoverHtml", teamEntity, idName, id);
                        }
                    })(id)
                });

                $this.on("mouseenter", (function(arg) {
                    return function(e) {
                        var appearTimeOut = setTimeout(function() {
                            appearTimeOut = null;
                            $this.off("mouseleave");
                            if ($this.data('bs.popover').tip().hasClass('in')) {
                                return;
                            }
                            $this.teampopover("showPopover");

                            var timeout = null;
                            $this.on("mouseleave", function(e) {
                                timeout = setTimeout(function() {
                                    $this.teampopover("hidePopover");
                                }, 500);
                            });
                            
                            $("#" + idName + arg).parent().parent().off("mouseenter");
                            $("#" + idName + arg).parent().parent().on("mouseenter", function() {
                                if (timeout != null) {
                                    clearTimeout(timeout);
                                    timeout = null;
                                }
                                $("#" + idName + arg).parent().parent().off("mouseleave");
                                $("#" + idName + arg).parent().parent().on("mouseleave", function() {
                                    $this.teampopover("hidePopover");
                                });
                            });
                        }, 500);

                        $this.on("mouseleave", function() {
                            if (appearTimeOut != null) {
                                clearTimeout(appearTimeOut);
                                appearTimeOut = null;
                            }
                        });
                    }
                })(id));

                $this.on('shown.bs.popover', (function(arg) {
                    if (shownFunc != null) {
                        return shownFunc;
                    } else {
                        return function(e) {
                            var hasLogin = $this.data("hasLogin");
                            var redirectLoginUrl = $this.data("redirectLoginUrl");
                            var dataplacement = $this.data("placement");

                            //调整位置
                            var oldTop = $('.popover').css('top');
                            oldTop = parseInt(oldTop.substr(0, oldTop.length - 2));
                            var newTop = 0;
                            if (dataplacement == "top") {
                                newTop = oldTop - 5;
                            } else {
                                newTop = oldTop + 5;
                            }
                            $('.popover').css('top', newTop + "px");

                            var newLeft = $(e.target).offset().left - 50,
                                contentWidth = e.target.offsetWidth;
                            $('.popover').css('left', newLeft + "px");
                            $('.arrow').css('left', contentWidth / 2 + 50 + 'px');

                            $("[data-popoverfollowteamid]").on("click", function(e) {
                                e.preventDefault();
                                if (!hasLogin) {
                                    window.location.href = redirectLoginUrl;
                                    return;
                                }
                                var followTeamId = $("[data-popoverfollowteamid]").data("popoverfollowteamid");
                                var isYourFollow = $("[data-popoverfollowteamid]").data("popoverisfollowteam");
                                if (isYourFollow == 0) {
                                    $("[data-popoverfollowteamid=" + followTeamId + "]").addClass("active");
                                    $("[data-popoverfollowteamid=" + followTeamId + "]").text("已关注");
                                    $("[data-popoverfollowteamid=" + followTeamId + "]").data("popoverisfollowteam", 1);
                                    if (changeFollowFunc != null) {
                                        changeFollowFunc(followTeamId, 1);
                                    }
                                    var jRequest = jQuery.ajax({
                                        type: "POST",
                                        contentType: "application/x-www-form-urlencoded",
                                        url: "/teams/followteam",
                                        data: "team_id=" + followTeamId,
                                        beforeSend: function() {
                                            var currentReq = $("[data-popoverfollowteamid]").data("jRequest");
                                            if (currentReq != null) {
                                                currentReq.abort();
                                            }
                                        },
                                        complete: function() {
                                            $("[data-popoverFollowTeamId]").data("jRequest", null);
                                        },
                                        success: function(data) {
                                        },
                                        error: function(data) {
                                            if (data.statusText == "abort") {
                                                return;
                                            }
                                            $("[data-popoverfollowteamid=" + followTeamId + "]").removeClass("active");
                                            $("[data-popoverfollowteamid=" + followTeamId + "]").text("关注");
                                            $("[data-popoverfollowteamid=" + followTeamId + "]").data("popoverisfollowteam", 0);
                                            if (changeFollowFunc != null) {
                                                changeFollowFunc(followTeamId, 0);
                                            }
                                        }
                                    });

                                    $("[data-popoverfollowteamid]").data("jRequest", jRequest);
                                } else {
                                    //取消关注
                                    $("[data-popoverfollowteamid=" + followTeamId + "]").removeClass("active");
                                    $("[data-popoverfollowteamid=" + followTeamId + "]").text("关注");
                                    $("[data-popoverfollowteamid=" + followTeamId + "]").data("popoverisfollowteam", 0);
                                    if (changeFollowFunc != null) {
                                        changeFollowFunc(followTeamId, 0);
                                    }
                                    var jRequest = jQuery.ajax({
                                        type: "POST",
                                        contentType: "application/x-www-form-urlencoded",
                                        url: "/teams/unfollowteam",
                                        data: "team_id=" + followTeamId,
                                        beforeSend: function() {
                                            var currentReq = $("[data-popoverfollowteamid]").data("jRequest");
                                            if (currentReq != null) {
                                                currentReq.abort();
                                            }
                                        },
                                        complete: function() {
                                            $("[data-popoverfollowteamid]").data("jRequest", null);
                                        },
                                        success: function(data) {
                                        },
                                        error: function(data) {
                                            if (data.statusText == "abort") {
                                                return;
                                            }
                                            $("[data-popoverfollowteamid=" + followTeamId + "]").addClass("active");
                                            $("[data-popoverfollowteamid=" + followTeamId + "]").text("已关注");
                                            $("[data-popoverfollowteamid=" + followTeamId + "]").data("popoverisfollowteam", 1);

                                            if (changeFollowFunc != null) {
                                                changeFollowFunc(followTeamId, 1);
                                            }
                                        }
                                    });
                                    $("[data-popoverfollowteamid]").data("jRequest", jRequest);
                                }
                            });
                        }
                    }
                })(id));
            });
        },
        showPopover: function() {
            var $this = this;
            return this.each(function() {
                //hide掉其他所有的
                $("[data-teampopover]").popover("hide");
                $this.popover("show");
            });
        },
        hidePopover: function() {
            var $this = this;
            return this.each(function() {
                $this.popover("hide");
            });
        },
        getPopoverHtml: function(teamEntity, idName, id) {
            if (teamEntity == null) {
                return null;
            }
            var fromTeamIconUrl = teamEntity.iconThumbUrl,
                fromTeamName = teamEntity.name,
                fromTeamWord = teamEntity.content,
                fromTeamArticleCount = teamEntity.articleCount,
                fromTeamFanCount = teamEntity.followCount,
                teamPopoverFollowStr = "",
                teamPopoverFollowStrClass = "",
                fromTeamId = teamEntity.id;
            
            if (teamEntity.hasFollow == 1) {
                teamPopoverFollowStr = "已关注";
                teamPopoverFollowStrClass = "btnBlue active ";

            } else {
                teamPopoverFollowStr = "关注";
                teamPopoverFollowStrClass = "btnBlue ";
            }

            return '<div id="' + idName + id + '" class="teamPopoverContentContainer">\
			            <div>\
			                <a target="_blank" href="/teams/get?id=' + fromTeamId + '"><img class="teamPopoverTeamIcon img-circle" src="' + fromTeamIconUrl + '"/></a>\
			                <div class="teamPopoverTeamInfoContainer">\
			                  <p class="teamPopoverTeamName"><a target="_blank" href="/teams/get?id=' + fromTeamId + '">' + $.htmlspecialchars(fromTeamName) + '</a></p>\
			                  <p class="teamPopoverTeamWord">' + $.htmlspecialchars(fromTeamWord) + '</p>\
			                </div>\
			                <div class="clear"></div>\
			                <div class="divider"></div>\
			            </div>\
			            <div class="teamPopoverContentCountInfoContainer">\
			              <div class="teamPopoverContentCountInfo">\
			                  <div class="teamPopoverContentArticleCountContainer"><span>' + fromTeamArticleCount + '</span><span>文章</span></div>\
			                  <div class="teamPopoverContentFanCountContainer"><span>' + fromTeamFanCount + '</span><span>粉丝</span></div>\
			              </div>\
			              <button class="' + teamPopoverFollowStrClass + ' teamPopoverFollowButton" data-popoverisfollowteam=' + teamEntity.hasFollow + ' data-popoverfollowteamid="' + teamEntity.id + '" id="teamPopoverFollowButton' + id + '">' + teamPopoverFollowStr + '</button>\
			              <div class="clear"></div>\
			            </div>\
			        </div>';
        }
    };

    $.fn.teampopover = function(method) {

        // Method calling logic  
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.teampopover');
        }

    };

    $.fn.teampopover.options = {};

})(jQuery);