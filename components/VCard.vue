<template>
  <div class="c-card">
    <div class="c-card__header container">
      <div class="row">
        <h2 class="col c-card__title">{{ title }}</h2>
        <div class="col c-card__toolbar">
          <slot name="header" />
        </div>
      </div>
    </div>
    <div class="c-card__body">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "VCard",
  props: {
    title: String
  },
  methods: {}
};
</script>

<style scoped lang="scss">

@import "~/assets/scss/components/_card.scss";
</style>
