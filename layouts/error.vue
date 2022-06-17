<template>
  <VCard>
    <h1 v-if="error.statusCode === 404" class="u-text-secondary u-text-center">404</h1>
    <p v-if="error.statusCode === 404" class="u-text-center">
      Page not found
    </p>
    <h3 v-else class="u-text-center">An error occurred</h3>
  </VCard>
</template>
<script>
export default {
  props: ["error"],
  layout: "default", // you can set a custom layout for the error page
};
</script>