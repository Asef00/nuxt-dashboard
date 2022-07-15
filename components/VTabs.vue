<template>
  <div class="c-tabs">
    <ul class="c-tabs__header">
      <li
        class="c-tabs__item"
        v-for="tab in tabs"
        @click="clickHandler(tab.tabKey)"
        :key="tab.tabKey"
        :class="{ 'is-active': tab.tabKey == selectedTab }"
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
    queryKey: {
      type: String,
      require: true,
    },
  },

  data() {
    return {
      selectedTab: "",
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
    clickHandler(key) {
      if (key != this.selectedTab) {
        this.$emit(key);
        this.changeTab(key);
      }
    },

    changeTab(key) {
      //Query stuff
      if (key !== undefined) {
        //Set query
        let query = { ...this.$route.query };
        query[this.queryKey] = key;
        this.$router.replace({ query: query });
      } else {
        //Get query
        key = this.$route.query[this.queryKey] || this.tabs[0].tabKey;
      }

      //change UI
      this.selectTab(key);
    },

    selectTab(key) {
      this.selectedTab = key;
      // loop over all the tabs
      this.tabs.forEach((tab) => {
        if (tab.tabKey == key) {
          tab.isActive = true;
          tab.initiated = true;
        } else {
          tab.isActive = false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/tab";
</style>