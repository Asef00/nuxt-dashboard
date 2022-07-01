<template>
  <fa @click="$emit('click')" v-if="type === 'fa'" :icon="`chevron-${dir}`" />
  <span
    v-else
    @click="$emit('click')"
    :class="`c-chevron c-chevron--${dir}`"
  ></span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "fa",
    },
    dir: {
      type: String,
      default: "up",
    },
  },
};
</script>

<style>
</style>