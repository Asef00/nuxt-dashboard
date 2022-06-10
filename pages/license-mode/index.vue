<template>
  <VCard title="List License Modes">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/license-mode/create">Create</NuxtLink>
      </VBtn>
    </template>
  </VCard>
</template>

<script>
export default {
  name: "index",
  created() {
    this.setTitle('License Mode')
    this.setBreadcrumb([
      {
        to: '/license-mode',
        name: 'License Mode'
      }
    ])
  }
}
</script>

<style scoped>

</style>
