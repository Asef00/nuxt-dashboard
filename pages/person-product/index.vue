<template>
  <VCard title="List Person Products">
    
  </VCard>
</template>

<script>
export default {
  name: "index",
  created() {
    this.setTitle('Person Product')
    this.setBreadcrumb([
      {
        to: '/person-product',
        name: 'Person Product'
      }
    ])
  }
}
</script>

<style scoped>

</style>
