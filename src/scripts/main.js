/*
	MAIN SCRIPTS - Last updated: 31-08-16
*/
//-----------------------------------------------------------------
// Document Ready
//-----------------------------------------------------------------

$(function() {
	NProgress.start(); // Start preloader bar
    $('input, textarea').placeholder(); // IE9 Patch
    launchModal(5000);
    initHamburgerMenu();
    initAccordion();
});

//-----------------------------------------------------------------
// On Load
//-----------------------------------------------------------------

$(window).on('load', function(){
    NProgress.done();
})

//-----------------------------------------------------------------
// Launch Modal if cookie enabled ('.show-modal' on body)
//-----------------------------------------------------------------

function launchModal(delay) {
    var timer;
    var $modal = $('#join-newsletter-modal');

    if ($('.show-modal').length) {
        timer = setTimeout(function(){
            $modal.foundation('reveal', 'open');
        }, delay);
    }
}

//-----------------------------------------------------------------
// Make Accordion jump to the top of the heading on mobile
// http://foundation.zurb.com/forum/posts/1316-accordion-jump-to-top-when-active
//-----------------------------------------------------------------

function initAccordion() {
    var isMobile = $(window).width() < 480;
    var headerHeight = 80;

    if (isMobile) {
        $(document).foundation('accordion', {
            callback: function (el){
                var containerPos = $(el).parent().offset().top - headerHeight; // 80 is header height
                $('html, body').animate({ scrollTop: containerPos }, 300);
            }
        });
    }
}

//-----------------------------------------------------------------
// 'MMenu' Settings
//-----------------------------------------------------------------

function initHamburgerMenu() {
    var $offCanvasMenu = $("#off-canvas-menu");

    // Properties
    $offCanvasMenu.mmenu({
        "offCanvas": {
            "position": "right"
        }
    });

    // Click Events
    $(".hamburger").bind('click ontouchstart', function(event) {
        event.preventDefault();
        $("#off-canvas-menu").trigger("open.mm");
    });
}

//-----------------------------------------------------------------
// <= IE8 Caution Message
//-----------------------------------------------------------------

$('.lv-alert .close-btn').click(function(){$(this).parent().hide();});

//-----------------------------------------------------------------
// Developer: COMMAND+S for screen width
//-----------------------------------------------------------------

$(document).keypress(function(event) {
    if (event.which == 115 && (event.ctrlKey||event.metaKey)|| (event.which == 19)) {
        event.preventDefault();
        alert("(w) "+$(window).width()+" (h) "+$(window).height());
        return false;
    }
    return true;
});

//==================================================
//
//==================================================