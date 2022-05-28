<template>

</template>

<script>
export default {
  name: "index",
  created() {
    this.setTitle('Model')
    this.setBreadcrumb([
      {
        to: "/dashboard",
        name: "Dashboard"
      },
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
