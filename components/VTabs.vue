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
$orange-color: #ff6e38;

.c-tabs {
  @include flex-column;
}

.c-tabs__header {
  margin: (-$card-body-py) (-$card-body-px) 1em;
  display: flex;
  @include border(bottom);
}

.c-tabs__item {
  font-weight: 600;
  text-transform: capitalize;
  padding: 1em;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: $hover-color;
  }

  &.is-active {
    box-shadow: 0 -2px 0 0 $orange-color inset;
  }
}

.c-note {
  @include flex-inline-center;
  width: 16px;
  height: 16px;
  @include font-size(12px);
  background-color: #e2e3e5;
  border-radius: 5px;
  transform: translateY(-5px);
}
</style>