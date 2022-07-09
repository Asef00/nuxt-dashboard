<template>
  <div class="c-filter__container">
    <div class="c-filter__number">
      <input type="text" placeholder="Enter Value" v-model="inputValue" />

      <select v-model="selectedOperator">
        <option
          v-for="(opt, index) in options"
          v-html="opt.label"
          :key="index"
          :value="opt.value"
        ></option>
      </select>
    </div>

    <div class="c-filter__buttons">
      <VBtn btn="simple" size="sm" class="m-0" @action="reset()">Clear</VBtn>
      <VBtn size="sm" class="m-0" @action="filter()">Filter</VBtn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { value: "=", label: "=", selected: true },
        { value: "<", label: "<" },
        { value: ">", label: ">" },
        { value: "=<", label: "=<" },
        { value: "=>", label: "=>" },
        { value: "!=", label: "!=" },
      ],

      selectedOperator: "=",
      inputValue: "",
    };
  },

  methods: {
    filter() {
      // using filter to exclude empty end-date
      this.$emit(
        "filter",
        [this.inputValue, this.selectedOperator].filter(Boolean).join(",")
      );
      //console.log(this.selectedOperator);
    },

    reset() {
      this.selectedOperator = "=";
      this.filter();
    },
  },
};
</script>

<style>
</style>