<template>
  <div class="o-wrapper">
    <nav class="o-wrapper__side">
      <TheSidenavPartial @toggleMenu="toggleMenu()" :isActive="isMenuActive" />
    </nav>

    <div class="o-wrapper__center">
      <TheHeaderPartial @toggleMenu="toggleMenu()" />

      <main class="o-wrapper__main">
        <Nuxt />
      </main>

      <TheFooterPartial />
    </div>
  </div>
</template>

<script>
import TheFooterPartial from "../components/partials/TheFooterPartial.vue";
import TheHeaderPartial from "../components/partials/TheHeaderPartial.vue";
import TheSidenavPartial from "../components/partials/TheSidenavPartial.vue";

export default {
  name: "default",
  scrollTop: true,

  components: {
    TheHeaderPartial,
    TheSidenavPartial,
    TheFooterPartial,
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
      this.toggleMenu(true);
    },
  },
};
</script>

<style scoped>
</style>
