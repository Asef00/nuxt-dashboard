<template>
  <div class="c-sidenav js-sidenav">
    <ul class="c-sidenav__list" role="presentation">
      <li class="c-sidenav__header">
        <NuxtLink to="/" class="c-logo">
          <img src="/img/logo.svg" alt="logo"/>
        </NuxtLink>
        <span class="c-sidenav__close js-menu-close">
          <fa icon="xmark"/>
        </span>
      </li>
      <li class="c-sidenav__item pr-3 pl-3">
        <input type="text" class="c-sidenav__search" placeholder="Search ..."/>
      </li>
      <li class="c-sidenav__item">
        <NuxtLink to="/" class="c-sidenav__link">
          <img src="/img/dashboard.svg" alt="dashboard"/>
          <span>Dashboard</span>
        </NuxtLink>
      </li>
      <li v-if="can('person.index')" class="c-sidenav__item">
        <NuxtLink to="/person" class="c-sidenav__link">
          <img src="/img/users.svg" alt="users"/>
          <span>Person</span>
        </NuxtLink>
      </li>
      <li v-if="can('product.index')" class="c-sidenav__item">
        <NuxtLink to="/product" class="c-sidenav__link">
          <img src="/img/products.svg" alt="product"/>
          <span>Products</span>
        </NuxtLink>
      </li>
      <li v-if="can(['role.index','permission.index','field-type.index','field-name.index','model.index','license-mode.index'])" class="c-sidenav__item c-dropdown" data-dropdown="container">
        <button class="c-sidenav__link c-dropdown__btn" data-dropdown="btn">
          <img src="/img/settings.svg" alt=""/>
          <span>Settings</span>
        </button>
        <div
          class="c-dropdown__menu c-dropdown__menu--right"
          data-dropdown="menu"
        >
          <NuxtLink v-if="can('role.index')" to="/acl/role" class="c-dropdown__item">Roles</NuxtLink>
          <NuxtLink v-if="can('permission.index')" to="/acl/permission" class="c-dropdown__item">
            Permissions
          </NuxtLink>
          <NuxtLink v-if="can('field-type.index')" to="/field/type" class="c-dropdown__item">
            Field types
          </NuxtLink>
          <NuxtLink v-if="can('field-name.index')" to="/field/name" class="c-dropdown__item">
            Field names
          </NuxtLink>
          <NuxtLink v-if="can('model.index')" to="/model" class="c-dropdown__item">Model</NuxtLink>
          <NuxtLink v-if="can('license-mode.index')" to="/license-mode" class="c-dropdown__item">
            License mode
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SidenavPartial",

  watch: {
    $route: {
      handler() {
        // close sidenave when route changes
        document.querySelector(".js-sidenav").classList.remove("is-open");

        // remove active class from all links
        setTimeout(() => {
          this.findActive();
        }, 500);
      },
      // immediate: true,
      deep: true,
    },
  },

  methods: {
    findActive() {
      let test = document.querySelector(
        "[data-dropdown='container'] .nuxt-link-exact-active"
      );
      if (test) {
        test
          .closest("[data-dropdown='container']")
          .querySelector("[data-dropdown='btn']")
          .classList.add("is-active");
      } else {
        document.querySelectorAll("[data-dropdown='btn']").forEach((btn) => {
          btn.classList.remove("is-active");
        });
      }
    },
  },

  mounted() {
    // add active class to dropdown btn
    this.findActive();
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/partials/sidenav";
@import "~/assets/scss/components/logo";
</style>
