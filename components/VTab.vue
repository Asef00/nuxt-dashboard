<template>
  <div class="c-tab__content" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VTab",

  props: {
    title: String,
    noteCount: Number,
    noteType: String,
  },

  data() {
    return {
      isActive: true,
    };
  },
};
</script>