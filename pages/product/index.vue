<template>
  <VCard title="List Products">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/product/create">Create</NuxtLink>
      </VBtn>
    </template>
  </VCard>
</template>

<script>
export default {
  name: "index",
  created() {
    this.setTitle('Product')
    this.setBreadcrumb([
      {
        to: "/product",
        name: "Product"
      }
    ])
  }
}
</script>

<style scoped>

</style>
