<template>
  <Avatar
    backgroundColor="#fff"
    :username="username"
    :size="Number(size)"
    :customStyle="{ 'font-weight': 'bold' }"
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
  },

  computed: {
    username() {
      return `${this.$auth.user.name} ${this.$auth.user.family_name}`;
    },
  },
};
</script>

<style>
</style>