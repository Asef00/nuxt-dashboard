<template>
  <div class="c-card">
    <!-- Title & Toolbar -->
    <div v-if="title" class="c-card__header">
      <h2 class="c-card__title">{{ title }}</h2>
      <div class="c-card__toolbar" v-if="this.$slots.header">
        <slot name="header" />
      </div>
    </div>
    <!-- Tabs -->
    <div v-if="this.$slots.tabs" class="c-card__header p-0">
      <slot name="tabs"></slot>
    </div>
    <!-- Body -->
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
};
</script>
