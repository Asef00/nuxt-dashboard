<template>
  <VCard title="Client List" class="c-card--fluid">
    <VTable
      :table="table"
      @changePage="page($event)"
      @changePerPage="perPage($event)"
    />
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
          { key: "full_name", label: "Full Name" },
          { key: "username", label: "Username" },
          { key: "created_at", label: "Created", class: "u-text-center" },
          { key: "updated_at", label: "Updated", class: "u-text-center" },
          { key: "enabled", label: "Status" },
          {
            key: "edit",
            label: '<img src="/img/edit.svg" alt="" />',
            class: "u-text-center",
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
          //REQUIRED
          rowClass(item) {
            if (item.notification) {
              return "has-note";
            }
          },
        },
      },
    };
  },

  methods: {
    page(target) {
      console.log(target);
    },
    perPage(prefered) {
      console.log("prefered per page: ", prefered);
    },
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
