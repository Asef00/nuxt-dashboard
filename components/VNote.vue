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