<template>
  <VCard>
    <div class="d-flex flex-column u-text-center">
      <img class="m-auto" src="/img/errorPage.png" width="500" height="243" alt="error" />
      <h2>Oops. The page you were looking for doesn’t exist.</h2>
      <p>You may have mistyped the address or the page may have been moved.</p>
      <NuxtLink to="/" class="u-text-link">
        TAKE ME BACK TO THE HOME PAGE
      </NuxtLink>
    </div>
  </VCard>
</template>
<script>
export default {
  props: ["error"],
  layout: "default", // you can set a custom layout for the error page
};
</script>