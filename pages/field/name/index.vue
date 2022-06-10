<template>
  <VCard title="List Field Names">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/field/name/create">Create</NuxtLink>
      </VBtn>
    </template>
  </VCard>
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
