<template>
  <!-- Dynamic Wrapper -->
  <component
    :is="wrapper"
    class="c-dropdown"
    data-dropdown="container"
    v-click-outside="handleClickOutside"
  >
    <!-- Dropdown Button -->
    <button
      v-if="this.$slots.btn"
      :class="[btnClass, 'c-dropdown__btn']"
      data-dropdown="btn"
      @click="toggle"
    >
      <slot name="btn"></slot>
    </button>

    <!-- Dropdown Menu -->
    <transition name="c-dropdown__menu" mode="out-in">
      <div
        v-if="this.$slots.menu && active"
        :class="[menuClass, 'c-dropdown__menu']"
        data-dropdown="menu"
      >
        <slot name="menu"></slot>
      </div>
    </transition>
  </component>
</template>

<script>
export default {
  props: {
    btnClass: String,
    menuStyle: {
      type: String,
      default: "light",
    },
    position: String,
    wrapper: {
      type: String,
      default: "div",
    },
  },

  data() {
    return {
      active: false,
    };
  },

  methods: {
    toggle() {
      this.active = !this.active;
    },
    handleClickOutside() {
      if (this.active) {
        this.active = false;
      }
    },
  },

  computed: {
    menuClass() {
      return `c-dropdown__menu--${this.position} u-bg-${this.menuStyle}`;
    },
  },
};
</script>