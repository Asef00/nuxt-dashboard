<template>
  <VCard title="List Field Types">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/field/type/create">Create</NuxtLink>
      </VBtn>
    </template>
  </VCard>
</template>

<script>
export default {
  name: "index",
  created() {
    this.setTitle('Field Type')
    this.setBreadcrumb([
      {
        to: '/field/type',
        name: 'Field Type'
      }
    ])
  }
}
</script>

<style scoped>

</style>
