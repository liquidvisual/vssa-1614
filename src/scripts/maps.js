//-----------------------------------------------------------------
// Google Map and Markers
// http://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
// http://stackoverflow.com/questions/7084363/google-maps-in-hidden-div
// http://jsfiddle.net/P2QhE/
//-----------------------------------------------------------------

var maps = [];

var mapcenter = {latitude:-33.890542,longitude:151.274856};

var latLongs = [
      {name:'Bondi Beach',latitude:-33.890542,longitude:151.274856,url:'http://google.com.au/maps'},
      {name:'Coogee Beach',latitude:-33.923036,longitude:151.259052,url:'http://google.com.au/mail'},
      {name:'Cronulla Beach',latitude:-34.028249,longitude:151.157507,url:'http://google.com.au/drive'},
      {name:'Manly Beach',latitude:-33.80010128657071,longitude:151.28747820854187,url:'http://google.com.au/youtube'},
      {name:'Maroubra Beach',latitude:-33.950198,longitude:151.259302,url:'http://google.com.au/calendar'}
    ];

var addresses = [
    {name:'mitches house',url:'http://google.com.au',address:'44 Greenoaks Ave, BRADBURY 2560'},
    {name:'somewhere house',url:'http://bing.com.au',address:'65 Woodhouse Drive, Ambarvale NSW 2560'},
];

function createMarker (latlng, title, url) {
    $.each(maps, function(index, map) {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: title
        });
        google.maps.event.addListener(marker, 'click', function() {
            window.open(url);
        });
    });
}

$(document).ready(function () {

    $.each($('.google-map'), function(index, value){
        var map;
        var elevator;
        var myOptions = {
            zoom:10,
            center: new google.maps.LatLng(mapcenter.latitude, mapcenter.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(value, myOptions);
        maps.push(map);
    });

    // add a marker for latLong provided
    $.each(latLongs, function(index, loc) {
    	var latLng = new google.maps.LatLng(loc.latitude, loc.longitude);
        createMarker(latLng, loc.name, loc.url);
    });

    // turn all our addresses into latlongs and push to maps;
    $.each(addresses, function(index, loc) {
        var url = 'http://maps.googleapis.com/maps/api/geocode/json';
        $.ajax({
          dataType: "json",
          url: url,
          data: 'address=' + loc.name + ',' + loc.address + '&sensor=false'
        })
        .done(function (data, textStatus, jqXHR) {
            var p = data.results[0].geometry.location;
            var newLatLong = [loc.name, p.lat, p.lng, index];
            var latLng = new google.maps.LatLng(p.lat, p.lng);
            createMarker(latLng, loc.name, loc.url);
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

//Foundation tabs fires the adjusting of Maps
$(document).foundation({
    tab: {
        callback : adjustMaps
    }
});