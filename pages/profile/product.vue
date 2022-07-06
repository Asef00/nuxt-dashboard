<template>
  <VCard :loader="loaderRequest" title="Product">
    <VTable @actionDetails="detailsItem($event)" :table="table"/>
    <VModal :showModal="showDetails" @close="showDetails =false" title="Product details">
      <Detail :id="detailsItemId"/>
    </VModal>
  </VCard>
</template>

<script>
import Detail from "@/components/page/person-product/Details";

export default {
  name: "product",
  permission: "person.product.index",
  components: {Detail},
  data() {
    let _this = this;
    return {
      showDetails: false,
      detailsItemId: 0,
      table: {
        columns: [
          {key: "product_title", label: "Product Title",},
          {key: "status", label: "Status",},
          {key: "site", label: "Site",},
          {key: "version", label: "Version",},
          {key: "created_at", label: "Created At",},
          {key: "action", label: '<img src="/img/gear.svg" alt="" />', class: "u-text-center",},
        ],
        items: [],
        map: {
          action(item) {
            return `<span v-if="can('person.product.show')" v-on:click="action(${item.id},'Details')" class="c-badge--hover c-badge u-bg-primary">Details</span>`;
          },
          created_at(item) {
            return _this.dateFormat(item.created_at);
          },
          updated_at(item) {
            return _this.dateFormat(item.updated_at);
          },
          product_title(item) {
            return item.product.title;
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
      this.startLoading()
      await this.$auth.fetchUser().then((response) => {
        this.stopLoading()
        this.table.items = this.$auth.user.products
      });
    },
    detailsItem(id) {
      this.detailsItemId = id;
      this.showDetails = true;
    }
  },
  created() {
    this.list()
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
