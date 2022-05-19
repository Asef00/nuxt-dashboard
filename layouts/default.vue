<template>
  <div class="container-fluid p-0">
    <div class="row g-0">
      <aside class="col-auto">
        <SidenavPartial />
      </aside>
      <div class="col">
        <HeaderPartial />
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
import HeaderPartial from "../components/partials/HeaderPartial.vue";
import SidenavPartial from "../components/partials/SidenavPartial.vue";
export default {
  name: "default",
  components: {
    HeaderPartial,
    SidenavPartial,
  },
};
</script>

<style scoped>
</style>
