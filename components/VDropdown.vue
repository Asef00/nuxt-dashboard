<template>
  <!-- Dynamic Wrapper -->
  <component :is="wrapper" class="c-dropdown" data-dropdown="container">
    <!-- Dropdown Button -->
    <button
      v-if="this.$slots.btn"
      :class="[btnClass, 'c-dropdown__btn']"
      data-dropdown="btn"
    >
      <slot name="btn"></slot>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="this.$slots.menu"
      :class="[menuClass, 'c-dropdown__menu']"
      data-dropdown="menu"
    >
      <slot name="menu"></slot>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    btnClass: String,
    position: String,
    wrapper: String,
  },

  computed: {
    menuClass() {
      return `c-dropdown__menu--${this.position}`;
    },
  },
};
</script>