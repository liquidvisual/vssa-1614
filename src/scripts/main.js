/*
	MAIN SCRIPTS - Last updated: 11-09-14
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