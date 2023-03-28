//체크박스 탭접근성
$('.chk, .rchk').on("focus", function(){
  var input = $(this);
  // assuming label is the parent, i.e. <label><input /></label>
  var label = $(this).next();
  label.addClass('line');
  //label.attr("tabindex", 0).focus();
});
$('.chk, .rchk').on("focusout", function(){
  var label = $(this).next();
  label.removeClass('line');
});

$('.rchk').on("focus", function(){
  var input = $(this);
  var label = $(this).next();
  label.attr('aria-checked','true');
});
$('.rchk').on("focusout", function(){
  var label = $(this).next();
  label.attr('aria-checked','false');
});

/*$('.chk-label').on('keydown', function(key){
	if (key.keyCode == 13) {
		if($(this).prev().is(":checked")){
			$(this).prev().prop("checked", false);
		} else {
			$(this).prev().prop("checked", true);
		}
	}
});*/

$("input[name=agree]").next().on('keydown', function(key){
    if (key.keyCode == 13) {
        if ($("input[name=agree]").is(':checked')) {
            checkBoxLength = $("[name=agree]").length;
            checkedLength = $("[name=agree]:checked").length;

            if( checkedLength == 2 ) {
                $(".btn-area button").prop("disabled", false);
            }
        } else {
            $(".btn-area button").prop("disabled", true);
        }
	}

});

$("input[name=check_all]").next().on('keydown', function(key){
	if (key.keyCode == 13) {
		$("input[type=checkbox]").prop("checked", true);
		$(".btn-area button").prop("disabled", false);
	}
});


//배당상단 fix
function checkOffset() {
   var tabOffset = $('.dvd-top').offset();
   $(window).scroll(function() {
		if ($(window).scrollTop() >= tabOffset.top + 0) {
			$('.dvd-top').addClass('fixed');
			$('.dvd-cont').addClass('fixed');
		} else {
			$('.dvd-top').removeClass('fixed');
			$('.dvd-cont').removeClass('fixed');
		}
	});
}

//공지검색 fix
function scOffset() {
    if($('.search-con').offset().top + $('.search-con').height() >= $('#footer').offset().top - 10)
    	$('.search-con').removeClass('fixed');
    if($(document).scrollTop() + window.innerHeight < $('#footer').offset().top)
        $('.search-con').addClass('fixed');
}

$(document).ready(function () {
	//년도선택
	$('.year .sel-btn').click(function(){
		$('.year .select-box').addClass('open').show();
	});

	$('.year .select-box > a').click(function(){
		$('.year .select-box').removeClass('open').hide();
	});

	$(".dvd-tab a").on('click', function () {
		var idx = $(".dvd-tab a").index($(this));
		$(".dvd-tab a").each(function(index){
			if(idx == index){
				$(this).addClass("on");
                $(".dvd-cont .cont").eq(index).addClass("show");
			}else{
				$(this).removeClass("on");
				$(".dvd-cont .cont").eq(index).removeClass("show");
			}
		});
	});
	$(".dvd-tab a").eq(0).click();

    //자주하는 질문
	$(".faq-list>ul>li>a").attr('title','축소됨')
    $("body").on("click ", ".faq-list>ul>li>a", function(){
		var idx = $(".faq-list>ul>li>a").index($(this));
		$(".faq-list>ul>li>a").each(function(index){
			if(idx == index){
				if(!$(this).parent('li').hasClass("open")){
					$(this).parent('li').addClass("open");
					$(this).parent('li').find(".answer").slideDown(300);
					$(this).attr('title','확장됨')
				}else{
					$(this).parent('li').removeClass("open");
					$(this).parent('li').find(".answer").slideUp(300);
					$(this).attr('title','축소됨')
				}
			}
		});
	});

    //인증선택탭
    $(".cert-box a").on('click', function () {
        $(this).addClass("on").siblings().removeClass("on").attr('title','선택안됨');
	});
    $(".cert-box a").attr('title','선택안됨')
    $("body").on("click ", ".cert-box a", function(){
		if(!$(this).hasClass("on")){
			$(this).attr('title','선택안됨')
		}else{
			$(this).attr('title','선택됨')
		}

	});

    
    //아이디/비번찾기 탭
    $(".find-tab a").on('click', function () {
		var idx = $(".find-tab a").index($(this));
		$(".find-tab a").each(function(index){
			if(idx == index){
				$(this).addClass("on");
                $(".find .form-wp .inp-bx").eq(index).show();
			}else{
				$(this).removeClass("on");
				$(".find .form-wp .inp-bx").eq(index).hide();
			}
		});
	});
	$(".find-tab a").eq(0).click();

    //성별탭
	$(".gender-sel a").attr('title','선택안됨')
	$(".gender-sel a.selected").attr('title','선택됨')
    $(".gender-sel.able a").on('click', function () {
		var idx = $(".gender-sel.able a").index($(this));
		$(".gender-sel.able a").each(function(index){
			if(idx == index){
				$(this).addClass("selected");
				$(this).attr('title','선택됨')
			}else{
				$(this).removeClass("selected");
				$(this).attr('title','선택안됨')
			}
		});
	});
	$(".gender-sel.able a").eq(0).click();

    //초기세팅
    $('.rnavi').hide();
    
});

$(window).load(function () {
    $('.rnavi').show();
    $('#noti_pop').focus();
    
    if(window.innerWidth<1025){
		//$(".form-wp, .form-wp-s").find(".hidden").attr('aria-hidden','true');

		$('.chk').attr('aria-hidden','true');
		$('.chk-label').attr('role','checkbox');
		var chk = $('input[type=checkbox]')
		if(chk.is(":checked")){
			chk.next('.chk-label').attr('aria-checked','true');
    	} else {
    		chk.next('.chk-label').attr('aria-checked','false');
    	}
		
		chk.change(function(){
			if($(this).is(":checked")){
				$(this).next('.chk-label').attr('aria-checked','true');
	    	} else {
	    		$(this).next('.chk-label').attr('aria-checked','false');
	    	}
	    });
		
		$('.rchk').attr('aria-hidden','true');
		$('.rchk-label').attr('role','radio').attr('aria-checked','false');
		/*var rchk = $('input[type=radio]')
		if(rchk.is(":checked")){
			rchk.next('.rchk-label').attr('aria-checked','true');
    	} else {
    		rchk.next('.rchk-label').attr('aria-checked','false');
    	}
		
		rchk.change(function(){
			if($(this).is(":checked")){
				$(this).next('.rchk-label').attr('aria-checked','true');
	    	} else {
	    		$(this).next('.rchk-label').attr('aria-checked','false');
	    	}
	    });*/
		
		$('.agr-box .detail').attr('role','button');
		
		$('.login-con .error').attr('aria-hidden','true');
		
		$(".rnavi li a").attr('title','선택안됨')
		$(".rnavi li.on a").attr('title','선택됨')

		$(".faq_member li .answer a").attr('title','회원가입 페이지로 이동');

	}
    
});
