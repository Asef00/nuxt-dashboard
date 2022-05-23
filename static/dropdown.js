/* eslint-env browser */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener("click", (e) => {
      const isDropdownButton = e.target.matches(
        "[data-dropdown-btn], [data-dropdown-btn] > *"
      );
      if (!isDropdownButton && e.target.closest("[data-dropdown]") != null)
        return;

      let currentDropdown;
      if (isDropdownButton) {
        currentDropdown = e.target.closest("[data-dropdown]");
        let menu = currentDropdown.querySelector(".c-dropdown__menu");
        currentDropdown.classList.toggle("is-active");

        if (menu.style.maxHeight) menu.style.maxHeight = null;
        else menu.style.maxHeight = currentDropdown.scrollHeight + "px";
      }

      document
        .querySelectorAll("[data-dropdown].is-active")
        .forEach((dropdown) => {
          if (dropdown === currentDropdown) return;
          dropdown.querySelector(".c-dropdown__menu").style.maxHeight = null;
          dropdown.classList.remove("is-active");
        });
    });
    
  });
})();
