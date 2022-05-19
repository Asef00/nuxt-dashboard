<template>
  <div class="container-fluid p-0">
    <div class="row g-0">
      <aside class="col-auto">
        <SidenavPartial />
      </aside>
      <div class="col">
        <HeaderPartial />
        <Nuxt />
      </div>
    </div>
    <FooterPartial />
  </div>
</template>

<script>
import FooterPartial from '../components/partials/FooterPartial.vue';
import HeaderPartial from "../components/partials/HeaderPartial.vue";
import SidenavPartial from "../components/partials/SidenavPartial.vue";
export default {
  name: "default",
  components: {
    HeaderPartial,
    SidenavPartial,
    FooterPartial,
  },
};
</script>

<style scoped>
</style>
