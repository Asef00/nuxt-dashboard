<template>
  <VCard title="List Roles">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/acl/role/create">Create</NuxtLink>
      </VBtn>
    </template>
  </VCard>
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
