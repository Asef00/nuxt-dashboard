<template>
  <div class="c-card">
    <div class="c-card__header">
      <h2 class="c-card__title">{{ title }}</h2>
    </div>
    <div class="c-card__body">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    title: String
  },
  methods: {},
};
</script>

<style lang="scss">
@import "~/assets/scss/components/card";
</style>
