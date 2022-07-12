<template>
  <VCard :loader="loaderRequest" title="Defined Permissions">
    <template #header>
      <VBtn
        to="/acl/permission/create"
        v-if="can('permission.store')"
        size="sm"
        class="m-0"
      >
        Define New Permission
      </VBtn>
    </template>
    <VTable
      @actionDetails="detailsItem($event)"
      @changePage="changePage($event)"
      @changePerPage="changePerPage($event)"
      @actionDelete="deleteItem($event)"
      :table="table"
    />
    <VModal
      :showModal="showDetails"
      @close="showDetails = false"
      title="Permission details"
    >
      <Details :id="detailsItemId" />
    </VModal>
  </VCard>
</template>

<script>
import Details from "@/components/page/acl/permission/Details";

export default {
  name: "index",
  permission: "permission.index",
  components: {
    Details,
  },
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
          action(item) {
            return `<NuxtLink v-if="can('permission.update')" to="/acl/permission/edit/${item.id}" class="c-badge u-bg-info">Edit</NuxtLink> |
            <span v-if="can('permission.destroy')" v-on:click="action(${item.id},'Delete')" class="c-badge--hover c-badge u-bg-danger">Delete</span> |
            <span v-if="can('permission.show')" v-on:click="action(${item.id},'Details')" class="c-badge--hover c-badge u-bg-primary">Details</span>
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
      this.$store.commit("permission/RESET_ERROR");
      await this.$store.dispatch("permission/list");
      let err = this.handleError(this.$store.state.permission.error);
      if (!err) {
        this.table.items = this.$store.state.permission.list;
      }
      this.stopLoading();
    },
    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.startLoading();
        this.$store.commit("permission/RESET_ERROR");
        await this.$store.dispatch("permission/delete", id);
        let err = this.handleError(this.$store.state.permission.error);
        if (!err) {
          this.$toast.success("Permission successfully deleted.");
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
        to: "/acl/permission",
        name: "Definitions / Permission",
      },
    ]);
    this.resetAxiosParams();
    this.list();
  },
};
</script>

<style scoped>
</style>
