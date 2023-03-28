/*-------------------------------------------------------------------
	분류순서
	- @Variables	: 전역변수
	- @Settings		: 기본설정
	- @Init			: 초기실행
	- @Layout		: 레이아웃
	- @Content		: 컨텐츠
-------------------------------------------------------------------*/
/*-------------------------------------------------------------------
	@Variables
-------------------------------------------------------------------*/
//Elements
var $win = $(window),
	$doc = $(document),
	$body = $("body"),
	$chk_mobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
	$mo;

/*---------------------------------------------------------------
	@Settings
---------------------------------------------------------------*/
// device체크
var deviceCheck = function(){
	var $device;

	if(window.innerWidth>1025){
		$device = "is-pc";
	}else if(window.innerWidth<1026 && window.innerWidth>767){
		$device = "is-tab";
	}else{
		$device = "is-mo";
	}

	return $device;
};

var SST = SST || {};

SST.ui = (function(){
	"use strict";
	/*---------------------------------------------------------------
		@Init
	---------------------------------------------------------------*/
	/* 기본실행 */
	return {
		_init: function(){
			SST.ui._Gnb();			// gnb
			SST.ui._hdActive();		// header 이벤트
			SST.ui._topBtn();		// 위로올라가기 이벤트
		},
		/*---------------------------------------------------------------
			@Layout
		---------------------------------------------------------------*/
		// gnb
		_Gnb: function() {
			var $gnb = $(".gnb"),
				$gnb_wp = $(".gnb-wrap"),
				$dp1 = $(".gnb-depth1>li"),
				$dp1_tit = $(".gnb-depth1>li>a"),
				$m_dp1_tit = $(".gnb-depth1>li>a.arrow"),
				$dp2 = $(".gnb-depth2"),
				$gnb_close = $(".mgnb-close"),
				$gnb_open = $(".mgnb-open"),
				$dim = $(".dim");

			if(window.innerWidth>1025){
				if($mo == false){
					$dp2.hide();
					$dp1_tit.off("click");
					$gnb_open.off("click");
					$dp1.removeClass("on");
					$dp1.on("mouseenter",function(){
						$("#header").addClass("active");
					});
					$dp1_tit.on("mouseenter focusin",function(e){
						if($(this).parent().hasClass("on")){
							//$(this).parent().addClass("on").find(".gnb-depth2").stop().fadeIn(100);
						}else{
							$(this).parent().siblings().removeClass("on").find(".gnb-depth2").stop().fadeOut(100);
							$(this).parent().siblings().find(".gnb-depth2").parents('#header').find('.dim').stop().slideUp(100);

							$(this).parent().addClass("on").find(".gnb-depth2").stop().fadeIn();
							$(this).parent().addClass("on").find(".gnb-depth2").parents('#header').find('.dim').stop().slideDown(150);
						}

					});
					$gnb_wp.on("mouseleave",function(e){
						$("#header").removeClass("active");
						$dp1.removeClass("on").find(".gnb-depth2").stop().fadeOut(100);
						$('.header').find('.dim').stop().slideUp();
					});

					$mo = true;
				}
			}else{
				if($mo == true){
					$gnb_wp.off("mouseenter");
					$gnb_wp.off("mouseleave");
					$dp1_tit.off("mouseout focusin");
					$dp1.removeClass("on");
					
					$m_dp1_tit.attr('title','축소됨');
					$m_dp1_tit.on("click",function(e){
						if($(this).parent().hasClass("on")){
							$(this).parent().removeClass("on").find(".gnb-depth2").stop().slideUp();
							$(this).attr('title','축소됨');
						}else{
							$(this).parent().siblings().removeClass("on").find(".gnb-depth2").stop().slideUp();
							$(this).parent().addClass("on").find(".gnb-depth2").stop().slideDown();
							$(this).attr('title','확장됨');
							$(this).parent().siblings().find("a").attr('title','축소됨');
						}
						e.preventDefault();
					});
					
					$gnb.attr('aria-hidden','true');
					$gnb.find("a").attr('tabindex','-1');

					// mobile gnb 열기
					$gnb_open.on("click",function(e) {
						if($(this).hasClass("open")){
							$(this).removeClass("open");
							$body.removeClass("no-scroll");

							$gnb.removeClass("on");
							TweenMax.to($gnb, 0.3, {css:{right: "-100%"}});
							$dim.fadeOut();
							$(this).find("label").text("모바일 전체메뉴");
							$gnb.find("a").attr('tabindex','-1');
							$gnb.attr('aria-hidden','true');
							$(".skipnav a, .logo a, #container a, #footer a").attr('tabindex','0').attr('aria-hidden','false');
						}else{
							$(this).addClass("open");
							$body.addClass("no-scroll");
				
							$gnb.addClass("on");
							TweenMax.to($gnb, 0.3, {css:{right: 0}});
							$dim.fadeIn();
							$(this).find("label").text("모바일 전체메뉴 닫기");
							$gnb.find("a").attr('tabindex','0');
							$gnb.attr('aria-hidden','false');
							$(".skipnav a, .logo a, #container a, #footer a").attr('tabindex','-1').attr('aria-hidden','true');
						}
						e.preventDefault();
					});

					$mo = false;
				}
			}
		},
		// header 이벤트
		_hdActive: function(){
			var $hd = $("#header"),
				$gnb = $hd.find(".gnb"),
				$dp1 = $gnb.find(".gnb-depth1>li>a"),
				$dp1_last = $gnb.find(".gnb-depth1>li:last-of-type .gnb-depth2>li:last-of-type")

			$win.on("resize",function(){
				var $device = deviceCheck();

				if($device == "is-pc"){
					$hd.removeClass("is-mob")
					$hd.addClass("is-pc")
					$dp1_last.on("focusout",function() {
						$hd.removeClass("active");
						$(".gnb-depth1>li").removeClass('on');
						$(".gnb-depth2").fadeOut(100);
					});

				}else{
					$hd.removeClass("is-pc")
					$hd.addClass("is-mob")
					$dp1.off("mouseenter focusin");
				}
			}).resize();
		},
		// 위로올라가기 이벤트
		_topBtn: function(){
			var $top = $('#top-btn');
			$top.click(function(){
				$("html, body").animate({ scrollTop: 0 }, 200, "linear");
				return false;
			});
		}
	};
})();

//레이어 팝업
function popupOpen(name) {
	$(name).parents('html').addClass('no-scroll');
	$(name).parents('.layer-wrap').addClass('active').fadeIn(200).attr("tabindex", 0).focus();
	$(name).css('display','table');
	$(name).parents('html').find("#wrapper, .skipnav a, .header a, #container a, #footer a").attr('tabindex','-1').attr('aria-hidden','true');
}
function popupClose(name) {
	$(name).parents('html').removeClass('no-scroll');
	$(name).parents('.layer-wrap').removeClass('active').fadeOut();
	$(name).css('display','none');
	$(name).parents('html').find("#wrapper, .skipnav a, .header a, #container a, #footer a").attr('tabindex','0').attr('aria-hidden','false');
}


// SST 공통 실행
$(function(){
	var $device = deviceCheck();
	if ($device == "is-pc"){
		$mo = false;
	}else{
		$mo = true;
	}
	SST.ui._init();
});

$win.on("resize",function(){
	SST.ui._Gnb();
}).resize();

