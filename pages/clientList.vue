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
          { key: "full_name", label: "Full Name" },
          { key: "source", label: "Source" },
          { key: "mls", label: "MLS" },
          { key: "paid", label: "Paid so far" },
          { key: "email", label: "Email" },
          { key: "status", label: "Status" },
          {
            key: "notification",
            label: '<img src="/img/note.svg" alt="">',
            class: "u-text-center",
          },
          {
            key: "edit",
            label: '<img src="/img/edit.svg" alt="" />',
            class: "u-text-center",
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
            if (item.is_verified)
              return (
                item.name +
                " " +
                item.family_name +
                ` <img src="/img/verify.svg" alt="" />`
              );
            else return item.name + " " + item.family_name;
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
                  <img src="/img/note.svg" alt="" width="12" height="14" />
                  <span class="c-notification__badge">${item.notification}</span>
                </a>`;
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