<template>
  <VCard title="Edit Product Mode">
    <template #header>
      <VBtn to="/product/mode" size="sm" class="m-0"> Defined Product Modes </VBtn>
    </template>
    <form @submit.prevent="update" class="c-form">
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
  name: "edit",
  permission: "product.mode.update",
  data() {
    return {
      id: this.$route.params.id,
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
    update() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("product/mode/update", {
            payload: this.payload,
            id: this.id,
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.product.mode.error);
          if (!err) {
            this.$toast.success("Product Mode successfully updated.");
            this.$router.push("/product/mode");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async show() {
      this.startLoading();
      await this.$store.dispatch("product/mode/show", this.id);
      this.handleError(this.$store.state.product.mode.error);
      let data = this.$store.state.product.mode.item;
      this.payload.label = data.label;
      this.payload.name = data.name;
      this.payload.type = data.type;
      this.stopLoading();
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
    this.show();
    this.setTitle("Definitions");
    this.setBreadcrumb([
      {
        to: "/product/mode",
        name: "Definitions / Product Mode",
      },
      {
        to: "/product/mode/edit/" + this.id,
        name: "Edit",
      },
    ]);
    this.resetError();
  },
};
</script>

<style scoped>
</style>
