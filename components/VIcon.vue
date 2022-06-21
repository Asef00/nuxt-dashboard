<template>
  <img :src="[`/img/${icon}.svg`]" :alt="icon" />
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