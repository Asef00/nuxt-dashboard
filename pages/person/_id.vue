<template>
  <div>
    <VCard :loader="loaderRequest" title="Person Details">
      <template #header>
        <VBtn type="button" class="m-0 c-btn--small">
          <NuxtLink to="/person">List</NuxtLink>
        </VBtn>
        <VBtn type="button" class="m-0 c-btn--small">
          <NuxtLink :to="`/person/edit/${id}`">Edit</NuxtLink>
        </VBtn>
        <VBtn type="button" class="m-0 c-btn--small">
          <NuxtLink :to="`/person-product/create/${id}`">Add Product</NuxtLink>
        </VBtn>
        <VBtn type="button" @action="showChangePasswordModal = true" class="m-0 c-btn--small">
          Change password
        </VBtn>
      </template>
      <form action="" class="c-form">
        <h4 class="c-form__title mb-2">Details</h4>
        <div class="row">
          <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
            <label class="c-form__label">Name</label>
            <span class="u-text-secondary">{{ data.person.name }}</span>
          </div>
          <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
            <label class="c-form__label">Family Name</label>
            <span class="u-text-secondary">{{ data.person.family_name }}</span>
          </div>
          <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
            <label class="c-form__label">Email</label>
            <span class="u-text-secondary">{{ data.person.username }}</span>
          </div>
          <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
            <label class="c-form__label">Created At</label>
            <span class="u-text-secondary">{{ dateFormat(data.person.created_at) }}</span>
          </div>
          <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
            <label class="c-form__label">Updated At</label>
            <span class="u-text-secondary">{{ dateFormat(data.person.updated_at) }}</span>
          </div>
          <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
            <label class="c-form__label">Roles</label>
            <span v-for="role in data.person.roles" class="c-badge u-bg-primary">{{ role.label }}</span>
          </div>
        </div>
        <div class="row mt-3 mb-3">
          <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
            <label class="c-form__label">Email Verified</label>
            <VBtn :loader="loaderRequest" @action="toggleVerifyEmail" type="button" class="c-btn--small"
                  :btn="data.cognito.email_verified ? 'success' :'danger'">
              {{ data.cognito.email_verified ? 'Verified' : 'Not Verified' }}
            </VBtn>
            <span class="u-text-secondary">(Click to Change)</span>
          </div>
          <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
            <label class="c-form__label">Enabled</label>
            <VBtn :loader="loaderRequest" @action="toggleEnabled" type="button" class="c-btn--small"
                  :btn="data.person.enabled ? 'success' :'danger'">
              {{ data.person.enabled ? 'Enabled' : 'Disabled' }}
            </VBtn>
            <span class="u-text-secondary">(Click to Change)</span>
          </div>
        </div>
        <h4 class="c-form__title mb-2">Cognito Details</h4>
        <div class="row mb-3">
          <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
            <label class="c-form__label">Status</label>
            <span class="u-text-secondary">{{ data.cognito.status }}</span>
          </div>
          <div class=" col-md-6 c-form__control c-form__control--inline mb-0">
            <label class="c-form__label">Enabled</label>
            <span :class="['c-badge',data.cognito.enabled ?'u-bg-success':'u-bg-danger']">{{
                data.cognito.enabled ? "Enabled" : "Disabled"
              }}</span>
          </div>
        </div>
      </form>
      <ChangePassword @show="changePasswordModal($event)" :show="showChangePasswordModal" :id="id"/>
    </VCard>
    <VCard :loader="loaderRequest" title="Product">
      <template #header>
        <VBtn type="button" class="m-0 c-btn--small">
          <NuxtLink :to="`/person-product/create/${id}`">Create</NuxtLink>
        </VBtn>
      </template>
      <VTable @actionDetails="detailsItem($event)" @actionDelete="deleteItem($event)" :table="table"/>
      <VModal :showModal="showDetails" @close="showDetails =false" title="Product details">
        <Detail :id="detailsItemId"/>
      </VModal>
    </VCard>
  </div>
</template>

<script>
import ChangePassword from "@/components/page/person/ChangePassword";
import Detail from "@/components/page/person-product/Details";

export default {
  name: "Details",
  components: {ChangePassword, Detail},
  data() {
    let _this = this;
    return {
      showChangePasswordModal: false,
      id: this.$route.params.id,
      data: {
        person: {},
        cognito: {},
      },
      showDetails: false,
      detailsItemId: 0,
      table: {
        columns: [
          {key: "id", label: "#"},
          {key: "product_title", label: "Product Title",},
          {key: "status", label: "Status",},
          {key: "site", label: "Site",},
          {key: "version", label: "Version",},
          {key: "created_at", label: "Created At", class: "u-text-center"},
          {key: "updated_at", label: "Updated At", class: "u-text-center"},
          {key: "action", label: '<img src="/img/gear.svg" alt="" />', class: "u-text-center",},
        ],
        items: [],
        map: {
          action(item) {
            return `<NuxtLink to="/person-product/edit/${item.id}" class="c-badge u-bg-info">Edit</NuxtLink> |
            <span v-on:click="action(${item.id},'Delete')" class="c-badge--hover c-badge u-bg-danger">Delete</span> |
            <span v-on:click="action(${item.id},'Details')" class="c-badge--hover c-badge u-bg-primary">Details</span>`;
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
  }
  ,
  methods: {
    changePasswordModal(e) {
      this.showChangePasswordModal = e;
    },
    async show() {
      this.startLoading()
      await this.$store.dispatch("person/show", {id: this.id, product: true});
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.data.person = this.$store.state.person.item;
        this.table.items = this.data.person.products;
        this.data.cognito = this.$store.state.person.item.cognito;
      }
      this.stopLoading()
    },
    async toggleVerifyEmail() {
      this.startLoading()
      await this.$store.dispatch("person/toggleVerifyEmail", this.id);
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.data.cognito = this.$store.state.person.cognitoUser;
      }
      this.stopLoading()
    },
    async toggleEnabled() {
      this.startLoading()
      await this.$store.dispatch("person/toggleEnable", this.id);
      let err = this.handleError(this.$store.state.person.error);
      if (!err) {
        this.data.person.enabled = !this.data.person.enabled;
      }
      this.stopLoading()
    },
    resetError() {
      this.$store.commit("person/RESET_ERROR");
    },
    async deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.startLoading()
        this.$store.commit('person/product/RESET_LIST')
        await this.$store.dispatch("person/product/delete", id);
        let err = this.handleError(this.$store.state.person.product.error);
        if (!err) {
          this.$toast.success('Product successfully deleted.');
          await this.show();
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
    this.resetError();
    this.setTitle('Person')
    this.show();
    this.setBreadcrumb([
      {
        to: '/person',
        name: 'Person'
      },
      {
        to: `/person/${this.id}`,
        name: 'Details'
      }
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
