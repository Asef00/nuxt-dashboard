<template>
  <VCard title="Client List" class="c-card--fluid">
    <VTable :columns="columns" />
  </VCard>
</template>

<script>
export default {
  layout: "default",

  data() {
    return {
      columns: [
        { label: "#", sortable: true },
        { label: "Full Name", sortable: true },
        { label: "Source", sortable: true },
        { label: "MLS", sortable: true },
        { label: "Paid so far", sortable: true },
        { label: "Email", sortable: true },
        { label: "Status", sortable: true },
        { label: '<img src="/img/note.svg" alt="">' },
        { label: '<img src="/img/edit.svg" alt="" />' },
      ],
    };
  },

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