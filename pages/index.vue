<template>
  <div class="o-page c-page--dashboard container-fluid">
    <div class="row">
      <div class="col-xl-6 col-md-6">
        <VCard :loader="loaderRequest" class="mr-0 ml-0">
          <div class="c-report">
            <div class="c-report__title">
              Installed Products
              <span class="c-report__icon">
                <fa icon="file-lines" size="3x"/>
              </span>
            </div>
            <span class="c-report__big">{{ Product.count }}</span>
            <span v-if="Product.count_month" class="c-report__change u-text-active">(+{{ Product.count_month }})</span>
          </div>
          <VProgress
            bar="info"
            :title="`Overview of this month`"
            subtitle="Monthly"
            :value="calculatePercentageDecrease(Product.count,Product.count_month)"
          />
        </VCard>
      </div>

      <div class="col-xl-6 col-md-6">
        <VCard :loader="loaderRequest" class="mr-0 ml-0">
          <div class="c-report">
            <div class="c-report__title">
              Persons
              <span class="c-report__icon">
                <fa icon="users" size="3x"/>
              </span>
            </div>
            <span class="c-report__big">{{ Person.count }}</span>
            <span v-if="Person.count_month" class="c-report__change u-text-active">(+{{ Person.count_month }})</span>
          </div>
          <VProgress
            bar="success"
            :title="`Overview of this month`"
            subtitle="Monthly"
            :value="calculatePercentageDecrease(Person.count,Person.count_month)"
          />
        </VCard>
      </div>

      <div class="col-xl-4">
        <VCard :loader="loaderRequest" class="mr-0 ml-0">
          <VTable :table="tablePerson" title="Last Logins"/>
        </VCard>
      </div>

      <div class="col-xl-8">
        <VCard :loader="loaderRequest" class="mr-0 ml-0" title="Newly Installed Products">
          <VTable @actionDetails="detailsItemProduct($event)"
                  :table="tableProduct"/>
          <VModal :showModal="showDetailsProduct" @close="showDetailsProduct =false" title="Data">
            <DetailsData :id="detailsItemIdProduct"/>
          </VModal>
        </VCard>
      </div>
    </div>
  </div>
</template>

<script>
import DetailsData from "@/components/page/person-product/DetailsDataDashboard";

export default {
  name: "dashboard",
  permission: "dashboard",
  components: {DetailsData},
  data() {
    let _this = this;
    return {
      Person: {},
      Product: {
        latest: []
      },
      showDetailsProduct: false,
      detailsItemIdProduct: 0,
      tableProduct: {
        columns: [
          {key: "full_name", label: "Client's Name",},
          {key: "title", label: "Product Title",},
          {key: "version", label: "Version",},
          {key: "site", label: "Site",},
          {key: "created_at", label: "Created At",},
          {key: "action", label: '<img src="/img/gear.svg" alt="" />', class: 'u-table--center'},
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
            return `<span v-on:click="action(${item.id},'Details')" class="c-badge--hover">
              <fa icon="eye" size="lg" />
            </span>`;
          },
          created_at(item) {
            return _this.dateFormat(item.created_at);
          },
          //REQUIRED
          rowClass() {
          },
        },
      },
      tablePerson: {
        columns: [
          {key: "full_name", label: "Name",},
          {key: "activity", label: "Activity",},
          {key: "created_at", label: "Logged At",},
        ],
        items: [],
        map: {
          full_name(item) {
            return `${item.causer.name} ${item.causer.family_name}`;
          },
          created_at(item) {
            return new Date(item.created_at).toLocaleString();
          },
          activity(item) {
            return item.description
          },
          //REQUIRED
          rowClass() {
          },
        },
      },
    };
  },
  methods: {
    async show() {
      this.startLoading();
      this.$store.commit('dashboard/RESET_ERROR')
      await this.$store.dispatch('dashboard/index')
      let err = this.handleError(this.$store.state.dashboard.error);
      if (!err) {
        let data = this.$store.state.dashboard.item;
        this.Person = data.person;
        this.Product = data.person_product;
        this.tableProduct.items = this.Product.latest;
        this.tablePerson.items = this.Person.last_login
      }
      this.stopLoading();
    },
    detailsItemProduct(id) {
      this.detailsItemIdProduct = id;
      this.showDetailsProduct = true;
    },
    calculatePercentageDecrease(Original, New) {
      // let decrease = Original - New;
      let percentage = New / Original * 100;
      return Math.round(percentage)
    }
  },
  created() {
    this.setTitle("Dashboard");
    this.setBreadcrumb([]);
    this.show();
  },
};
</script>
