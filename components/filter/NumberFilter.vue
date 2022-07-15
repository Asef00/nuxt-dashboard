<template>
  <div class="c-filter__container">
    <div class="c-filter__number">
      <input type="number" placeholder="Enter Value" v-model="inputValue"/>

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
        {value: "=", label: "=", selected: true},
        {value: "<", label: "<"},
        {value: ">", label: ">"},
        {value: "<=", label: "<="},
        {value: ">=", label: ">="},
        {value: "!=", label: "!="},
      ],

      selectedOperator: "=",
      inputValue: "",
    };
  },

  methods: {
    filter() {
      this.$emit("filter", {val: this.inputValue, op: this.selectedOperator});
    },

    reset() {
      this.selectedOperator = "=";
      this.inputValue = "";
      this.filter();
    },
  },
};
</script>

<style lang="scss">
.c-filter__number {
  @include flex-between;
  height: 28px;
  border: none;
  border-radius: 3px;
  @include input-transition;
  @include input-border;

  &:focus-within {
    @include input-focus;
  }

  select,
  input[type="number"] {
    padding: 0 8px;
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    -moz-appearance: textfield;
  }

  input[type="text"] {
    // @include input-search-bg;
    flex: 1;
  }

  select {
    cursor: pointer;
    height: 100%;
    background-color: $filled-color;
    border-left: solid 1px #e1e0ea;
  }
}
</style>
