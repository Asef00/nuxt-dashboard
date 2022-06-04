<template>
  <VCard title="Client List" class="c-card--fluid">
    <VTable columns='columns' />
  </VCard>
</template>

<script>
export default {
  layout: "default",

  data() {
    return {
      columns: [
        {
          label: "Full Name",
          key_value: function () {
            return;
          },
        },
        {
          label: "Edit",
          key_value: '<a href="#" class="c-table__link">Edit</a>',
        },
      ],
    };
  },

  created() {
    this.setTitle("User");
    this.setBreadcrumb([
      {
        to: "dashboard",
        name: "Dashboard",
      },
      {
        to: "user",
        name: "User",
      },
    ]);
  },
};
</script>

<style>
</style>