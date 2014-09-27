/*
	MAIN SCRIPTS - Last updated: 27-09-14
*/
//-----------------------------------------------------------------
// Document Ready
//-----------------------------------------------------------------

$(document).ready(function() {
	NProgress.start(); // Start preloader bar
});

window.onload = function(){
    NProgress.done();
}

//-----------------------------------------------------------------
// Kickstart Foundation / Touch Conditionals
//-----------------------------------------------------------------

var isTouchDevice = $(".touch").length;

if (isTouchDevice) {
    // Make Accordion jump to the top of the heading on mobile
    // http://foundation.zurb.com/forum/posts/1316-accordion-jump-to-top-when-active
    $(document).foundation('accordion', {
        callback: function (el){
        var containerPos = $(el).parent().offset().top;
        $('html, body').animate({ scrollTop: containerPos }, 300);
        }
    });

    // Trigger hamburger by touch on mobile - this eliminates glitch with FastClick.js
    $(".hamburger").css("visibility", "visible").bind("touchstart", function() { $("#off-canvas-menu").trigger("open.mm"); });

} else {
    // Start Foundation JS as normal with defaults
    $(document).foundation();

    // Trigger hamburger with a click on desktop
    $(".hamburger").css("visibility", "visible").bind("click", function() { $("#off-canvas-menu").trigger("open.mm"); });
}

//-----------------------------------------------------------------
// 'MMenu' Settings
//-----------------------------------------------------------------

$("#off-canvas-menu").mmenu({
   "offCanvas": {
      "position": "right"
   }
});

//-----------------------------------------------------------------
// <= IE8 Caution Message
//-----------------------------------------------------------------

$('.lv-alert .close-btn').click(function(){$(this).parent().hide();});

//-----------------------------------------------------------------
// +++ HELPERS +++
//-----------------------------------------------------------------

// function trace(command){console.log(command+" ("+typeof(command)+")");}

//==================================================
// Developer: COMMAND+S for screen width
//==================================================

$(document).keypress(function(event) {
    if (event.which == 115 && (event.ctrlKey||event.metaKey)|| (event.which == 19)) {
        event.preventDefault();
        alert("(w) "+$(window).width()+" (h) "+$(window).height());
        return false;
    }
    return true;
});

//==================================================
// Submit Search Form by Hitting Enter
//==================================================

// $("#search-form").keypress(function(event) {
//     if (event.which == 13) {
//         event.preventDefault();
//         $("#search-form").submit();
//     }
// });

//==================================================
//
//==================================================