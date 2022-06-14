<template>
  <div class="c-sidenav js-sidenav">
    <ul class="c-sidenav__list" role="presentation">
      <li class="c-sidenav__header">
        <NuxtLink to="/" class="c-logo">
          <img src="/img/logo.svg" alt="logo" />
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16.001"
            viewBox="0 0 20 16.001"
          >
            <path
              data-name="Subtraction 2"
              d="M4.667 13H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2.668l-1.777-2h3.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-14a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3.39l-1.778 2z"
              style="fill: #564ec1"
            />
            <g data-name="Polygon 2" style="fill: none">
              <path
                d="M5.241.886a1 1 0 0 1 1.519 0l3.826 4.463A1 1 0 0 1 9.826 7H2.174a1 1 0 0 1-.759-1.651z"
                style="stroke: none"
                transform="translate(3.999 9.001)"
              />
              <path
                d="M6 1.537 2.174 6h7.652L6.002 1.537H6m0-1c.28 0 .56.116.76.349l3.825 4.463A1 1 0 0 1 9.825 7h-7.65a1 1 0 0 1-.76-1.65L5.241.885c.2-.233.48-.35.759-.35z"
                style="fill: #564ec1; stroke: none"
                transform="translate(3.999 9.001)"
              />
            </g>
          </svg>
          <span>Dashboard</span>
        </NuxtLink>
      </li>
      <li class="c-sidenav__item" >
        <NuxtLink to="/person" class="c-sidenav__link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="14.865"
            viewBox="0 0 24 14.865"
          >
            <path
              data-name="Union 3"
              d="M.011 14.865a7.563 7.563 0 0 1 4.635-7.533l3.014 4.059 3.014-4.059a7.726 7.726 0 0 1 3.469 2.879A6.6 6.6 0 0 1 15.97 9.04l2.215 2.983L20.4 9.04a5.6 5.6 0 0 1 3.59 5.825zM14.529 10.9a7.048 7.048 0 0 1 .779 3.233h7.9a4.766 4.766 0 0 0-2.566-4.136L18.185 13.3l-2.461-3.31a4.974 4.974 0 0 0-1.195.91zM.782 14.129h13.751a6.547 6.547 0 0 0-3.608-5.843l-3.265 4.39-3.26-4.39a6.546 6.546 0 0 0-3.618 5.843zm14.31-8.181a3.1 3.1 0 0 1 6.188 0 3.1 3.1 0 0 1-6.188 0zm.774 0a2.322 2.322 0 0 0 4.64 0 2.322 2.322 0 0 0-4.64 0zM3.791 3.718A3.8 3.8 0 0 1 7.66 0a3.8 3.8 0 0 1 3.869 3.718A3.8 3.8 0 0 1 7.66 7.437a3.8 3.8 0 0 1-3.869-3.719zm.774 0A3.041 3.041 0 0 0 7.66 6.692a3.041 3.041 0 0 0 3.095-2.974A3.041 3.041 0 0 0 7.66.745a3.038 3.038 0 0 0-3.095 2.973z"
              style="fill: #564ec1"
            />
          </svg>
          <span>Person</span>
        </NuxtLink>
      </li>
      <li class="c-sidenav__item" >
        <NuxtLink to="/product" class="c-sidenav__link">
          <img src="/img/products.svg" alt="product" />
          <span>Products</span>
        </NuxtLink>
      </li>
      <li class="c-sidenav__item c-dropdown" data-dropdown="container">
        <button class="c-sidenav__link c-dropdown__btn" data-dropdown="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22.001"
            viewBox="0 0 22 22.001"
          >
            <path
              data-name="Union 6"
              d="M8.655 21.744a.77.77 0 0 1-.6-.682l-.213-1.791a1.788 1.788 0 0 1-.426-.171l-1.45 1.109a.835.835 0 0 1-.938.043A9.149 9.149 0 0 1 3.24 18.76a9.125 9.125 0 0 1-1.492-1.791.836.836 0 0 1 .042-.938l1.11-1.45a1.519 1.519 0 0 1-.17-.384l-1.792-.255a.77.77 0 0 1-.682-.6A9.791 9.791 0 0 1 0 11a9.793 9.793 0 0 1 .256-2.345.77.77 0 0 1 .682-.6l1.791-.213a1.788 1.788 0 0 1 .17-.426L1.791 5.969a.836.836 0 0 1-.042-.938A9.125 9.125 0 0 1 3.24 3.24a9.151 9.151 0 0 1 1.791-1.492.835.835 0 0 1 .938.043L7.418 2.9a1.512 1.512 0 0 1 .382-.171L8.058.938a.77.77 0 0 1 .6-.682A9.8 9.8 0 0 1 11 0a9.789 9.789 0 0 1 2.345.256.77.77 0 0 1 .6.682l.255 1.791a1.512 1.512 0 0 1 .384.171l1.449-1.109a.835.835 0 0 1 .938-.043A9.127 9.127 0 0 1 18.76 3.24a9.147 9.147 0 0 1 1.492 1.791.836.836 0 0 1-.042.938l-1.11 1.45a1.5 1.5 0 0 1 .17.384l1.791.256a.771.771 0 0 1 .682.6A9.793 9.793 0 0 1 22 11a9.791 9.791 0 0 1-.256 2.345.771.771 0 0 1-.682.6l-1.791.256a1.5 1.5 0 0 1-.17.384l1.109 1.45a.836.836 0 0 1 .042.938 9.148 9.148 0 0 1-1.492 1.787 9.126 9.126 0 0 1-1.791 1.492.835.835 0 0 1-.938-.043L14.582 19.1a1.52 1.52 0 0 1-.384.171l-.256 1.791a.77.77 0 0 1-.6.682A9.789 9.789 0 0 1 11 22a9.8 9.8 0 0 1-2.345-.256zM7.674 17.4a7.19 7.19 0 0 0 1.151.469.836.836 0 0 1 .554.682l.213 1.705a11.659 11.659 0 0 0 2.814 0l.213-1.705a.836.836 0 0 1 .554-.682 5.445 5.445 0 0 0 1.151-.469.951.951 0 0 1 .9.085l1.364 1.066c.256-.213.6-.512 1.023-.938a13.972 13.972 0 0 0 .938-1.066l-1.069-1.326a.952.952 0 0 1-.085-.9 7.2 7.2 0 0 0 .469-1.151.836.836 0 0 1 .682-.554l1.706-.213a11.693 11.693 0 0 0 0-2.814l-1.706-.209a.78.78 0 0 1-.64-.554 5.585 5.585 0 0 0-.506-1.152.869.869 0 0 1 .085-.853l1.066-1.364a13.982 13.982 0 0 0-.938-1.066 12.5 12.5 0 0 0-1.023-.9l-1.369 1.028a.951.951 0 0 1-.9.085 7.178 7.178 0 0 0-1.151-.469.836.836 0 0 1-.554-.682l-.213-1.705a11.643 11.643 0 0 0-2.814 0L9.38 3.453a.837.837 0 0 1-.554.682 4.646 4.646 0 0 0-1.152.465.869.869 0 0 1-.853-.085L5.458 3.5a11.8 11.8 0 0 0-1.066.9 11.8 11.8 0 0 0-.9 1.066L4.52 6.822a.869.869 0 0 1 .085.853c-.128.256-.256.554-.256.554 0 .043-.128.3-.213.6a.836.836 0 0 1-.682.554l-1.706.213a11.626 11.626 0 0 0 0 2.814l1.706.213a.836.836 0 0 1 .682.554 4.663 4.663 0 0 0 .464 1.149.952.952 0 0 1-.085.9L3.5 16.585a12.5 12.5 0 0 0 .9 1.023 13.866 13.866 0 0 0 1.066.938L6.83 17.48a.9.9 0 0 1 .5-.16.885.885 0 0 1 .344.08zM5.756 11A5.244 5.244 0 1 1 11 16.244 5.24 5.24 0 0 1 5.756 11zm1.663 0A3.582 3.582 0 1 0 11 7.419 3.549 3.549 0 0 0 7.418 11z"
              style="fill: #564ec1"
            />
          </svg>
          <span>Settings</span>
        </button>
        <div class="c-dropdown__menu c-dropdown__menu--right"
          data-dropdown="menu">
          <NuxtLink to="/acl/role" class="c-dropdown__item">Roles</NuxtLink>
          <NuxtLink to="/acl/permission" class="c-dropdown__item">Permissions</NuxtLink>
          <NuxtLink to="/field/type" class="c-dropdown__item">Field types</NuxtLink>
          <NuxtLink to="/field/name" class="c-dropdown__item">Field names</NuxtLink>
          <NuxtLink to="/model" class="c-dropdown__item">Model</NuxtLink>
          <NuxtLink to="/license-mode" class="c-dropdown__item">License mode</NuxtLink>
          <div id="arrow" data-popper-arrow></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SidenavPartial",
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/partials/sidenav";
@import "~/assets/scss/components/logo";
</style>
