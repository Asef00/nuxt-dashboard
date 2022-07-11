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
      validator(value) {
        // must match one of these strings
        return [
          "primary",
          "success",
          "danger",
          "warn",
          "info",
          "dark",
          "light",
          "active",
          "inactive",
        ].includes(value);
      },
    },
  },

  computed: {
    badgeClass() {
      if (this.type) return `c-badge u-bg-${this.type}`;
      else return "c-badge";
    },
  },
};
</script>