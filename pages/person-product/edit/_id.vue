<template>
  <VCard :title="'Edit a Product for ' + payload.person.username">
    <form @submit.prevent="update" class="c-form">
      <div class="row">
        <div class="col-md-6">
          <VInput
            @validation="validate('status')"
            :error="errorMessage('status')"
            label="Status"
            v-model="payload.status"
            placeholder="Please enter status"
          />
        </div>
        <div class="col-md-6">
          <VInput
            @validation="validate('site')"
            :error="errorMessage('site')"
            label="Site"
            v-model="payload.site"
            placeholder="Please enter site"
          />
        </div>
        <div class="col-md-6">
          <VInput
            @validation="validate('version')"
            :error="errorMessage('version')"
            label="Version"
            v-model="payload.version"
            placeholder="Please enter version"
          />
        </div>
        <div class="col-md-6">
          <VSelect
            v-model="payload.product"
            @validation="validate('product')"
            :error="errorMessage('product')"
            :list="list.product"
            placeholder="Please select product"
            track-label="title"
            track-by="id"
            label="Product"/>
        </div>
        <div class="col-md-12 mb-4">
          <label class="c-form__label">Data</label>
          <v-jsoneditor v-model="payload.data" :plus="false" :options="{mode: 'code'}" height="250px"/>
        </div>
        <span v-if="hasError('data')" class="c-form__error">{{ errorMessage('data') }}</span>
      </div>
      <VBtn :loader="loaderRequest">SAVE</VBtn>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "edit",
  data() {
    return {
      list: {
        person: [],
        product: [],
      },
      payload: {
        status: '',
        site: '',
        version: '',
        data: null,
        product: null,
        person: []
      }
    };
  },
  methods: {
    update() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("person/product/update", {
            id: this.$route.params.id,
            payload: {
              status: this.payload.status,
              site: this.payload.site,
              version: this.payload.version,
              data: this.payload.data,
              product_id: this.payload.product.id,
              person_id: this.payload.person.id,
            }
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.person.product.error);
          if (!err) {
            this.$toast.success("Product successfully updated.");
            this.$router.push("/person/" + this.payload.person.id);
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async show() {
      this.startLoading()
      await this.$store.dispatch("person/product/show", this.$route.params.id);
      let err = this.handleError(this.$store.state.person.product.error);
      if (!err) {
        let data = this.$store.state.person.product.item;
        this.payload.status = data.status;
        this.payload.site = data.site;
        this.payload.version = data.version;
        this.payload.data = data.data;
        this.payload.product = data.product;
        this.payload.person = data.person;
      }
      this.stopLoading()
    },
    async getProduct() {
      await this.$store.dispatch('product/list')
      let err = this.handleError(this.$store.state.product.error)
      if (!err) {
        this.list.product = this.$store.state.product.list
      }
    },
    validation() {
      let roles = {
        status: Yup.string().required(),
        site: Yup.string().url().required(),
        version: Yup.string().required(),
        data: Yup.object().nullable().required(),
        product: Yup.object().nullable().required(),
      };
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit('person/product/RESET_ERROR')
      this.$store.commit('person/RESET_ERROR')
      this.$store.commit('product/RESET_ERROR')
      this.errors = {
        status: '',
        site: '',
        version: '',
        data: '',
        product: '',
      };
    },
  },
  created() {
    this.resetError()
    this.setTitle('Person Product')
    this.setBreadcrumb([
      {
        to: '/person-product',
        name: 'Person Product'
      },
      {
        to: '/person-product/create',
        name: 'Create'
      }
    ])
    this.show()
    this.getProduct()
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>
