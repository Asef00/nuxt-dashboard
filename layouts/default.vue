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
};
</script>

<style scoped>
</style>
