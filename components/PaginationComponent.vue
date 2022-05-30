<template>
  <div class="c-pagination">
    Show
    <input type="text" class="c-pagination__input" value="15" />
    entries
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
};
</script>

<style  lang="scss">
@import "~/assets/scss/components/pagination";
</style>