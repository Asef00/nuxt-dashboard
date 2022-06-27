<template>
  <VCard :loader="loaderRequest" title="List Models">
    <template #header>
      <VBtn
        to="/model/create"
        v-if="can('model.store')"
        type="button"
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
    <VModal
      :showModal="showDetails"
      @close="showDetails = false"
      title="Model details"
    >
      <Details :id="detailsItemId" />
    </VModal>
  </VCard>
</template>

<script>
import Details from "@/components/page/model/Details";

export default {
  name: "index",
  permission: "model.index",
  components: { Details },
  data() {
    let _this = this;
    return {
      showDetails: false,
      detailsItemId: 0,
      table: {
        columns: [
          { key: "id", label: "#" },
          { key: "name", label: "Name" },
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
            return `<NuxtLink v-if="can('model.update')" to="/model/edit/${item.id}" class="c-badge u-bg-info">Edit</NuxtLink> |
            <span v-if="can('model.destroy')" v-on:click="action(${item.id},'Delete')" class="c-badge--hover c-badge u-bg-danger">Delete</span> |
            <span v-if="can('model.show')" v-on:click="action(${item.id},'Details')" class="c-badge--hover c-badge u-bg-primary">Details</span>`;
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
      this.$store.commit("model/RESET_ERROR");
      await this.$store.dispatch("model/list");
      let err = this.handleError(this.$store.state.model.error);
      if (!err) {
        this.table.items = this.$store.state.model.list;
      }
      this.stopLoading();
    },
    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.startLoading();
        this.$store.commit("model/RESET_ERROR");
        await this.$store.dispatch("model/delete", id);
        let err = this.handleError(this.$store.state.model.error);
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
  },
  created() {
    this.setTitle("Model");
    this.setBreadcrumb([
      {
        to: "/model",
        name: "Model",
      },
    ]);
    this.list();
  },
};
</script>

<style scoped>
</style>
