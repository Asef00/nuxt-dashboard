<template>
  <VCard title="Client List" class="c-card--fluid">
    <VTable />
  </VCard>
</template>

<script>
export default {
  layout: "default",

  created() {
    this.setTitle("Clients");
    this.setBreadcrumb([
      {
        to: "dashboard",
        name: "Dashboard",
      },
      {
        to: "clientList",
        name: "Clients",
      },
    ]);
  },
};
</script>