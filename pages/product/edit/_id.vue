<template>
  <VCard title="Edit a Product">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/product">List</NuxtLink>
      </VBtn>
    </template>
    <form @submit.prevent="update" class="c-form">
      <div class="row">
        <div class="col-md-6">
          <VInput
            @validation="validate('title')"
            :error="errorMessage('title')"
            label="Title"
            v-model="payload.title"
            placeholder="Please enter title"
          />
        </div>
        <div class="col-md-6">
          <VInput
            @validation="validate('slug')"
            :error="errorMessage('slug')"
            label="Slug"
            v-model="payload.slug"
            placeholder="Please enter slug"
          />
        </div>
        <div class="col-md-6">
          <VTextarea
            @validation="validate('description')"
            :error="errorMessage('description')"
            label="Description"
            :rows="3"
            v-model="payload.description"
            placeholder="Please enter description"
          />
        </div>
        <div class="col-md-6">
          <VSelect
            v-model="payload.license_mode"
            @validation="validate('license_mode')"
            :error="errorMessage('license_mode')"
            :list="list.license_mode"
            placeholder="Please enter license mode"
            track-label="label"
            track-by="id"
            label="License Mode"/>
        </div>
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
        license_mode: [],
      },
      payload: {
        title: '',
        slug: '',
        description: '',
        license_mode: []
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
          await this.$store.dispatch("product/update", {
            payload: {
              title: this.payload.title,
              slug: this.payload.slug,
              description: this.payload.description,
              license_mode_id: this.payload.license_mode.id,
            },
            id: this.$route.params.id
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.fieldName.error);
          if (!err) {
            this.$toast.success("Product successfully updated.");
            this.$router.push("/product");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async getLicenseMode() {
      await this.$store.dispatch('licenseMode/list')
      let err = this.handleError(this.$store.state.licenseMode.error)
      if (!err) {
        this.list.license_mode = this.$store.state.licenseMode.list
      }
    },
    async show() {
      this.startLoading()
      await this.$store.dispatch("product/show", this.$route.params.id);
      let err = this.handleError(this.$store.state.product.error);
      if (!err) {
        let data = this.$store.state.product.item;
        this.payload.title = data.title;
        this.payload.slug = data.slug;
        this.payload.description = data.description;
        this.payload.license_mode = data.license_mode;
      }
      this.stopLoading()
    },
    validation() {
      let roles = {
        title: Yup.string().required(),
        slug: Yup.string().required(),
        description: Yup.string().required(),
        license_mode: Yup.object().nullable().required(),
      };
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit('product/RESET_ERROR')
      this.$store.commit('licenseMode/RESET_ERROR')
      this.errors = {
        title: '',
        slug: '',
        description: '',
        license_mode: ''
      };
    },
    convertToSlug(Text) {
      return Text.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
  },
  created() {
    this.resetError()
    this.setTitle('Product')
    this.setBreadcrumb([
      {
        to: '/product',
        name: 'Product'
      },
      {
        to: '/product/edit/' + this.$route.params.id,
        name: 'Edit'
      }
    ])
    this.show()
    this.getLicenseMode()
  },
  watch: {
    "payload.slug": {
      handler(val) {
        this.payload.slug = this.convertToSlug(val)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
