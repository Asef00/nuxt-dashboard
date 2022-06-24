<template>
  <div class="c-tab__content" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VTab",

  props: {
    // these props are required
    // are being used in the parent(Tabs)
    title: String,
    noteCount: Number,
    noteType: String,
    action: String,
  },

  data() {
    return {
      isActive: true,
    };
  },
};
</script>