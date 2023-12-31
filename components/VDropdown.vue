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
      :class="[btnClass, computedBtnClass, { 'is-active': isBtnActive }]"
      @click="toggle()"
      ref="btn"
    >
      <slot name="btn"></slot>
    </button>

    <!-- Dropdown Menu -->
    <template v-if="this.$slots.menu">
      <transition
        :name="isFilter ? 'c-filter__transition' : 'c-dropdown__transition'"
        mode="out-in"
      >
        <div
          ref="menu"
          v-show="isActive"
          :style="style"
          :class="[menuClass, { 'c-dropdown__menu--fixed': fixed }]"
        >
          <slot name="menu"></slot>
        </div>
      </transition>
      <transition>
        <div
          v-if="isFilter"
          v-show="isActive"
          class="c-filter__mask"
          @click="toggle(true)"
        ></div>
      </transition>
    </template>
  </component>
</template>

<script>
export default {
  props: {
    btnClass: String,
    position: String,

    isFilter: {
      type: Boolean,
      default: false,
    },

    menuStyle: {
      type: String,
      default: "light",
    },

    menuGap: {
      type: Number,
      default: 10,
    },

    wrapper: {
      type: String,
      default: "div",
    },

    fixed: {
      type: Boolean,
      default: false,
    },

    //a key to hide the menu from parent
    hideKey: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      isActive: false,
      isBtnActive: false,
      isVertical: false,
      isHorizontal: false,
      btn: {},
      menu: {},
      menuRect: {},
    };
  },

  methods: {
    //close fixed dropdown on scroll
    handleScroll() {
      if (this.fixed) this.toggle(true);
    },

    toggle(hide = false) {
      if (hide) {
        this.isActive = false;
      } else {
        this.isActive = !this.isActive;
      }
      this.$emit("toggleShow");
    },

    blur() {
      if (this.isActive) {
        this.toggle(true);
      }
    },

    //handle dropdown close to the edge + fixed menu position
    reposition() {
      // console.log("REpos");
      //using nestTick to let the element show up
      this.$nextTick(() => {
        this.refreshData();

        if (this.isVertical) this.VRepos();
        if (this.isHorizontal) this.HRepos();
      });
    },

    VRepos() {
      // console.log("vertical", this.menuRect.bottom + 10, window.innerHeight);
      this.menu.classList.add("is-bottom"); //to change arrow position (CSS)

      if (this.fixed) {
        this.menu.style.top = `${this.btn.bottom() - this.menu.offsetHeight}px`;
        this.menu.style.bottom = "unset";
      } else {
        this.menu.style.top = "unset";
        this.menu.style.bottom = 0;
      }
    },

    HRepos() {
      // console.log("horizontal", this.menuRect.right + 10, window.innerWidth);
      if (this.fixed) {
        this.menu.style.left = `${this.btn.left() - this.menu.offsetWidth}px`;
        this.menu.style.right = "unset";
      } else {
        this.menu.style.right = 0;
        this.menu.style.left = "unset";
      }
    },

    FRepos() {
      // console.log("fixed");
      this.refreshData();
      switch (this.position) {
        case "right":
          {
            this.menu.style.left = `${this.btn.right() + this.menuGap}px`;
            this.menu.style.right = "unset";
            this.menu.style.top = `${this.btn.top()}px`;
            this.menu.style.bottom = "unset";
          }
          break;
        case "bottom": {
          this.menu.style.left = `${this.btn.left()}px`;
          this.menu.style.right = "unset";
          this.menu.style.top = `${this.btn.bottom() + this.menuGap}px`;
          this.menu.style.bottom = "unset";
        }
      }
    },

    refreshData() {
      this.menu = this.$refs.menu;
      this.menuRect = this.menu.getBoundingClientRect();
      this.btn = {
        rect: this.$refs.btn.getBoundingClientRect(),
        top() {
          return this.rect.top;
        },
        right() {
          return this.rect.right;
        },
        bottom() {
          return this.rect.bottom;
        },
        left() {
          return this.rect.left;
        },
      };
      this.isVertical = this.menuRect.bottom + 10 > window.innerHeight;
      this.isHorizontal = this.menuRect.right + 10 > window.innerWidth;
    },

    findActive() {
      // console.log(this.$refs.menu.querySelector(".nuxt-link-exact-active"));
      this.$nextTick(() => {
        if (this.$refs.menu.querySelector(".nuxt-link-exact-active")) {
          this.isBtnActive = true;
        } else {
          this.isBtnActive = false;
        }
      });
    },
  },

  computed: {
    dropdownClass() {
      if (this.isFilter) return "c-filter";
      else return "c-dropdown";
    },

    computedBtnClass() {
      if (this.isFilter) return "c-filter__btn";
      else return "c-dropdown__btn";
    },

    menuClass() {
      if (this.isFilter)
        return `c-filter__menu c-filter__menu--${this.position} u-bg-${this.menuStyle}`;
      else
        return `c-dropdown__menu c-dropdown__menu--${this.position} u-bg-${this.menuStyle}`;
    },

    style() {
      return this.fixed ? "top: unset;" : "";
    },
  },

  watch: {
    $route() {
      this.toggle(true);
      this.findActive();
    },

    isActive() {
      if (this.isActive) {
        if (this.fixed) this.FRepos();
        this.reposition();
      }
    },

    hideKey() {
      this.toggle(true);
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    setTimeout(() => {
      if (this.fixed) this.FRepos();
      this.findActive();
    }, 500);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/dropdown";
</style>