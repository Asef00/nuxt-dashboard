<template>
  <div class="c-tabs">
    <ul class="c-tabs__header">
      <li
        class="c-tabs__item"
        v-for="(tab, index) in tabs"
        @click="clickHandler(tab.action, index)"
        :key="tab.title"
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
    this.changeTab();
  },

  methods: {
    clickHandler(event, index) {
      if (index != this.selectedIndex) {
        this.$emit(event);
        this.changeTab(index);
      }
    },

    changeTab(i) {
      if (i !== undefined) {
        console.log("set:", i);
        //Set query
        let query = { ...this.$route.query };
        query.tab = i;
        this.$router.replace({ query: query });
      } else {
        //Get query
        i = this.$route.query.tab || 0;
        console.log("get:", i);
      }

      //change UI
      this.selectTab(i);
    },

    selectTab(i) {
      console.log("change to: ", i);
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