<template>
  <!-- if "to" provided -->
  <NuxtLink
    v-if="to"
    :class="['c-btn', btnClass, sizeClass, { 'is-disabled': isDisabled }]"
    :to="to"
    :event="disabled ? '' : 'click'"
  >
    <LoaderDots :color="colorLoader" v-if="loader"></LoaderDots>
    <slot v-else />
  </NuxtLink>

  <!-- else -->
  <button
    v-else
    @click="$emit('action')"
    :disabled="isDisabled"
    :type="type"
    :class="['c-btn', btnClass, sizeClass]"
  >
    <LoaderDots :color="colorLoader" v-if="loader"></LoaderDots>
    <slot v-else />
  </button>
</template>

<script>
export default {
  name: "VBtn",
  props: {
    to: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "submit",
      validator(value) {
        // must match one of these strings
        return ["button", "submit", "reset"].includes(value);
      },
    },
    btn: {
      type: String,
      default: "primary",
      validator(value) {
        // must match one of these strings
        return [
          "primary",
          "success",
          "danger",
          "warn",
          "info",
          "dark",
          "simple",
          "outline",
          "block",
        ].includes(value);
      },
    },
    loader: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      colorLoader: "#fff",
      isDisabled: this.disabled,
    };
  },

  computed: {
    btnClass() {
      switch (this.btn) {
        case "success": {
          this.colorLoader = "#fff";
          return "c-btn--success";
        }
        case "danger": {
          this.colorLoader = "#fff";
          return "c-btn--danger";
        }
        case "warn": {
          this.colorLoader = "#fff";
          return "c-btn--warn";
        }
        case "info": {
          this.colorLoader = "#fff";
          return "c-btn--info";
        }
        case "dark": {
          this.colorLoader = "#fff";
          return "c-btn--dark";
        }
        case "simple": {
          this.colorLoader = "#444";
          return "";
        }
        case "outline": {
          this.colorLoader = "#444";
          return "c-btn--outline";
        }
        case "block": {
          this.colorLoader = "#444";
          return "c-btn--block";
        }
        default: {
          this.colorLoader = "#fff";
          return "c-btn--primary";
        }
      }
    },
    sizeClass() {
      switch (this.size) {
        case "sm":
          return "c-btn--small";
      }
    },
  },

  watch: {
    loader(value) {
      this.isDisabled = value;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/btn";
</style>
