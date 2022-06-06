<template>

</template>

<script>
export default {
  name: "index",
  created() {
    this.setTitle('Field Name')
    this.setBreadcrumb([
      {
        to: '/field/name',
        name: 'Field Name'
      }
    ])
  }
}
</script>

<style scoped>

</style>
