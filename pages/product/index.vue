<template>

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
