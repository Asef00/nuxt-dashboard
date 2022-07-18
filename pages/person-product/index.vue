<template>
  <VCard :loader="loaderRequest" title="List Products">
    <VTable @actionDetails="detailsItem($event)"
            @changePage="changePage($event)"
            @changePerPage="changePerPage($event)"
            @filter="filter($event)"
            :table="table"/>
    <VModal :showModal="showDetails" @close="showDetails =false" title="Product data">
      <DetailsData :id="detailsItemId"/>
    </VModal>
  </VCard>
</template>

<script>
import DetailsData from "@/components/page/person-product/DetailsData";

export default {
  name: "index",
  components: {
    DetailsData
  },
  data() {
    let _this = this;
    return {
      showDetails: false,
      detailsItemId: 0,
      table: {
        columns: [
          {key: "id", label: "#", filterType: "number", sortable: true,},
          {key: "full_name", label: "Client's Name",},
          {key: "title", label: "Product Title",},
          {key: "version", label: "Version", filterType: "search"},
          {key: "site", label: "Site", filterType: "search"},
          {key: "status", label: "Status",},
          {key: "created_at", label: "Created At", filterType: "date", sortable: true,},
          {key: "action", label: '<img src="/img/gear.svg" alt="" />',},
        ],
        items: [],
        map: {
          full_name(item) {
            return `${item.person.name} ${item.person.family_name}`;
          },
          title(item) {
            return item.product.title;
          },
          action(item) {
            return `<span v-on:click="action(${item.id},'Details')" class="c-badge--hover c-badge u-bg-primary">Details</span>`;
          },
          created_at(item) {
            return _this.dateFormat(item.created_at);
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
      this.startLoading();
      this.$store.commit('person/product/RESET_LIST')
      await this.$store.dispatch("person/product/list");
      let err = this.handleError(this.$store.state.person.product.error);
      if (!err) {
        this.table.items = this.$store.state.person.product.list;
      }
      this.stopLoading()
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
    filter(val) {
      this.setAxiosParams(val);
      this.list();
    },
  },
  created() {
    this.resetAxiosParams();
    this.list()
    this.setTitle('Products')
    this.setBreadcrumb([
      {
        to: '/person-product',
        name: 'Products'
      }
    ])
  }
}
</script>

<style scoped>

</style>
