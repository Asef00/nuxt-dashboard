<template>
  <span :class="badgeClass">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
  },

  computed: {
    badgeClass() {
      if (this.type) return `c-note u-bg-${this.type}`;
      else return "c-note";
    },
  },
};
</script>

<style lang="scss">
.c-note {
  @include flex-inline-center;
  width: 16px;
  height: 16px;
  @include font-size(12px);
  background-color: #e2e3e5;
  border-radius: 5px;
}
</style>