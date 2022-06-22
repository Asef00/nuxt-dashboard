<template>
  <div class="c-card">
    <div class="c-card__header" v-if="title">
      <h2 class="c-card__title">{{ title }}</h2>
      <div class="c-card__toolbar" v-if="this.$slots.header">
        <slot name="header" />
      </div>
    </div>
    <div :class="{ 'c-card__body': true, 'is-loading': loader }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "VCard",
  props: {
    title: String,
    loader: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
};
</script>
