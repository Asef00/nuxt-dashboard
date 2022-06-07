<template>
  <VCard title="Client List" class="c-card--fluid">
    <VTable :table="table" />
  </VCard>
</template>

<script>
import json from "~/static/json/user.json";

export default {
  layout: "default",
  data() {
    return {
      table: {
        columns: [
          { key: "id", label: "#" },
          { key: "full_name", label: "Full Name", sortable: "true" },
          { key: "username", label: "Username", sortable: true },
          { key: "created_at", label: "Created" },
          { key: "updated_at", label: "Updated" },
          { key: "enabled", label: "Status", sortable: true },
          {
            key: "edit",
            label: '<img src="/img/edit.svg" alt="" />',
          },
        ],
        items: json,
        map: {
          full_name(item) {
            return item.name + " " + item.family_name;
          },
          enabled(item) {
            if (item.enabled) {
              return `<span class="c-status c-status--active">Active</span>`;
            } else {
              return `<span class="c-status c-status--inactive">Inactive</span>`;
            }
          },
          edit() {
            return `<NuxtLink to="/" class="c-table__link">Edit</NuxtLink>`;
          },
        },
      },
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
