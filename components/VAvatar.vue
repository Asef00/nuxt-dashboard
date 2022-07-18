<template>
  <Avatar
    v-if="username"
    :backgroundColor="background"
    :username="username"
    :size="Number(size)"
    :customStyle="{ 'font-weight': 'bold' }"
  />
  <VIcon v-else icon="avatar" :width="Number(size)" :height="Number(size)" />
</template>

<script>
import Avatar from "vue-avatar";

export default {
  name: "VAvatar",

  components: {
    Avatar,
  },

  props: {
    size: {
      type: String,
      default: "",
    },

    background: {
      type: String,
      default: "",
    },
  },

  computed: {
    username() {
      let name = this.$auth.user.name;
      let family = this.$auth.user.family_name;
      if (name || family) return `${name} ${family}`;
    },
  },
};
</script>

<style>
</style>