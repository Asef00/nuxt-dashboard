<template>
  <Avatar
    v-if="username"
    :backgroundColor="background"
    :username="username"
    :size="Number(size)"
    :customStyle="{
      'font-weight': 'bold',
      'box-shadow': '0px 10px 15px -3px rgba(0,0,0,0.1)',
    }"
    :src="username ? '' : '/img/avatar.svg'"
  />
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