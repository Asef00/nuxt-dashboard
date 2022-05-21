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

    // handle dropdown on mobile
    let dropdowns = document.getElementsByClassName("js-dropdown");
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener("click", function () {
        this.classList.toggle("is-open");
        // if (this.style.height != "0px") this.style.height = "0";
        // else this.style.height = "";
      });
    }
  });
})();
