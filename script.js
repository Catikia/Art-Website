/*    JavaScript 6th Edition
 *    Valentine's Art Gallery
 *    Author: Catikia
 *    Date:   11/1/2016
 *    Filename: script.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variable */
var formValidity = true;

// validate entered name  /* added 11/1 */
function validateName() {
   var nInput = document.getElementById("nameinput");
   var errorDiv = document.getElementById("nameError");
   try {
//      if (nInput.value.length < 2) {
      if (/.{2,}/.test(nInput.value) === false) {
         throw "Name must be at least 2 letters long";
      } else if (/\W/.test(nInput.value) === true) {
		  throw "Name must contain only letters";
      } else if (/\d/.test(nInput.value) === true) {
		  throw "Name must contain only letters";
	  }
      // remove any username error styling and message
      nInput.style.background = "";
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
}
   catch(msg) {
      // display error message
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      // change input style
      nInput.style.background = "rgb(255,233,233)";
   }
}

// validate entered email /* added 11/1 */
function validateEmail() {
   var emailInput = document.getElementById("emailbox");
   var errorDiv = document.getElementById("emailError");
   var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
   try {
//      if (emailInput.value.search(/@/) === -1 ||
//          emailInput.value.lastIndexOf(".") === -1) {
//      if (
//         (/@/.test(emailInput.value) === false) || (
//            (/\...$/.test(emailInput.value) === false) &&
//            (/\....$/.test(emailInput.value) === false) &&
//            (/\.....$/.test(emailInput.value) === false) &&
//            (/\.......$/.test(emailInput.value) === false)
//         )
//      ) {
//      if ((/@/.test(emailInput.value) === false) ||
//          (/\..{2,6}$/.test(emailInput.value) === false)) {
      if (emailCheck.test(emailInput.value) === false) {
         throw "Please provide a valid email address";
      }
       // remove any email error styling and message
      emailInput.style.background = "";
      errorDiv.innerHTML = "";
      errorDiv.style.display = "none";
   }
   catch(msg) {
      // display error message
      errorDiv.innerHTML = msg;
      errorDiv.style.display = "block";
      // change input style
      emailInput.style.background = "rgb(255,233,233)";
   }
}
//validate entered phone number - added 11/1
function validatePhone() {
   var pInput = document.getElementById("phoneinput");
   var errorDiv = document.getElementById("phoneError");
   try {
//      if (pInput.value.length < 10) {
      if (/.{10,}/.test(pInput.value) === false) {
         throw "Phone number must be at least 10 characters long";
      } else if (/\d{3}-\d{3}-\d{4}/.test(pInput.value) === false) {
         throw "Phone number must be in the form 123-456-7890";
      }
      // remove any phoneinput error styling and message
      pInput.style.background = "";
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
}
   catch(msg) {
      // display error message
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      // change input style
      pInput.style.background = "rgb(255,233,233)";
   }
}

/* remove default value and formatting from size selection list */
function removeSelectDefault() {
   var selectBox = document.getElementById("size");
   selectBox.selectedIndex = -1;
   selectBox.style.boxShadow = "none";
}

/* remove fallback placeholder text in description box */
function zeroPlaceholder() {
   var descBox = document.getElementById("description");
   descBox.style.color = "black";
   if (descBox.value === descBox.placeholder) {
      descBox.value = "";
   }
}

/* restore placeholder text in description box if box contains no user entry */
function checkPlaceholder() {
   var descBox = document.getElementById("description");
   if (descBox.value === "") {
      descBox.style.color = "rgb(178,184,183)";
      descBox.value = descBox.placeholder;
   }
}

/* add placeholder text in description box for browsers that don't support placeholder attribute */
function generatePlaceholder() {
   if (!Modernizr.input.placeholder) {
      var descBox = document.getElementById("description");
      descBox.value = descBox.placeholder;
      descBox.style.color = "rgb(178,184,183)";
      if (descBox.addEventListener) {
         descBox.addEventListener("focus", zeroPlaceholder, false);
         descBox.addEventListener("blur", checkPlaceholder, false);
      } else if (descBox.attachEvent)  {
         descBox.attachEvent("onfocus", zeroPlaceholder);
         descBox.attachEvent("onblur", checkPlaceholder);
      }
   }
}

/* validate required fields */
function validateRequired() {
   var inputElements = document.querySelectorAll("input[required]");
   var errorDiv = document.getElementById("errorMessage");
   var artmedium = document.getElementsByName("medium");
   var sizeBox = document.getElementById("size");
   var fieldsetValidity = true;
   var elementCount = inputElements.length;
   var currentElement;
   try {
      for (var i = 0; i < elementCount; i++) {
         // validate all required input elements in fieldset
         currentElement = inputElements[i];
         if (currentElement.value === "") {
            currentElement.style.background = "rgb(255,233,233)";
            fieldsetValidity = false;
         } else {
            currentElement.style.background = "white";
         }
      }


      if (!artmedium[0].checked && !artmedium[1].checked && !artmedium[2].checked && !artmedium[3].checked && !artmedium[4].checked && !artmedium[5].checked){
         // verify that an art medium is selected
         artmedium[0].style.outline = "1px solid red";
         artmedium[1].style.outline = "1px solid red";
		 artmedium[2].style.outline = "1px solid red";
         artmedium[3].style.outline = "1px solid red";
		 artmedium[4].style.outline = "1px solid red";
         artmedium[5].style.outline = "1px solid red";
         fieldsetValidity = false;
      } else {
         artmedium[0].style.outline = "";
         artmedium[1].style.outline = "";
		 artmedium[2].style.outline = "";
         artmedium[3].style.outline = "";
		 artmedium[4].style.outline = "";
         artmedium[5].style.outline = "";
      }



      if (fieldsetValidity === false) {
           throw "Please complete all required fields.";
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
   validateRequired();
   if (formValidity === true) {
      document.getElementById("errorMessage").innerHTML = "";
      document.getElementById("errorMessage").style.display = "none";
      document.getElementsByTagName("form")[0].submit();
   } else {
      document.getElementById("errorMessage").innerHTML = "Please complete the highlighted fields.";
      document.getElementById("errorMessage").style.display = "block red";
      scroll(0,0);
   }
}

/* create event listeners  */
function createEventListeners() {
	var nInput = document.getElementById("nameinput");
   var emailInput = document.getElementById("emailbox");
   var pInput = document.getElementById("phoneinput")
   if (nInput.addEventListener) {
      nInput.addEventListener("change", validateName, false);
      emailInput.addEventListener("change", validateEmail, false);
	  pInput.addEventListener("change", validatePhone, false);
   } else if (nInput.attachEvent) {
      nInput.attachEvent("onchange", validateName);
      emailInput.attachEvent("onchange", validateEmail);
	  pInput.addEventListener("onchange", validatePhone);
   }
   var orderForm = document.getElementsByTagName("form")[0];
   if (orderForm.addEventListener) {
      orderForm.addEventListener("submit", validateForm, false);
   } else if (orderForm.attachEvent) {
      orderForm.attachEvent("onsubmit", validateForm);
   }
}

/* run initial form configuration functions */
function setUpPage() {
   removeSelectDefault();
   createEventListeners();
   generatePlaceholder();
}

/* run setup functions when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", setUpPage);
}
