<template>
  <VCard title="List Models">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/model/create">Create</NuxtLink>
      </VBtn>
    </template>
  </VCard>
</template>

<script>
export default {
  name: "index",
  created() {
    this.setTitle('Model')
    this.setBreadcrumb([
      {
        to: "/model",
        name: "Model"
      }
    ])
  }
}
</script>

<style scoped>

</style>
