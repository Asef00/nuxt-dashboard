<template>
  <div class="c-pagination">
    Show
    <input type="text" class="c-pagination__input" v-bind:value="value" />
    entries
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "15",
    },
  },
};
</script>

<style  lang="scss">
@import "~/assets/scss/components/pagination";
</style>