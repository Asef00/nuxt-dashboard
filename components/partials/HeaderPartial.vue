<template>
  <div class="c-header">
    <div class="c-header__upper">
      <button class="c-header__menu js-menu-open">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="14"
          viewBox="0 0 18 14"
        >
          <path data-name="Rectangle 2" style="fill: #fff" d="M0 0h18v2H0z" />
          <path
            data-name="Rectangle 3"
            transform="translate(0 8)"
            style="fill: #fff"
            d="M0 0h18v2H0z"
          />
          <path
            data-name="Rectangle 4"
            transform="translate(0 4)"
            style="fill: #fff"
            d="M0 0h14v2H0z"
          />
          <path
            data-name="Rectangle 5"
            transform="translate(0 12)"
            style="fill: #fff"
            d="M0 0h14v2H0z"
          />
        </svg>
      </button>

      <div class="c-navbar">
        <input type="text" class="c-navbar__search" placeholder="Search ..." />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16.084"
          height="20"
          viewBox="0 0 16.084 20"
        >
          <path
            data-name="Union 1"
            d="M-9339.476 448.508v-.5h-4.779a.685.685 0 0 1-.689-.68.684.684 0 0 1 .689-.68h.6v-6.3a6.593 6.593 0 0 1 4.791-6.3 2.034 2.034 0 0 1-.242-.966 2.1 2.1 0 0 1 2.114-2.084 2.1 2.1 0 0 1 2.113 2.084 2.055 2.055 0 0 1-.24.966 6.6 6.6 0 0 1 4.79 6.3v6.3h.781a.684.684 0 0 1 .689.68.684.684 0 0 1-.689.68h-4.871v.5a2.513 2.513 0 0 1-2.527 2.492 2.513 2.513 0 0 1-2.53-2.492zm1.379 0a1.142 1.142 0 0 0 1.148 1.132 1.141 1.141 0 0 0 1.148-1.132v-.5h-2.3zm6.388-1.857v-6.3a5.249 5.249 0 0 0-5.021-5.2 2.158 2.158 0 0 1-.265.016 2.13 2.13 0 0 1-.264-.016 5.25 5.25 0 0 0-5.021 5.2v6.3zm-5.115-12.863a.74.74 0 0 0 .565-.7.74.74 0 0 0-.735-.725.74.74 0 0 0-.735.725.739.739 0 0 0 .564.7h.171z"
            transform="translate(9344.944 -431)"
            style="fill: #fff"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="15.19"
          viewBox="0 0 20 15.19"
        >
          <path
            data-name="note"
            d="M17.626 45.945H2.374A2.331 2.331 0 0 0 0 48.225v10.631a2.331 2.331 0 0 0 2.374 2.28h15.252A2.331 2.331 0 0 0 20 58.856V48.225a2.331 2.331 0 0 0-2.374-2.28zm0 13.178H2.374c-.192 0-.361-.125-.361-.267V49.63l6.9 5.824a.786.786 0 0 0 .506.185h1.165a.786.786 0 0 0 .506-.185l6.9-5.824v9.226c-.003.144-.171.267-.364.267zM10 53.641l-6.709-5.683h13.418z"
            transform="translate(0 -45.945)"
            style="fill: #fff"
          />
        </svg>

        <div class="c-dropdown" data-dropdown>
          <button class="c-navbar__avatar c-dropdown__btn" data-dropdown-btn>
            <img
              src="~/assets/images/top.jpg"
              width="34"
              height="34"
              alt="avatar"
            />
          </button>
          <div class="c-dropdown__menu c-dropdown__menu--bl">
            <header class="c-dropdown__header">Welcome!</header>

            <a href="#" class="c-dropdown__item">My Profile</a>
            <a href="#" class="c-dropdown__item">Settings</a>
            <a href="#" class="c-dropdown__item">Activity</a>
            <a href="#" class="c-dropdown__item">Support</a>
            <span class="c-dropdown__divider"></span>
            <a href="#" class="c-dropdown__item">Logout</a>
          </div>
        </div>
      </div>
    </div>
    <div class="c-header__lower">
      <h1 class="c-header__title">Add Client</h1>
      <ul class="c-breadcrumb">
        <li class="c-breadcrumb__item">
          <a href="#" class="c-breadcrumb__link">Home </a>
        </li>
        <li class="c-breadcrumb__item">
          <a href="#" class="c-breadcrumb__link">/ Clients </a>
        </li>
        <li class="c-breadcrumb__item">
          <a href="#" class="c-breadcrumb__link">/ Add Clients </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderPartial",
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/partials/header";
@import "~/assets/scss/components/navbar";
@import "~/assets/scss/components/breadcrumb";
@import "~/assets/scss/components/dropdown";
</style>