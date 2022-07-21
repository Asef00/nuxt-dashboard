<template>
  <VCard title="Define New Product Mode">
    <template #header>
      <VBtn to="/product/mode" size="sm" class="m-0"> Defined Product Modes</VBtn>
    </template>
    <form @submit.prevent="create" class="c-form">
      <div class="row">
        <div class="col-md-6">
          <VInput
            @validation="validate('name')"
            :error="errorMessage('name')"
            label="Name"
            v-model="payload.name"
            placeholder="Please enter name"
          />
        </div>
        <div class="col-md-6">
          <VInput
            @validation="validate('label')"
            :error="errorMessage('label')"
            label="Label"
            v-model="payload.label"
            placeholder="Please enter label"
          />
        </div>
        <div class="col-md-6">
          <VSelect
            v-model="payload.type"
            @validation="validate('type')"
            :error="errorMessage('type')"
            :list="list.type"
            placeholder="Please enter type"
            label="Type"
          />
        </div>
      </div>
      <div class="mt-5">
        <VBtn :loader="loaderRequest">SAVE</VBtn>
        <VBtn btn="danger" to="/product/mode" :loader="loaderRequest">CANCEL</VBtn>
      </div>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "create",
  permission: "product.mode.store",
  data() {
    return {
      list: {
        type: [
          'product',
          'license'
        ],
      },
      payload: {
        name: "",
        label: "",
        type: "",
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
          await this.$store.dispatch("product/mode/create", this.payload);
          this.stopLoading();
          const err = this.handleError(this.$store.state.product.mode.error);
          if (!err) {
            this.$toast.success("Product Mode successfully created.");
            this.$router.push("/product/mode");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    validation() {
      return Yup.object({
        name: Yup.string().required(),
        label: Yup.string().required(),
        type: Yup.string().required(),
      });
    },
    resetError() {
      this.$store.commit("product/mode/RESET_ERROR");
      this.errors = {
        name: "",
        label: "",
        type: "",
      };
    },
  },
  created() {
    this.setTitle("Definitions");
    this.setBreadcrumb([
      {
        to: "/product/mode",
        name: "Definitions / Product Mode",
      },
      {
        to: "/product/mode/create",
        name: "Create",
      },
    ]);
    this.resetError();
  },
};
</script>

<style scoped>
</style>
