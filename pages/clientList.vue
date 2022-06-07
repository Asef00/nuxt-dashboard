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
          },
        ],
        items: json,
        map: {
          mls(item) {
            let html = "";
            for (let badge of item.mls) {
              html += `<span class="c-badge">${badge}</span>`;
            }
            return html;
          },
          full_name(item) {
            return item.name + " " + item.family_name;
          },
          paid(item) {
            return `
              $${item.paid.toLocaleString()}
              <img src="/img/increment.svg" alt="" />`;
          },
          status(item) {
            if (item.is_active) {
              return `<span class="c-status c-status--active">Active</span>`;
            } else {
              return `<span class="c-status c-status--inactive">Inactive</span>`;
            }
          },
          notification(item) {
            if (item.notification)
              return `
                <a href="#" class="c-notification">
                  <img src="/img/note.svg" alt="" />
                  <span class="c-notification__badge">${item.notification}</span>
                </a>`;
          },
          edit() {
            return `<a href="#" class="c-table__link">Edit</a>`;
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