<template>
  <VCard :loader="loaderRequest" title="Defined Product Modes">
    <template #header>
      <VBtn
        to="/product/mode/create"
        v-if="can('product.mode.store')"
        size="sm"
        class="m-0"
      >
        Define New Product Mode
      </VBtn>
    </template>
    <VTable
      @actionDetails="detailsItem($event)"
      @actionDelete="deleteItem($event)"
      @changePage="changePage($event)"
      @changePerPage="changePerPage($event)"
      :table="table"
    />
  </VCard>
</template>

<script>
export default {
  name: "index",
  permission: "product.mode.index",
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
          { key: "type", label: "Type" },
          { key: "created_at", label: "Created At" },
          { key: "updated_at", label: "Updated At" },
          {
            key: "action",
            label: '<img src="/img/gear.svg" alt="" />',
            class: "u-table--center",
          },
        ],
        items: [],
        map: {
          type(item){
            return `<span class="c-badge u-bg-primary">${item.type} mode</span>`
          },
          action(item) {
            return `<NuxtLink v-if="can('product.mode.update')" to="/product/mode/edit/${item.id}" class=" c-badge u-bg-info">Edit</NuxtLink>|
            <span v-if="can('product.mode.destroy')" v-on:click="action(${item.id},'Delete')" class="c-badge--hover c-badge u-bg-danger">Delete</span>
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
      this.$store.commit("product/mode/RESET_ERROR");
      await this.$store.dispatch("product/mode/list");
      let err = this.handleError(this.$store.state.product.mode.error);
      if (!err) {
        this.table.items = this.$store.state.product.mode.list;
      }
      this.stopLoading();
    },
    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.startLoading();
        this.$store.commit("product/mode/RESET_ERROR");
        await this.$store.dispatch("product/mode/delete", id);
        let err = this.handleError(this.$store.state.product.mode.error);
        if (!err) {
          this.$toast.success("Product mode successfully deleted.");
          await this.list();
        }
        this.stopLoading();
      }
    },
    detailsItem(id) {
      this.detailsItemId = id;
      this.showDetails = true;
    },
    changePage(val) {
      this.setPaginate(val);
      this.list();
    },
    changePerPage(val) {
      this.setLimit(val);
      this.setPaginate(1);
      this.list();
    },
  },
  created() {
    this.setTitle("Definitions");
    this.setBreadcrumb([
      {
        to: "/product/mode",
        name: "Definitions / Product Mode",
      },
    ]);
    this.resetAxiosParams();
    this.list();
  },
};
</script>

<style scoped>
</style>
