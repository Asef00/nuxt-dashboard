<template>
  <img
    @click="$emit('action')"
    :src="src ? src : `/img/${icon}.svg`"
    :alt="alt ? alt : `${icon} icon`"
  />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
  },
};
</script>