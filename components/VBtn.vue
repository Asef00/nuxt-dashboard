<template>
  <button
    @click="$emit('action')"
    :disabled="disabled"
    :type="type"
    :class="['c-btn', classBtn]"
  >
    <span v-if="loader"><LoaderDots :color="colorLoader"></LoaderDots></span>
    <slot v-else/>
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
      if (this.btn === "primary") {
        this.colorLoader = "#fff";
        return "c-btn--primary";
      }
      if (this.btn === "outline") {
        this.colorLoader = "#444";
        return "c-btn--outline";
      }
      if (this.btn === "block") {
        this.colorLoader = "#444";
        return "c-btn--block";
      }
      if (this.btn === "info") {
        this.colorLoader = "#fff";
        return "c-btn--info";
      }
      if (this.btn === "danger") {
        this.colorLoader = "#fff";
        return "c-btn--danger";
      }
      if (this.btn === "success") {
        this.colorLoader = "#fff";
        return "c-btn--success";
      }
      if (this.btn === "simple") {
        this.colorLoader = "#444";
        return "";
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
