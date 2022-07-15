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
      <VBtn btn="simple" size="sm" class="mb-0" @action="reset()"> Reset</VBtn>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectFilter",

  props: {
    items: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      selectedOption: "",
      defaultOption: "",
      key: 0,
    };
  },

  mounted() {
    //set default value from provided list
    let result = this.items.filter((obj) => {
      return obj.selected == true;
    });
    this.defaultOption = result[0].value;
  },

  methods: {
    filter() {
      this.$emit("filter", this.selectedOption);
    },

    reset() {
      this.selectedOption = this.defaultOption;
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
