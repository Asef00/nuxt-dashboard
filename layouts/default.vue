<template>
  <div class="o-wrapper">
    <nav class="o-wrapper__side">
      <SidenavPartial />
    </nav>

    <div class="o-wrapper__center">
      <HeaderPartial />

      <main class="o-wrapper__main">
        <Nuxt />
      </main>

      <FooterPartial />
    </div>
  </div>
</template>

<script>
import FooterPartial from "../components/partials/FooterPartial.vue";
import HeaderPartial from "../components/partials/HeaderPartial.vue";
import SidenavPartial from "../components/partials/SidenavPartial.vue";

export default {
  name: "default",
  scrollTop: true,

  components: {
    HeaderPartial,
    SidenavPartial,
    FooterPartial,
  },

  head: {
    script: [{ src: "/main.js" }],
  },

  mounted() {
    //dropdown.js
    // handle dropdown close to the edge
    document.querySelectorAll("[data-dropdown='menu']").forEach((menu) => {
      if (menu.getBoundingClientRect().right + 10 > window.innerWidth) {
        menu.style.left = "unset";
        menu.style.right = 0;
      }
    });

    // document.addEventListener("click", (e) => {
    //   const isDropdownButton = e.target.matches(
    //     "[data-dropdown='btn'], [data-dropdown='btn'] > *"
    //   );
    //   if (
    //     !isDropdownButton &&
    //     e.target.closest("[data-dropdown='container']") != null
    //   )
    //     return;

    //   let currentDropdown;
    //   if (isDropdownButton) {
    //     currentDropdown = e.target.closest("[data-dropdown='container']");
    //     let menu = currentDropdown.querySelector("[data-dropdown='menu']");
    //     currentDropdown.classList.toggle("is-active");

    //     // dealing with max-height property to have animation/transition on mobile accordion menu
    //     if (menu.style.maxHeight) menu.style.maxHeight = null;
    //     else menu.style.maxHeight = currentDropdown.scrollHeight + "px";
    //   }

    //   document
    //     .querySelectorAll("[data-dropdown='container'].is-active")
    //     .forEach((dropdown) => {
    //       if (dropdown === currentDropdown) return;
    //       dropdown.querySelector("[data-dropdown='menu']").style.maxHeight =
    //         null;
    //       dropdown.classList.remove("is-active");
    //     });
    // });

    //sidenav.js
    // handle sidenav on mobile
    let sidenav = document.querySelector(".js-sidenav");
    let menu_open = document.querySelector(".js-menu-open");
    let menu_close = document.querySelector(".js-menu-close");
    menu_open.onclick = function () {
      sidenav.classList.add("is-open");
    };
    menu_close.onclick = function () {
      sidenav.classList.remove("is-open");
    };
  },

  watch: {
    $route() {
      // close all dropdowns when route changes
      document
        .querySelectorAll("[data-dropdown='container']")
        .forEach((dropdown) => {
          dropdown.classList.remove("is-active");
        });
    },
  },
};
</script>

<style scoped>
</style>
