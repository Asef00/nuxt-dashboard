<template>
  <div class="c-card">
    <!-- Title & Toolbar -->
    <div v-if="title" class="c-card__header">
      <h2 class="c-card__title">{{ title }}</h2>
      <div class="c-card__toolbar" v-if="this.$slots.header">
        <slot name="header" />
      </div>
    </div>
    <!-- Body -->
    <div :class="{ 'c-card__body': true, 'is-loading': loader }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "VCard",

  props: {
    title: String,
    loader: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/card";
</style>
