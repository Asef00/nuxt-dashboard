<template>

</template>

<script>
export default {
  name: "index",
  created() {
    this.setTitle('Permission')
    this.setBreadcrumb([
      {
        to: '/acl/permission',
        name: 'Permission'
      }
    ])
  }
}
</script>

<style scoped>

</style>
