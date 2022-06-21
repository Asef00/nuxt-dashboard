<template>
  <div class="c-header">
    <div class="c-header__upper">
      <button class="c-header__menu js-menu-open">
        <img src="/img/menu.svg" alt="menu icon" />
      </button>

      <div class="c-navbar">
        <input type="text" class="c-navbar__search" placeholder="Search ..." />

        <img src="/img/bell.svg" alt="notification icon" />

        <img src="/img/envelope.svg" alt="message icon" />

        <VDropdown
          class="c-navbar__user"
          position="bll"
          btnClass="c-navbar__avatar"
        >
          <template #btn>
            <img src="/img/avatar.svg" width="34" height="34" alt="user icon" />
          </template>
          <template #menu>
            <header class="c-dropdown__header">Welcome!</header>

            <NuxtLink to="/profile" class="c-dropdown__item">
              My Profile
            </NuxtLink>
            <span class="c-dropdown__divider"></span>
            <a @click="logout" class="c-dropdown__item">Logout</a>
          </template>
        </VDropdown>
      </div>
    </div>
    <div class="c-header__lower js-header-lower">
      <h1 class="c-header__title">{{ $store.state.pageHeaderTitle }}</h1>
      <ul class="c-breadcrumb">
        <li class="c-breadcrumb__item">
          <NuxtLink class="c-breadcrumb__link" to="/">Dashboard</NuxtLink>
        </li>
        <li
          class="c-breadcrumb__item"
          v-for="(breadcrumb, index) in $store.state.pageHeaderBreadcrumb"
          :key="index"
        >
          <span class="c-breadcrumb__div">/</span>
          <NuxtLink class="c-breadcrumb__link" :to="breadcrumb.to">
            {{ breadcrumb.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderPartial",
  methods: {
    logout() {
      this.$store.dispatch("me/revokeToken");
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/partials/header";
@import "~/assets/scss/components/navbar";
@import "~/assets/scss/components/breadcrumb";
</style>
