<template>
  <VCard :loader="loaderRequest" title="List License Modes">
    <template #header>
      <VBtn
        to="/license-mode/create"
        v-if="can('license-mode.store')"
        class="m-0 c-btn--small"
      >
        Create
      </VBtn>
    </template>
    <VTable
      @actionDetails="detailsItem($event)"
      @actionDelete="deleteItem($event)"
      :table="table"
    />
  </VCard>
</template>

<script>
export default {
  name: "index",
  permission: "license-mode.index",
  data() {
    let _this = this;
    return {
      showDetails: false,
      detailsItemId: 0,
      table: {
        columns: [
          { key: "id", label: "#" },
          { key: "name", label: "Name" },
          { key: "label", label: "Label" },
          { key: "created_at", label: "Created At", class: "u-text-center" },
          { key: "updated_at", label: "Updated At", class: "u-text-center" },
          {
            key: "action",
            label: '<img src="/img/gear.svg" alt="" />',
            class: "u-text-center",
          },
        ],
        items: [],
        map: {
          action(item) {
            return `<NuxtLink v-if="can('license-mode.update')" to="/license-mode/edit/${item.id}" class=" c-badge u-bg-info">Edit</NuxtLink>|
            <span v-if="can('license-mode.destroy')" v-on:click="action(${item.id},'Delete')" class="c-badge--hover c-badge u-bg-danger">Delete</span>
<!--            <span v-on:click="action(${item.id},'Details')" class="c-badge&#45;&#45;hover c-badge c-badge&#45;&#45;primary">Details</span>-->
`;
          },
          created_at(item) {
            return _this.dateFormat(item.created_at);
          },
          updated_at(item) {
            return _this.dateFormat(item.updated_at);
          },
          //REQUIRED
          rowClass() {},
        },
      },
    };
  },
  methods: {
    async list() {
      this.startLoading();
      this.$store.commit("licenseMode/RESET_ERROR");
      await this.$store.dispatch("licenseMode/list");
      let err = this.handleError(this.$store.state.licenseMode.error);
      if (!err) {
        this.table.items = this.$store.state.licenseMode.list;
      }
      this.stopLoading();
    },
    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.startLoading();
        this.$store.commit("licenseMode/RESET_ERROR");
        await this.$store.dispatch("licenseMode/delete", id);
        let err = this.handleError(this.$store.state.licenseMode.error);
        if (!err) {
          this.$toast.success("License mode successfully deleted.");
          await this.list();
        }
        this.stopLoading();
      }
    },
    detailsItem(id) {
      this.detailsItemId = id;
      this.showDetails = true;
    },
  },
  created() {
    this.setTitle("License Mode");
    this.setBreadcrumb([
      {
        to: "/license-mode",
        name: "License Mode",
      },
    ]);
    this.list();
  },
};
</script>

<style scoped>
</style>
