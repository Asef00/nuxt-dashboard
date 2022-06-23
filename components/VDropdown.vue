<template>
  <!-- Dynamic Wrapper -->
  <component
    :is="wrapper"
    :class="['c-dropdown', isActive ? 'is-active' : '']"
    v-click-outside="blur"
  >
    <!-- Dropdown Button -->
    <button
      v-if="this.$slots.btn"
      :class="[btnClass, 'c-dropdown__btn']"
      @click="toggle"
    >
      <slot name="btn"></slot>
    </button>

    <!-- Dropdown Menu -->
    <transition name="c-dropdown__menu" mode="out-in">
      <div
        ref="menu"
        v-if="this.$slots.menu"
        v-show="isActive"
        :class="[menuClass, 'c-dropdown__menu']"
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
      isActive: false,
    };
  },

  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    blur() {
      if (this.isActive) {
        this.isActive = false;
      }
    },
    // handle dropdown close to the edge
    reposition() {
      // using nestTick to let the element show up
      this.$nextTick(() => {
        if (
          this.$refs.menu.getBoundingClientRect().right + 10 >
          window.innerWidth
        ) {
          this.$refs.menu.style.left = "unset";
          this.$refs.menu.style.right = 0;
        }
      });
    },
  },

  computed: {
    menuClass() {
      return `c-dropdown__menu--${this.position} u-bg-${this.menuStyle}`;
    },
  },

  watch: {
    $route() {
      this.isActive = false;
    },
    isActive() {
      if (this.isActive) {
        this.reposition();
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/dropdown";
</style>