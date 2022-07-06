<template>
  <VCard :loader="loaderRequest" title="List Field Names">
    <template #header>
      <VBtn
        to="/field/name/create"
        v-if="can('field-name.store')"
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
      title="Field name details"
    >
      <Details :id="detailsItemId"/>
    </VModal>
  </VCard>
</template>

<script>
import Details from "@/components/page/field/name/Details";

export default {
  name: "index",
  permission: "field-name.index",
  components: {Details},
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
            class: "u-table--center",
          },
        ],
        items: [],
        map: {
          action(item) {
            return `<NuxtLink v-if="can('field-name.update')" to="/field/name/edit/${item.id}" class="c-badge u-bg-info">Edit</NuxtLink>|
            <span v-if="can('field-name.destroy')" v-on:click="action(${item.id},'Delete')" class="c-badge--hover c-badge u-bg-danger">Delete</span>
            <span v-if="can('field-name.show')" v-on:click="action(${item.id},'Details')" class="c-badge--hover c-badge u-bg-primary">Details</span>
`;
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
      this.$store.commit("fieldName/RESET_ERROR");
      await this.$store.dispatch("fieldName/list");
      let err = this.handleError(this.$store.state.fieldName.error);
      if (!err) {
        this.table.items = this.$store.state.fieldName.list;
      }
      this.stopLoading();
    },
    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.startLoading();
        this.$store.commit("fieldName/RESET_ERROR");
        await this.$store.dispatch("fieldName/delete", id);
        let err = this.handleError(this.$store.state.fieldName.error);
        if (!err) {
          this.$toast.success("Field name successfully deleted.");
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
    this.setTitle("Field Name");
    this.setBreadcrumb([
      {
        to: "/field/name",
        name: "Field Name",
      },
    ]);
    this.resetAxiosParams()
    this.list();
  },
};
</script>

<style scoped>
</style>
