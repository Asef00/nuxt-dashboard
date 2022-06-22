<template>
  <div class="c-tab__item" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VTab",

  props: {
    title: String,
  },
  data() {
    return {
      isActive: true,
    };
  },
};
</script>

<style>
</style>