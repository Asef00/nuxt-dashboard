<template>
  <div class="c-tabs">
    <ul class="c-tabs__header">
      <li
        class="c-tabs__item"
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
        :class="{ 'is-active': index == selectedIndex }"
      >
        {{ tab.title }}
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
.c-tabs {
  @include flex-column;
}

.c-tabs__header {
  margin: (-$card-body-py) (-$card-body-px) 0;
  display: flex;
  @include border(bottom);
}

.c-tabs__item {
  font-weight: 600;
  text-transform: capitalize;
  padding: 1em;
  cursor: pointer;
}
</style>