<template>
  <card-component title="Client List">
    <table>
      <thead>
        <th>#</th>

      </thead>
    </table>
  </card-component>
</template>

<script>
import CardComponent from "../components/CardComponent.vue";

export default {
  layout: "default",
  components: { CardComponent },
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
  data() {
    return {
      items: [
        { full_name: "Cameron Phillips", source: "Realtyna.com", email: "gregh@yahoo.ca" },
        { full_name: "Wade Joseph", source: "Realtyna.com", email: "stewwy@optonline.net" },
        { full_name: "Jordan Aguilar", source: "Realtyna.com", email: "vsprintf@sbcglobal.net" },
        { full_name: "Holly Gonzales", source: "Realtyna.com", email: "bader@verizon.net" },
        { full_name: "Fredrick Evans", source: "Realtyna.com", email: "joglo@gmail.com" },
      ],
    };
  },
};
</script>



