/*    JavaScript 6th Edition
 *    Valentine's Art Gallery
 *    Author: Catikia
 *    Date:   10/17/2016
 *    Filename: script1.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
var formValidity = true;

/* set up node building blocks for selection list of days */
function setupDays() {
   var dates = document.getElementById("pickDy").getElementsByTagName("option");
   twentyNine.appendChild(dates[28].cloneNode(true));
   // add 29th
   thirty.appendChild(dates[28].cloneNode(true));
   thirty.appendChild(dates[29].cloneNode(true));
   // add 29th & 30th
   thirtyOne.appendChild(dates[28].cloneNode(true));
   thirtyOne.appendChild(dates[29].cloneNode(true));
   thirtyOne.appendChild(dates[30].cloneNode(true));
   // add 29th, 30th, & 31st
}
/* update selection list of days based on selected month and year */
function updateDays() {
   var pickedDay = document.getElementById("pickDy");
   var dates = pickedDay.getElementsByTagName("option");
   var pickedMonth = document.getElementById("pickMo");
   var pickedYear = document.getElementById("pickYr");
   var selectedMonth = pickedMonth.options[pickedMonth.selectedIndex].value;
   while (dates[28]) {
      // remove child with index of 28 until this index is empty
      pickedDay.removeChild(dates[28]);
   }
   if (pickedYear.selectedIndex === -1) {
      // if no year is selected, choose the default year so length of Feb can be determined
      pickedYear.selectedIndex = 0;
   }
   if (selectedMonth === "2" && pickedYear.options[pickedYear.selectedIndex].value === "2016") {
      // if leap year, Feb has 29 days
      pickedDay.appendChild(twentyNine.cloneNode(true));
   } else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11") {
      // these months have 30 days
      pickedDay.appendChild(thirty.cloneNode(true));
   } else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") {
      // these months have 31 days
      pickedDay.appendChild(thirtyOne.cloneNode(true));
   }
}
/* remove default values and formatting from date selection lists */
function removeSelectDefaults() {
   var emptyBoxes = document.getElementsByTagName("select");
   for (var i = 0; i < emptyBoxes.length; i++) {
      emptyBoxes[i].selectedIndex = -1;
      emptyBoxes[i].style.boxShadow = "none";
   }
}
/* validate date fieldset */
function validatepickedDate() {
   var selectElements = document.querySelectorAll("#pickaDate select");
   var errorDiv = document.querySelector("#pickaDate .errorMessage");
   var fieldsetValidity = true;
   var elementCount = selectElements.length;
   var currentElement;
   try {
      for (var i = 0; i < elementCount; i++) {
         currentElement = selectElements[i];
         if (currentElement.selectedIndex === -1) {
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
         } else {
            currentElement.style.border = "";
         }
      }
      if (fieldsetValidity === false) {
         throw "Please specify a date.";
      } else {
         errorDiv.style.display = "none";
         errorDiv.innerHTML = "";
      }
   }
   catch(msg) {
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      formValidity = false;
   }
}
/* validate form */
function validateForm(evt) {
   if (evt.preventDefault) {
      evt.preventDefault(); // prevent form from submitting
   } else {
      evt.returnValue = false; // prevent form from submitting in IE8
   }
   formValidity = true; // reset value for revalidation
   validatepickedDate();
   if (formValidity === true) {
      document.getElementById("errorText").innerHTML = "";
      document.getElementById("errorText").style.display = "none";
      document.getElementsByTagName("form")[0].submit();
   } else {
      document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit.";
      document.getElementById("errorText").style.display = "block";
      scroll(0,0);
   }
}
/* create event listeners */
function createEventListeners() {
   var pickedMonth = document.getElementById("pickMo");
   if (pickedMonth.addEventListener) {
     pickedMonth.addEventListener("change", updateDays, false);
   } else if (pickedMonth.attachEvent)  {
     pickedMonth.attachEvent("onchange", updateDays);
   }

   var pickedYear = document.getElementById("pickYr");
   if (pickedYear.addEventListener) {
     pickedYear.addEventListener("change", updateDays, false);
   } else if (pickedYear.attachEvent)  {
     pickedYear.attachEvent("onchange", updateDays);
   }
   var form = document.getElementsByTagName("form")[0];
   if (form.addEventListener) {
      form.addEventListener("submit", validateForm, false);
   } else if (form.attachEvent) {
      form.attachEvent("onsubmit", validateForm);
   }
}
/* run initial form configuration functions */
function setUpPage() {
   removeSelectDefaults();
   setupDays();
   createEventListeners();
   generatePlaceholder();
}

/* run setup functions when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", setUpPage);
}
