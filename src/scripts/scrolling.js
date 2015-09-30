/*
	SCROLLING.JS - Last updated: 14.08.15
*/
//-----------------------------------------------------------------
// Variables
//-----------------------------------------------------------------
//-----------------------------------------------------------------
// Scrolling Logic
//-----------------------------------------------------------------

$(window).scroll(function(){
	var scrollTop = $(this).scrollTop();

	// Add bottom-border to Mobile header when scrolling
	if (scrollTop >= 20) {
		$('.header-wrapper').addClass('is-fixed');
		$('.lv-super').addClass('header-is-fixed');
	} else {
		$('.header-wrapper').removeClass('is-fixed');
		$('.lv-super').removeClass('header-is-fixed');
	}
});

//==================================================
//
//==================================================