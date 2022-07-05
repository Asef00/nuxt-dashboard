<template>
  <div class="c-sidenav js-sidenav">
    <!-- <vue-custom-scrollbar> -->
    <ul class="c-sidenav__list" role="presentation">
      <li class="c-sidenav__header">
        <NuxtLink to="/" class="c-logo">
          <VIcon icon="logo" width="80" height="60" />
        </NuxtLink>
        <span class="c-sidenav__close js-menu-close">
          <fa icon="xmark" />
        </span>
      </li>
      <li class="c-sidenav__item pr-3 pl-3">
        <input type="text" class="c-sidenav__search" placeholder="Search ..." />
      </li>
      <li class="c-sidenav__item">
        <NuxtLink to="/" class="c-sidenav__link">
          <VIcon icon="dashboard" />
          <span>Dashboard</span>
        </NuxtLink>
      </li>
      <li v-if="can('person.index')" class="c-sidenav__item">
        <NuxtLink to="/person" class="c-sidenav__link">
          <VIcon icon="users" />
          <span>Persons</span>
        </NuxtLink>
      </li>
      <li v-if="can('person.product.index')" class="c-sidenav__item">
        <NuxtLink to="/person-product" class="c-sidenav__link">
          <VIcon icon="products" />
          <span>Products</span>
        </NuxtLink>
      </li>
      <VDropdown
        v-if="
          can([
            'role.index',
            'permission.index',
            'field-type.index',
            'field-name.index',
            'model.index',
            'license-mode.index',
            'product.index',
          ])
        "
        class="c-sidenav__item"
        btnClass="c-sidenav__link"
        position="right"
        wrapper="li"
      >
        <template #btn>
          <VIcon width="24" height="23" icon="note-1" />
          <span>Definitions</span>
        </template>
        <template #menu>
          <NuxtLink
            v-if="can('product.index')"
            to="/product"
            class="c-dropdown__item"
            >Products
          </NuxtLink>
          <NuxtLink
            v-if="can('license-mode.index')"
            to="/license-mode"
            class="c-dropdown__item"
            >License modes
          </NuxtLink>
          <NuxtLink
            v-if="can('group.index')"
            to="/group"
            class="c-dropdown__item"
            >Groups
          </NuxtLink>
          <NuxtLink
            v-if="can('role.index')"
            to="/acl/role"
            class="c-dropdown__item"
            >Roles
          </NuxtLink>
          <NuxtLink
            v-if="can('permission.index')"
            to="/acl/permission"
            class="c-dropdown__item"
            >Permissions
          </NuxtLink>
          <NuxtLink
            v-if="can('field-type.index')"
            to="/field/type"
            class="c-dropdown__item"
            >Field types
          </NuxtLink>
          <NuxtLink
            v-if="can('field-name.index')"
            to="/field/name"
            class="c-dropdown__item"
            >Field names
          </NuxtLink>
        </template>
      </VDropdown>
    </ul>
    <!-- </vue-custom-scrollbar> -->
  </div>
</template>

<script>
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default {
  name: "SidenavPartial",

  components: {
    vueCustomScrollbar,
  },

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

<style lang="scss">
@import "~/assets/scss/partials/sidenav";
@import "~/assets/scss/components/logo";
</style>
