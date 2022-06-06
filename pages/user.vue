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
          { key: "created", label: "Created" },
          { key: "updated", label: "Updated" },
          { key: "status", label: "Status", sortable: true },
          {
            key: "edit",
            label: '<img src="/img/edit.svg" alt="" />',
          },
        ],
        items: [],
      },
    };
  },

  methods: {
    mls(arr) {
      let html = "";
      for (let item of arr) {
        html += `<span class="c-badge">${item}</span>`;
      }
      return html;
    },
    full_name(first, last) {
      return first + " " + last;
    },
    paid(amount) {
      return `
      $${amount.toLocaleString()}
      <img src="/img/increment.svg" alt="" />`;
    },
    status(is_active) {
      if (is_active) {
        return `<span class="c-status c-status--active">Active</span>`;
      } else {
        return `<span class="c-status c-status--inactive">Inactive</span>`;
      }
    },
    notification(count) {
      return `
        <a href="#" class="c-notification">
          <img src="/img/note.svg" alt="" />
          <span class="c-notification__badge">${count}</span>
        </a>`;
    },
    edit() {
      return `<a href="#" class="c-table__link">Edit</a>`;
    },
    getData() {
      for (let item of json) {
        this.table.items.push({
          id: item.id,
          full_name: this.full_name(item.name, item.family_name),
          username: item.username,
          status: this.status(item.enabled),
          create: item.created_at,
          update: item.updated_at,
          edit: this.edit(),
        });
      }
    },
  },

  mounted() {
    this.getData();
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