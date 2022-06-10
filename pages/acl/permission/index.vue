<template>
  <VCard title="List Permissions">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/acl/permission/create">Create</NuxtLink>
      </VBtn>
    </template>
  </VCard>
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
