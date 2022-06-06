<template>
  <VCard title="Client List" class="c-card--fluid">
    <VTable :table="table" />
  </VCard>
</template>

<script>
import json from "~/static/json/sample.json";

export default {
  layout: "default",

  data() {
    return {
      table: {
        columns: [
          { key: "id", label: "#" },
          { key: "full_name", label: "Full Name", sortable: "true" },
          { key: "source", label: "Source", sortable: true },
          { key: "mls", label: "MLS", sortable: true },
          { key: "paid", label: "Paid so far", sortable: true },
          { key: "email", label: "Email", sortable: true },
          { key: "status", label: "Status", sortable: true },
          { key: "notification", label: '<img src="/img/note.svg" alt="">' },
          {
            key: "edit",
            label: '<img src="/img/edit.svg" alt="" />',
            // value: '<a href="#" class="c-table__link">Edit</a>',
          },
        ],
        items: [],
      },
      sample: json,
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
      if (count) return `
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
          source: item.source,
          mls: this.mls(item.mls),
          paid: this.paid(item.paid),
          email: item.email,
          status: this.status(item.is_active),
          notification: this.notification(item.notification),
          edit: this.edit(),
        });
      }
      return;
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