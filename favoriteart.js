/*  JavaScript 6th Edition
    Valentine's Art Gallery
	Author: Catikia
	Date: 9/12/2016
	file: favoriteart.js
	*/

"use strict";

// global variables
var profile = {};
var artMedium = [];
var arrayString;
var objectString;



// add artMedium to profile
function selectFavArtMediums(event) {
   if (event === undefined) { // get caller element in IE8
      event = window.event;
   }
   var callerElement = event.target || event.srcElement;
   var artName = callerElement.value;
   if (callerElement.checked) { // if box has just been checked
      // add checkbox value to artMedium array
      artMedium.push(artName);
      // add checkbox value to list in profile section
      var newArt = document.createElement("li");
      newArt.innerHTML = artName;
      document.getElementById("profileMediums").appendChild(newArt);
      // make profile section and artMedium section visible
      document.getElementById("profile").style.display = "block";
      document.getElementById("artSection").style.display = "block";
   } else { // if box has just been unchecked
      var listItems = document.querySelectorAll("#profileMediums li");
      for (var i = 0; i < listItems.length; i++) {
         if (listItems[i].innerHTML === artName) {
            // remove element at index i from array
            artMedium.splice(i, 1);
            // remove artMedium from profile list
            listItems[i].parentNode.removeChild(listItems[i]);
            break;
         }
      }
   }
}

// convert form input to strings for submission
function convertToString() {
   // convert artMedium array to string
   arrayString = artMedium.toString();
   // convert profile object to string
   objectString = JSON.stringify(profile);
}

function createEventListeners() {

   var mediums = document.getElementsByName("mediums");
   if (mediums[0].addEventListener) {
      for (var i = 0; i < mediums.length; i++) {
         mediums[i].addEventListener("change", selectFavArtMediums, false);
      }
   } else if (mediums[0].attachEvent) {
      for (var i = 0; i < mediums.length; i++) {
         mediums[i].attachEvent("onchange", selectFavArtMediums);
      }
   }


}

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}
