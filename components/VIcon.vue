<template>
  <img
    @click="$emit('action')"
    :src="[`/img/${icon}.svg`]"
    :alt="[`${icon} icon`]"
  />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
};
</script>