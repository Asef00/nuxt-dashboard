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
      ref="btn"
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
    //close filter dropdown on scroll
    handleScroll() {
      if (this.isFilter) this.isActive = false;
    },

    toggle() {
      this.isActive = !this.isActive;
      this.$emit("toggleShow");
    },

    blur() {
      if (this.isActive) {
        this.isActive = false;
        this.$emit("toggleShow");
      }
    },

    // handle dropdown close to the edge + filter menu position
    reposition() {
      // using nestTick to let the element show up
      this.$nextTick(() => {
        let menu = this.$refs.menu;
        let rect = menu.getBoundingClientRect();
        let btnBottom = this.$refs.btn.getBoundingClientRect().bottom;

        // vertical
        if (rect.right + 10 > window.innerWidth) {
          this.VRepos(menu);
        }
        // horizontal
        if (rect.bottom + 10 > window.innerHeight) {
          this.HRepos(menu);
        }
        //handle filter fixed position
        if (this.isFilter) {
          this.FRepos(menu, btnBottom);
        }
      });
    },

    HRepos(m) {
      console.log("Horizontal reposition");
      m.classList.add("is-bottom");
      m.style.top = "unset";
      m.style.bottom = 0;
    },

    VRepos(m) {
      console.log("Vertical reposition");
      m.style.left = "unset";
      m.style.right = 0;
    },

    FRepos(m, pos) {
      console.log("Filter reposition");
      console.log(pos);
      m.style.top = `${pos}px`;
      m.style.bottom = "unset";
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

  created: function () {
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed: function () {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/dropdown";
</style>