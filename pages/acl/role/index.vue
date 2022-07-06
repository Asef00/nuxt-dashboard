<template>
  <VCard :loader="loaderRequest" title="List Roles">
    <template #header>
      <VBtn
        to="/acl/role/create"
        v-if="can('role.store')"
        class="m-0 c-btn--small"
      >
        Create
      </VBtn>
    </template>
    <VTable
      @actionDetails="detailsItem($event)"
      @actionDelete="deleteItem($event)"
      @changePage="changePage($event)"
      @changePerPage="changePerPage($event)"
      :table="table"
    />
    <VModal
      :showModal="showDetails"
      @close="showDetails = false"
      title="Role details"
    >
      <Details :id="detailsItemId"/>
    </VModal>
  </VCard>
</template>

<script>
import Details from "@/components/page/acl/role/Details";

export default {
  name: "index",
  permission: "role.index",
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
          {key: "id", label: "#"},
          {key: "name", label: "Name"},
          {key: "label", label: "Label"},
          {key: "created_at", label: "Created At"},
          {key: "updated_at", label: "Updated At"},
          {
            key: "action",
            label: '<img src="/img/gear.svg" alt="" />',
            class: "u-text-center",
          },
        ],
        items: [],
        map: {
          action(item) {
            return `<NuxtLink v-if="can('role.update')" to="/acl/role/edit/${item.id}" class="c-badge u-bg-info">Edit</NuxtLink>|
            <span v-if="can('role.destroy')" v-on:click="action(${item.id},'Delete')" class="c-badge--hover c-badge u-bg-danger">Delete</span>|
            <span v-if="can('role.show')" v-on:click="action(${item.id},'Details')" class="c-badge--hover c-badge u-bg-primary">Details</span>`;
          },
          created_at(item) {
            return _this.dateFormat(item.created_at);
          },
          updated_at(item) {
            return _this.dateFormat(item.updated_at);
          },
          //REQUIRED
          rowClass() {
          },
        },
      },
    };
  },
  methods: {
    async list() {
      this.startLoading();
      this.$store.commit("role/RESET_ERROR");
      await this.$store.dispatch("role/list");
      let err = this.handleError(this.$store.state.role.error);
      if (!err) {
        this.table.items = this.$store.state.role.list;
      }
      this.stopLoading();
    },
    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.startLoading();
        this.$store.commit("role/RESET_ERROR");
        await this.$store.dispatch("role/delete", id);
        let err = this.handleError(this.$store.state.role.error);
        if (!err) {
          this.$toast.success("Model successfully deleted.");
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
    this.setTitle("Role");
    this.setBreadcrumb([
      {
        to: "/acl/role",
        name: "Role",
      },
    ]);
    this.resetAxiosParams();
    this.list();
  },
};
</script>

<style scoped>
</style>
