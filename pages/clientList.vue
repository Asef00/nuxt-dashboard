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
        { label: "#" },
        { label: "Full Name", sortable: true },
        { label: "Source", sortable: true },
        { label: "MLS", sortable: true },
        { label: "Paid so far", sortable: true },
        { label: "Email", sortable: true },
        { label: "Status", sortable: true },
        { label: '<img src="/img/note.svg" alt="">' },
        { label: '<img src="/img/edit.svg" alt="" />' },
      ],
      items: [
        {
          id: 1,
          full_name: "Chandler Bing",
          source: "Realtyna.com",
          MLS: ["Treb", "MFR MLS", "XMLS"],
          paid_so_far: "$8,400",
          email: "Chandler@gmail.com",
          status: "Inactive",
          note: null,
          _verified: true,
          _increment: false,
        },
        {
          id: 2,
          full_name: "Ross Geller",
          source: "Realtyna.com",
          MLS: ["MFR MLS"],
          paid_so_far: "$3,200",
          email: "Ross@gmail.com",
          status: "active",
          note: null,
          _verified: false,
          _increment: true,
        },
        {
          id: 3,
          full_name: "Rachel Green",
          source: "Houzes",
          MLS: ["Treb", "MFR MLS"],
          paid_so_far: "$1,400",
          email: "Rachel@gmail.com",
          status: "active",
          note: null,
          _verified: false,
          _increment: true,
        },
        {
          id: 4,
          full_name: "Monica Geller",
          source: "Realtyna.com",
          MLS: ["XMLS"],
          paid_so_far: "$12,400",
          email: "Monica@gmail.com",
          status: "Inactive",
          note: 2,
          _verified: true,
          _increment: false,
        },
        {
          id: 5,
          full_name: "Joey Tribbiani",
          source: "Realtyna.com",
          MLS: ["ITech MLS"],
          paid_so_far: "$9,450",
          email: "Joey@gmail.com",
          status: "active",
          note: null,
          _verified: true,
          _increment: false,
        },
        {
          id: 6,
          full_name: "Phoebe Buffay",
          source: "Realtyna.com",
          MLS: [],
          paid_so_far: "$6,100",
          email: "Phoebe@gmail.com",
          status: "Inactive",
          note: null,
          _verified: false,
          _increment: true,
        },
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