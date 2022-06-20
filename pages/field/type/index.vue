<template>
  <VCard :loader="loaderRequest" title="List Field Types">
    <template #header>
      <VBtn v-if="can('field-type.store')" type="button" class="m-0 c-btn--small">
        <NuxtLink to="/field/type/create">Create</NuxtLink>
      </VBtn>
    </template>
    <VTable @actionDetails="detailsItem($event)" @actionDelete="deleteItem($event)" :table="table"/>
  </VCard>
</template>

<script>
export default {
  name: "index",
  permission: "field-type.index",
  data() {
    let _this = this;
    return {
      showDetails: false,
      detailsItemId: 0,
      table: {
        columns: [
          {key: "id", label: "#"},
          {key: "type", label: "Type",},
          {key: "label", label: "Label",},
          {key: "created_at", label: "Created At", class: "u-text-center"},
          {key: "updated_at", label: "Updated At", class: "u-text-center"},
          {key: "action", label: '<img src="/img/gear.svg" alt="" />', class: "u-text-center",},
        ],
        items: [],
        map: {
          action(item) {
            return `<NuxtLink v-if="can('field-type.update')"  to="/field/type/edit/${item.id}" class=" c-badge u-bg-info">Edit</NuxtLink>|
            <span  v-if="can('field-type.destroy')" v-on:click="action(${item.id},'Delete')" class="c-badge--hover c-badge u-bg-danger">Delete</span>
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
          rowClass() {
          },
        },
      },
    }
  },
  methods: {
    async list() {
      this.startLoading()
      this.$store.commit('fieldType/RESET_ERROR')
      await this.$store.dispatch("fieldType/list");
      let err = this.handleError(this.$store.state.fieldType.error);
      if (!err) {
        this.table.items = this.$store.state.fieldType.list;
      }
      this.stopLoading()
    },
    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.startLoading()
        this.$store.commit('fieldType/RESET_ERROR')
        await this.$store.dispatch("fieldType/delete", id);
        let err = this.handleError(this.$store.state.fieldType.error);
        if (!err) {
          this.$toast.success('Field type successfully deleted.');
          await this.list();
        }
        this.stopLoading()
      }
    },
    detailsItem(id) {
      this.detailsItemId = id;
      this.showDetails = true;
    }
  },
  created() {
    this.setTitle('Field Type')
    this.setBreadcrumb([
      {
        to: '/field/type',
        name: 'Field Type'
      }
    ])
    this.list()
  }
}
</script>

<style scoped>

</style>
