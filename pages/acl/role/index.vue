<template>

</template>

<script>
export default {
  name: "index",
  created() {
    this.setTitle('Role')
    this.setBreadcrumb([
      {
        to: '/acl/role',
        name: 'Role'
      }
    ])
  }
}
</script>

<style scoped>

</style>
