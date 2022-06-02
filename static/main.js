/* eslint-env browser */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    // Your custom JavaScript goes here

    // handle sidenav on mobile
    let sidenav = document.getElementsByClassName("js-sidenav")[0];
    let menu_open = document.getElementsByClassName("js-menu-open")[0];
    let menu_close = document.getElementsByClassName("js-menu-close")[0];
    menu_open.onclick = function () {
      sidenav.classList.add("is-open");
    };
    menu_close.onclick = function () {
      sidenav.classList.remove("is-open");
    };

  });
})();
Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};
