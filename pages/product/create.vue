<template>
  <VCard title="Define New Product">
    <template #header>
      <VBtn to="/product" size="sm" class="m-0"> Defined Products</VBtn>
    </template>
    <form @submit.prevent="create" class="c-form">
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
          <VSelect
            v-model="payload.license_mode"
            @validation="validate('license_mode')"
            :error="errorMessage('license_mode')"
            :list="list.license_mode"
            placeholder="Please enter license mode"
            track-label="label"
            track-by="id"
            label="License Mode"
          />
        </div>
        <div class="col-md-6">
          <VSelect
            v-model="payload.product_mode"
            @validation="validate('product_mode')"
            :error="errorMessage('product_mode')"
            :list="list.product_mode"
            placeholder="Please enter product mode"
            track-label="label"
            track-by="id"
            label="Product Mode"
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
            @validation="validate('data_fields')"
            :error="errorMessage('data_fields')"
            v-model="payload.data_fields"
            label="Data Fields"
            placeholder="Please add data fields"
            :taggable="true"
          />
        </div>
      </div>
      <div class="mt-5">
        <VBtn :loader="loaderRequest">SAVE</VBtn>
        <VBtn btn="danger" to="/product" :loader="loaderRequest">CANCEL</VBtn>
      </div>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "create",
  permission: "product.store",
  data() {
    return {
      list: {
        product_mode: [],
        license_mode: [],
      },
      payload: {
        title: "",
        slug: "",
        description: "",
        license_mode: [],
        product_mode: [],
        data_fields: [],
      },
    };
  },
  methods: {
    create() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("product/create", {
            title: this.payload.title,
            slug: this.payload.slug,
            description: this.payload.description,
            license_mode_id: this.payload.license_mode.id,
            product_mode_id: this.payload.product_mode.id,
            data_fields: this.payload.data_fields,
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.product.error);
          if (!err) {
            this.$toast.success("Product successfully created.");
            this.$router.push("/product");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async getLicenseMode() {
      await this.$store.dispatch("product/mode/listLabel");
      let err = this.handleError(this.$store.state.product.mode.error);
      if (!err) {
        let data = this.$store.state.product.mode.list;
        this.list.product_mode = data.filter(item => item.type === 'product')
        this.list.license_mode = data.filter(item => item.type === 'license')
      }
    },
    validation() {
      let roles = {
        title: Yup.string().required(),
        slug: Yup.string().required(),
        description: Yup.string().required(),
        license_mode: Yup.object().nullable().required(),
        product_mode: Yup.object().nullable().required(),
        data_fields: Yup.array().nullable(),
      };
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit("product/RESET_ERROR");
      this.errors = {
        title: "",
        slug: "",
        description: "",
        license_mode: "",
        product_mode: "",
      };
    },
    convertToSlug(Text) {
      return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    },
  },
  created() {
    this.resetError();
    this.setTitle("Definitions");
    this.setBreadcrumb([
      {
        to: "/product",
        name: "Definitions / Product",
      },
      {
        to: "/product/create",
        name: "Create",
      },
    ]);
    this.getLicenseMode();
  },
  watch: {
    "payload.slug": {
      handler(val) {
        this.payload.slug = this.convertToSlug(val);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
</style>
