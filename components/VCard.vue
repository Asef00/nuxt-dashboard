<template>
  <div class="c-card">
    <div class="c-card__header">
      <h2 class="c-card__title">{{ title }}</h2>
      <div class="c-card__toolbar" v-if="this.$slots.header">
        <slot name="header" />
      </div>
    </div>
    <div class="c-card__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "VCard",
  props: {
    title: String,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/components/_card.scss";
</style>
