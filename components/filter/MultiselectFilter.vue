<template>
  <div class="c-filter__container">
    <div class="c-filter__multiselect">
      <template v-for="(item, index) in items">
        <VCheckbox
          :key="index"
          :label="item.label"
          :inputValue="item.value"
          v-model="selectedOptions"
          class="c-filter__item"
        />
      </template>
    </div>

    <div class="c-filter__buttons">
      <VBtn btn="simple" size="sm" class="mb-0" @action="reset()">Claer</VBtn>
      <VBtn size="sm" class="mb-0" @action="filter()">Filter</VBtn>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiselectFilter",

  data() {
    return {
      items: [
        { label: "Admin", value: "admin" },
        { label: "Developer", value: "developer" },
        { label: "Staff", value: "staff" },
      ],

      selectedOptions: [],
    };
  },

  methods: {
    filter() {
      // using filter to exclude empty end-date
      this.$emit("filter", this.selectedOptions.join(","));
    },

    reset() {
      this.selectedOptions = [];
      this.filter();
    },
  },
};
</script>

<style>
</style>