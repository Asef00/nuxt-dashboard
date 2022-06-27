<template>
  <div class="c-tab__content" v-if="initiated" v-show="isActive">
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
    tabKey: String,
  },

  data() {
    return {
      isActive: false,
      initiated: false,
    };
  },
};
</script>