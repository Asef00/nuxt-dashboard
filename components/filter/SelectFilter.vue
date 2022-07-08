<template>
  <div class="c-filter__container">
    <div class="c-filter__select">
      <VRadioButtonGroup
        :options="items"
        v-model="selectedOption"
        name="radio-input"
      />
    </div>

    <div class="c-filter__buttons">
      <VBtn btn="simple" size="sm" class="mb-0" @action="reset()"> Reset </VBtn>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectFilter",

  props: {
    items: {
      type: Array,
      default: () => [
        { label: "All", value: "all", selected: true },
        { label: "Enable", value: "enabled" },
        { label: "Disable", value: "disabled" },
      ],
    },
  },

  data() {
    return {
      selectedOption: "",
      defaultOption: ""
    };
  },

  methods: {
    filter() {
      this.$emit("filter", this.selectedOption);
    },

    reset() {
      this.selectedOption = "";
    },
  },

  watch: {
    selectedOption() {
      this.filter();
    },
  },
};
</script>

<style>
</style>