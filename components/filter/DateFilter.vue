<template>
  <div class="c-filter__container">
    <div class="c-filter__date">
      <span>Start Date</span>
      <VInput
        v-model="startDate"
        type="date"
        placeholder="Start Point"
        class="m-0"
      />

      <span>End Date</span>
      <VInput
        v-model="endDate"
        type="date"
        placeholder="End point"
        class="m-0"
        :disabled="endDateDisabled"
      />
    </div>

    <div class="c-filter__buttons">
      <VBtn btn="simple" size="sm" class="mb-0" @action="reset()">Claer</VBtn>
      <VBtn size="sm" class="mb-0" @action="filter()">Filter</VBtn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: null,
      endDate: null,
      endDateDisabled: true,
    };
  },

  methods: {
    filter() {
      // using filter to exclude empty end-date
      this.$emit(
        "filter",
        [this.startDate, this.endDate].filter(Boolean).join(",")
      );
    },

    reset() {
      this.startDate = "";
      this.endDate = "";
      this.filter();
    },
  },

  watch: {
    startDate(val) {
      if (val) this.endDateDisabled = false;
      else this.endDateDisabled = true;
    },
  },
};
</script>

<style lang="scss">
.c-filter__date {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-row-gap: 0.5em;
  align-items: center;
}
</style>