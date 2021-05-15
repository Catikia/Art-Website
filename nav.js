/*    JavaScript 6th Edition
 *    Valentine's Art Gallery
 *    Author: Catikia
 *    Date:   12/1/2016
 *    Filename: nav.js
 */

//$("ul.mainmenu li").children("ul").addClass("show");

function display(event) {
//   $(event.currentTarget).children("ul").addClass("show");
//   $(event.currentTarget).children("ul").show();
   $(event.currentTarget).children("ul").slideDown("fast");
}

function hide(event) {
//   $(event.currentTarget).children("ul").removeClass("show");
   $(event.currentTarget).children("ul").hide();
}

/* run initial form configuration functions */
function setUpPage() {
   $("ul.mainmenu li").children("ul").hide(); //hides drop down menu
}

/* run setup functions when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", setUpPage);
}

$("ul.mainmenu li").hover(display,hide); /*shows drop down menu on hover and hides when not hovering */
