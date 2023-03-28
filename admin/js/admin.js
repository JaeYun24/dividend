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
	$body = $("body")

/*---------------------------------------------------------------
	@Settings
---------------------------------------------------------------*/
var ADM = ADM || {};

ADM.ui = (function(){
	"use strict";
	/*---------------------------------------------------------------
		@Init
	---------------------------------------------------------------*/
	/* 기본실행 */
	return {
		_init: function(){
			ADM.ui._Gnb();			// gnb
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
				$dp2 = $(".gnb-depth2")

            $m_dp1_tit.on("click",function(e){
                if($(this).parent().hasClass("on")){
                    $(this).parent().removeClass("on").find(".gnb-depth2").stop().slideUp();
                }else{
                    $(this).parent().siblings().removeClass("on").find(".gnb-depth2").stop().slideUp();
                    $(this).parent().addClass("on").find(".gnb-depth2").stop().slideDown();
                }
                e.preventDefault();
            });
		}
	};
})();

//레이어 팝업
function popupOpen(name) {
	$(name).parents('html').addClass('no-scroll');
	$(name).parents('.layer-wrap').addClass('active').fadeIn(200);
	$(name).css('display','table');
}
function popupClose(name) {
	$(name).parents('html').removeClass('no-scroll');
	$(name).parents('.layer-wrap').removeClass('active').fadeOut();
	$(name).css('display','none');
}

// ADM 공통 실행
$(function(){
	ADM.ui._init();
});

$(document).ready(function () {
	//선택박스
	$('.select-btn .select-tit').click(function(){
		$(this).parents("li").toggleClass('open').find('.select-box').slideToggle();
	});

	$('.select-box a').click(function(){
		$(this).parents("li").removeClass('open').find('.select-box').slideUp();
		var selTxt = $(this).text();
		$(this).parent().prev().find("span").html(selTxt);
	});

	// 메인 데이터피커
	$(".datepicker").datepicker({
		dateFormat: 'yy-mm-dd',
		showOtherMonths: true,
		selectOtherMonths: true,
		showButtonPanel: true,
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		monthNames: [' / 01', ' / 02', ' / 03', ' / 04', ' / 05', ' / 06', ' / 07', ' / 08', ' / 09', ' / 10', ' / 11', ' / 12'],
		showMonthAfterYear: true,
		monthSuffix: '',
		closeText: '',
		onSelect: function (dateText, inst) {
			$(this).parents(".select-btn").removeClass("open");
		}

	});

	//탭선택
	$(".tab-sel a").on('click', function () {
		$(this).addClass("selected").siblings().removeClass("selected")
	});

});
