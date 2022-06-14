<template>
  <VCard title="List Products">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/product/create">Create</NuxtLink>
      </VBtn>
    </template>
    <VTable @actionDetails="detailsItem($event)" @actionDelete="deleteItem($event)" :table="table"/>
    <VModal :showModal="showDetails" @close="showDetails =false" title="Product details">
      <Details :id="detailsItemId"/>
    </VModal>
  </VCard>
</template>

<script>
import Details from "@/components/page/product/Details";
export default {
  name: "index",
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
          {key: "title", label: "Title",},
          {key: "slug", label: "Slug",},
          {key: "created_at", label: "Created At", class: "u-text-center"},
          {key: "updated_at", label: "Updated At", class: "u-text-center"},
          {key: "action", label: '<img src="/img/gear.svg" alt="" />', class: "u-text-center",},
        ],
        items: [],
        map: {
          action(item) {
            return `<NuxtLink to="/product/edit/${item.id}" class="c-table__link c-badge u-bg-info">Edit</NuxtLink>|
            <span v-on:click="action(${item.id},'Delete')" class="c-badge--hover c-badge u-bg-danger">Delete</span>|
            <span v-on:click="action(${item.id},'Details')" class="c-badge--hover c-badge u-bg-primary">Details</span>`;
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
      this.$store.commit('product/RESET_ERROR')
      await this.$store.dispatch("product/list");
      let err = this.handleError(this.$store.state.product.error);
      if (!err) {
        this.table.items = this.$store.state.product.list;
      }
      this.stopLoading()
    },
    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.startLoading()
        this.$store.commit('product/RESET_ERROR')
        await this.$store.dispatch("product/delete", id);
        let err = this.handleError(this.$store.state.product.error);
        if (!err) {
          this.$toast.success('Product successfully deleted.');
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
    this.setTitle('Product')
    this.setBreadcrumb([
      {
        to: "/product",
        name: "Product"
      }
    ])
    this.list()
  }
}
</script>

<style scoped>

</style>
