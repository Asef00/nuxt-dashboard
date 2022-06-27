<template>
  <!-- Dynamic Wrapper -->
  <component
    :is="wrapper"
    :class="[dropdownClass, isActive ? 'is-active' : '']"
    v-click-outside="blur"
  >
    <!-- Dropdown Button -->
    <button
      v-if="this.$slots.btn"
      :class="[btnClass, buttonClass]"
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
        :class="menuClass"
      >
        <slot name="menu"></slot>
      </div>
    </transition>
  </component>
</template>

<script>
export default {
  props: {
    isFilter: {
      type: Boolean,
      default: false,
    },
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
        let menu = this.$refs.menu;
        let rect = menu.getBoundingClientRect();

        // vertical
        if (rect.right + 10 > window.innerWidth) {
          menu.style.left = "unset";
          menu.style.right = 0;
        }
        // horizontal
        if (rect.bottom + 10 > window.innerHeight) {
          // console.log(rect.bottom, window.innerHeight);
          // menu.style.top = -rect.bottom + window.innerHeight - 10 + "px";
          menu.classList.add("is-bottom");
          menu.style.top = "unset";
          menu.style.bottom = 0;
        }
      });
    },
  },

  computed: {
    dropdownClass() {
      if (this.isFilter) return "c-filter";
      else return "c-dropdown";
    },
    buttonClass() {
      if (this.isFilter) return "c-filter__btn";
      else return "c-dropdown__btn";
    },
    menuClass() {
      if (this.isFilter)
        return `c-filter__menu c-filter__menu--${this.position} u-bg-${this.menuStyle}`;
      else
        return `c-dropdown__menu c-dropdown__menu--${this.position} u-bg-${this.menuStyle}`;
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