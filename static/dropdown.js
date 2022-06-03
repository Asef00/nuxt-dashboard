/* eslint-env browser */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", (e) => {
      const isDropdownButton = e.target.matches(
        "[data-dropdown='btn'], [data-dropdown='btn'] > *"
      );
      if (
        !isDropdownButton &&
        e.target.closest("[data-dropdown='container']") != null
      )
        return;

      let currentDropdown;
      if (isDropdownButton) {
        currentDropdown = e.target.closest("[data-dropdown='container']");
        let menu = currentDropdown.querySelector("[data-dropdown='menu']");
        currentDropdown.classList.toggle("is-active");

        if (menu.style.maxHeight) menu.style.maxHeight = null;
        else menu.style.maxHeight = currentDropdown.scrollHeight + "px";
      }

      document
        .querySelectorAll("[data-dropdown='container'].is-active")
        .forEach((dropdown) => {
          if (dropdown === currentDropdown) return;
          dropdown.querySelector("[data-dropdown='menu']").style.maxHeight =
            null;
          dropdown.classList.remove("is-active");
        });
    });
  });
})();
