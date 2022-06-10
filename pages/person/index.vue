<template>
  <VCard title="List Person">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/person/create">Create</NuxtLink>
      </VBtn>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/person/create-cognito">Add form Cognito</NuxtLink>
      </VBtn>
    </template>
  </VCard>
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
