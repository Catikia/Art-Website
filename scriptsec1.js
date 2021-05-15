/*  JavaScript 6th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Filename: script.js
*/

navigator.geolocation;
navigator.geolocation.getCurrentPosition();
var latitude = position.coords.latitude;
var longitude = position.coords.longitude;



if(!!navigator.geolocation) {
    // Support
} else {
    // No support
}



(function() {

    if(!!navigator.geolocation) {

        var map;

        var mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('google_canvas'), mapOptions);

        navigator.geolocation.getCurrentPosition(function(position) {

            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: geolocate,
                content:
                    '<h1>Location pinned from HTML5 Geolocation!</h1>' +
                    '<h2>Latitude: ' + position.coords.latitude + '</h2>' +
                    '<h2>Longitude: ' + position.coords.longitude + '</h2>'
            });

            map.setCenter(geolocate);

        });

    } else {
        document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
    }

})();
