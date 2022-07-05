<template>
  <!-- Dynamic Wrapper -->
  <component
    :is="wrapper"
    :class="[dropdownClass, { 'is-active': isActive }]"
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
        :class="[menuClass, { 'u-position-fixed': fixed }]"
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
    fixed: {
      type: Boolean,
      default: false,
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
      if (this.fixed) this.isActive = false;
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

    // handle dropdown close to the edge + fixed menu position
    reposition() {
      // console.log("repositioning!");
      // using nestTick to let the element show up
      this.$nextTick(() => {
        let menu = this.$refs.menu;
        let menuRect = menu.getBoundingClientRect();
        let btn = {
          rect: this.$refs.btn.getBoundingClientRect(),
          top: function () {
            return this.rect.top;
          },
          right: function () {
            return this.rect.right;
          },
          bottom: function () {
            return this.rect.bottom;
          },
          left: function () {
            return this.rect.left;
          },
        };

        //handle fixed position
        if (this.fixed) {
          this.FRepos(menu, btn);
        }
        // vertical
        if (menuRect.right + 10 > window.innerWidth) {
          this.VRepos(menu);
        }
        // horizontal
        if (menuRect.bottom + 10 > window.innerHeight) {
          this.HRepos(menu);
        }
      });
    },

    HRepos(m) {
      // console.log("Horizontal reposition");
      if (this.fixed) {
        //do nothing
      } else {
        m.classList.add("is-bottom");
        m.style.top = "unset";
        m.style.bottom = 0;
      }
    },

    VRepos(m) {
      // console.log("Vertical reposition");
      if (this.fixed) {
        //do nothing
      } else {
        m.style.left = "unset";
        m.style.right = 0;
      }
    },

    FRepos(m, btn) {
      // console.log("Fixed reposition");
      let margin = 10;
      switch (this.position) {
        case "right":
          {
            //left = btn.rightPosition + margin
            m.style.left = `${btn.right() + margin}px`;
            //right = "unset"
            m.style.right = "unset";
            //top = btn.topPosition
            m.style.top = `${btn.top()}px`;
            //bottom = unset
            m.style.bottom = "unset";
          }
          break;
        case "bottom": {
          //left = btn.leftPosition
          m.style.left = `${btn.left()}px`;
          //right = "unset"
          m.style.right = "unset";
          //top = btn.bottomPosition + margin
          m.style.top = `${btn.bottom() + margin}px`;
          //bottom = unset
          m.style.bottom = "unset";
        }
      }
      // console.log(btn.top(), btn.right(), btn.bottom(), btn.left());
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