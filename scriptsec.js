/*  JavaScript 6th Edition
    Valentine's Art Gallery
    Author: Catikia
    Date:   11/10/2016
    Filename: scriptsec.js
*/

"use strict";//executes javascript in strict mode.

// global variables
var waitForUser;
var x = document.getElementById("displayLocationInfo");

//gets geolocation or displays that the browser does not support geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

/* displays the latitude, longitude, and altitude found from geolocation as well as a map of that location */
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude + "<br>Altitude: " + position.coords.altitude;
	var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("map").innerHTML = "<img src='"+img_url+"'>";
}


/* gives a time out error if location question is not answered */
function geoTest() {
   waitForUser = setTimeout(fail, 10000);
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLocation, fail, {timeout: 10000});
   } else {
      fail();
   }
}

/* gives error */
function fail() {
//   console.log("Geolocation information not available or not authorized.");
   document.getElementById("map").innerHTML = "Unable to access your current location.";
}
