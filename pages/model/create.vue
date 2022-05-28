<template>
  <VCard title="Create New Model">
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
          <v-tag-input
            @list="pushListFiled($event)"
            @validation="validate('fields')"
            :error="errorMessage('fields')"
            v-model="payload.field"
            label="Fields"
          />
        </div>
      </div>
      <VBtn :loader="loaderRequest"> Create Model </VBtn>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "ModelCreate",
  data() {
    return {
      payload: {
        name: "",
        fields: [],
        field: "",
      },
    };
  },
  methods: {
    create() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("model/create", this.payload);
          this.stopLoading();
          this.handleError(this.$store.state.model.error);
          if (this.$store.state.model.item) {
            this.$toast.success("Model successfully created.");
            this.$router.push("/model");
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
        fields: Yup.array().min(1),
      });
    },
    resetError() {
      this.errors = {
        name: "",
        fields: "",
      };
    },
    pushListFiled(fields) {
      let arr = [];
      for (let value of fields) {
        arr.push(value.text);
      }
      this.payload.fields = arr;
    },
  },
  created() {
    this.setTitle("Model");
    this.setBreadcrumb([
      {
        to: "/dashboard",
        name: "Dashboard",
      },
      {
        to: "/model",
        name: "Model",
      },
      {
        to: "/model/create",
        name: "Create",
      },
    ]);
    this.resetError();
  },
};
</script>
