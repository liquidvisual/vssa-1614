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
    // Trigger hamburger with a click on desktop
    $(".hamburger").css("visibility", "visible").bind("click", function() { $("#off-canvas-menu").trigger("open.mm"); });
}

//-----------------------------------------------------------------
// Google Map and Markers
// http://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
// http://stackoverflow.com/questions/7084363/google-maps-in-hidden-div
// http://jsfiddle.net/P2QhE/
//-----------------------------------------------------------------

var maps = [];

// var addresses = ['27a Tallowwood Crescent, BRADBURY 2560', 'Sydney CBD'];

var latLongs = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

var addresses = [
    {name: 'mitches house',url:'http://google.com.au',address:'27a Tallowwood Crescent, BRADBURY 2560'},
    {name: 'somewhere house',url:'http://bing.com.au',address:'42 Tallowwood Crescent, BRADBURY 2560'},
];

$(document).ready(function () {

    $.each($('.google-map'), function(index, value){
        var map;
        var elevator;
        var myOptions = {
            zoom: 1,
            center: new google.maps.LatLng(0, 0),
            mapTypeId: 'terrain'
        };
        map = new google.maps.Map(value, myOptions);
        maps.push(map);
    });

    // turn all our addresses into latlongs and push to maps;
    $.each(addresses, function(index, value) {
        console.log('calling google api for ' + value.address);
        var url = 'http://maps.googleapis.com/maps/api/geocode/json';
        $.ajax({
          dataType: "json",
          url: url,
          data: 'address=' + value.address + '&sensor=false',
          async: true
        })
        .done(function (data, textStatus, jqXHR) {
            var p = data.results[0].geometry.location;
            var newLatLong = [value.name, p.lat, p.lng, index];
            var latlng = new google.maps.LatLng(p.lat, p.lng);
            latLongs.push(newLatLong);
            console.log(newLatLong);
            $.each($('.google-map'), function(index2, value2) {
                new google.maps.Marker({
                    position: latlng,
                    map: value2
                });
            });
        });
    });
});

// Re-orient map
function centerMap(map) {
    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
}

// Adjust Maps
function adjustMaps(){
    $.each(maps, function(index, value){
        centerMap(value);
    });
}

if ($('.google-map').length) {
    // Call adjust on resize
    $(window).resize(function() {
        adjustMaps();
    });
}

// Foundation tabs fires the adjusting of Maps
$(document).foundation({
    tab: {
        callback : adjustMaps
    }
});

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