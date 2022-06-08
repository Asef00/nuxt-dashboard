<template>

</template>

<script>
export default {
  name: "index",
  created() {
    this.setTitle('Person')
    this.setBreadcrumb([
      {
        to: '/person',
        name: 'Person'
      }
    ])
  }
}
</script>

<style scoped>

</style>
