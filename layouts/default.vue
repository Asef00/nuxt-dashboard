<template>
  <div class="o-wrapper">
    <nav class="o-wrapper__side">
      <SidenavPartial @toggleMenu="toggleMenu()" :isActive="isMenuActive" />
    </nav>

    <div class="o-wrapper__center">
      <HeaderPartial @toggleMenu="toggleMenu()" />

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

  data() {
    return { isMenuActive: false };
  },

  methods: {
    toggleMenu(close = false) {
      if (close) {
        this.isMenuActive = false;
      } else {
        this.isMenuActive = !this.isMenuActive;
      }
    },
  },
  
  watch: {
    $route() {
      this.toggleMenu();
    },
  },
};
</script>

<style scoped>
</style>
