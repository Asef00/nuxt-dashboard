<template>
  <VCard title="Client List" class="c-card--fluid">
    <VTable :table="table" />
  </VCard>
</template>

<script>
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
        items: [
          {
            id: 1,
            full_name: this.full_name("Chandler", "Bing"),
            source: "Realtyna.com",
            mls: this.mls([]),
            paid: this.paid(8400),
            email: "Chandler@gmail.com",
            status: this.status(false),
            notification: null,
            edit: this.edit(),
          },
          {
            id: 2,
            full_name: this.full_name("Ross", "Geller"),
            source: "Realtyna.com",
            mls: this.mls(["MFR MLS"]),
            paid: this.paid(3200),
            email: "Ross@gmail.com",
            status: this.status(true),
            notification: null,
            edit: this.edit(),
          },
          {
            id: 3,
            full_name: this.full_name("Rachel", "Green"),
            source: "Houzes",
            mls: this.mls(["Treb", "MFR MLS"]),
            paid: this.paid(1400),
            email: "Rachel@gmail.com",
            status: this.status(true),
            notification: null,
            edit: this.edit(),
          },
          {
            id: 4,
            full_name: this.full_name("Monica", "Geller"),
            source: "Realtyna.com",
            mls: this.mls(["XMLS"]),
            paid: this.paid(12400),
            email: "Monica@gmail.com",
            status: this.status(false),
            notification: this.notification(2),
            edit: this.edit(),
            rowClass: "has-note",
          },
          {
            id: 5,
            full_name: this.full_name("Joey", "Tribbiani"),
            source: "Realtyna.com",
            mls: this.mls(["ITech MLS"]),
            paid: this.paid(9500),
            email: "Joey@gmail.com",
            status: this.status(true),
            notification: null,
            edit: this.edit(),
          },
          {
            id: 6,
            full_name: this.full_name("Phoebe", "Buffay"),
            source: "Realtyna.com",
            mls: this.mls([]),
            paid: this.paid(6400),
            email: "Phoebe@gmail.com",
            status: this.status(false),
            notification: null,
            edit: this.edit(),
            edit: this.edit(),
          },
        ],
      },
      sample: [
        {
          id: 1,
          name: "Chandler",
          family_name: "Bing",
          source: "Realtyna.com",
          mls: ["XMLS", "Alpha", "MLS PRO"],
          paid: 8400,
          email: "Chandler@gmail.com",
          is_active: false,
          notification: null,
        },
      ],
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