/* eslint-env browser */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    // Your custom JavaScript goes here

    var sidenav = document.getElementsByClassName("js-sidenav")[0];
    var menu_open = document.getElementsByClassName("js-menu-open")[0];
    var menu_close = document.getElementsByClassName("js-menu-close")[0];
    menu_open.onclick = function() {
      sidenav.classList.add("is-open");
    };
    menu_close.onclick = function() {
      sidenav.classList.remove("is-open");
    };
  });
})();
