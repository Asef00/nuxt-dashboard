<template>
  <div class="c-bar">
    <span class="c-bar__title">{{ title }}</span>
    <div class="c-bar__shell">
      <div
        :class="['c-bar__progress', barClass]"
        :style="{ width: value + '%' }"
      ></div>
    </div>
    <div class="c-bar__info">
      <span>{{ subtitle }}</span>
      <span>{{ value + "%" }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    bar: {
      type: String,
      default: "",
    },
  },

  computed: {
    barClass() {
      return `c-bar__progress--${this.bar}`;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/progress";
</style>