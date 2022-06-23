<template>
  <div class="c-tabs">
    <ul class="c-tabs__header">
      <li
        class="c-tabs__item"
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="
          $emit(tab.action);
          selectTab(index);
        "
        :class="{ 'is-active': index == selectedIndex }"
      >
        {{ tab.title }}
        <span v-if="tab.noteCount" :class="`c-note u-bg-${tab.noteType}`">
          {{ tab.noteCount }}
        </span>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VTabs",

  props: {
    mode: {
      type: String,
      default: "light",
    },
  },

  data() {
    return {
      selectedIndex: 0,
      tabs: [],
    };
  },

  created() {
    this.tabs = this.$children;
  },

  mounted() {
    this.selectTab(0);
  },

  methods: {
    selectTab(i) {
      this.selectedIndex = i;
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/tab";
</style>