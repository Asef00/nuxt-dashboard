<template>
  <div class="o-wrapper">
    <nav class="o-wrapper__side">
      <SidenavPartial/>
    </nav>

    <div class="o-wrapper__center">
      <HeaderPartial/>

      <main class="o-wrapper__main">
        <Nuxt/>
      </main>

      <FooterPartial/>
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
    script: [
      {src: "/main.js"},
      {src: "/dropdown.js"},
    ],
  },
};
</script>

<style scoped>
</style>
