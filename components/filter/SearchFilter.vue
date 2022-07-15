<template>
  <div class="c-filter__container">
    <div class="c-filter__search">
      <VInput
        class="m-0"
        inputClass="c-form__input c-form__input--sm"
        placeholder="Search..."
        v-model="inputValue"
      />
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
      inputValue: "",
    };
  },

  methods: {
    filter() {
      this.$emit("filter", this.inputValue);
    },
    reset() {
      this.inputValue = "";
      this.filter();
    },
  },
};
</script>