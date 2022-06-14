<template>
  <button
    @click="$emit('action')"
    :disabled="disabled"
    :type="type"
    :class="['c-btn', classBtn]"
  >
    <span v-if="loader"><LoaderDots :color="colorLoader"></LoaderDots></span>
    <slot v-else />
  </button>
</template>

<script>
export default {
  name: "VBtn",
  props: {
    type: {
      type: String,
      default: "submit",
    },
    btn: {
      type: String,
      default: "primary",
    },
    loader: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      colorLoader: "#fff",
    };
  },
  computed: {
    classBtn() {
      switch (this.btn) {
        case "primary":
          return "c-btn--primary";
        case "secondary":
          return "c-btn--secondary";
        case "success":
          return "c-btn--success";
        case "danger":
          return "c-btn--danger";
        case "warn":
          return "c-btn--warn";
        case "info":
          return "c-btn--info";
        case "light":
          return "c-btn--light";
        case "dark":
          return "c-btn--dark";
        default:
          return "c-btn--primary";
      }
    },
  },
  watch: {
    loader(value) {
      this.disabled = value;
    },
  },
};
</script>

<style scoped>
</style>
