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
        disabled
      />
    </div>

    <div class="c-filter__buttons">
      <VBtn btn="simple" size="sm" class="mb-0" @action="reset()">Claer</VBtn>
      <VBtn size="sm" class="mb-0" @action="changeDate()">Filter</VBtn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },

  methods: {
    changeDate() {
      console.log(this.startDate, this.endDate);
    },

    reset() {
      this.startDate = "";
      this.endDate = "";
    },
  },
};
</script>

<style>
</style>