<template>
  <VCard title="Edit a Model">
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
          <VSelect
            @validation="validate('fields')"
            :error="errorMessage('fields')"
            v-model="payload.fields"
            :list="payload.fields"
            label="Fields"
            placeholder="Please add field"
            :taggable="true"
          />
        </div>
      </div>
      <VBtn :loader="loaderRequest">SAVE</VBtn>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "ModelEdit",
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
    update() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("model/update", {
            payload: this.payload,
            id: this.$route.params.id
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.model.error);
          if (!err) {
            this.$toast.success("Model successfully updated.");
            this.$router.push("/model");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async show() {
      this.startLoading()
      await this.$store.dispatch("model/show", this.$route.params.id);
      let err = this.handleError(this.$store.state.model.error);
      if (!err) {
        let data = this.$store.state.model.item;
        this.payload.fields = data.fields
        this.payload.name = data.name
      }
      this.stopLoading()
    },
    validation() {
      return Yup.object({
        name: Yup.string().required(),
        fields: Yup.array().min(1),
      });
    },
    resetError() {
      this.$store.commit('model/RESET_ERROR')
      this.errors = {
        name: "",
        fields: "",
      };
    }
  },
  created() {
    this.setTitle("Model");
    this.setBreadcrumb([
      {
        to: "/model",
        name: "Model",
      },
      {
        to: "/model/create",
        name: "Edit",
      },
    ]);
    this.resetError();
    this.show()
  },
};
</script>
