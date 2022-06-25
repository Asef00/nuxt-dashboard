<template>
  <NuxtLink
    v-if="to"
    :class="['c-btn', classBtn]"
    :to="to"
    :event="disabled ? '' : 'click'"
  >
    <LoaderDots :color="colorLoader" v-if="loader"></LoaderDots>
    <slot v-else />
  </NuxtLink>
  <button
    v-else
    @click="$emit('action')"
    :disabled="disabled"
    :type="type"
    :class="['c-btn', classBtn]"
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
  },
  watch: {
    loader(value) {
      this.disabled = value;
    },
  },
};
</script>

<style>
</style>
