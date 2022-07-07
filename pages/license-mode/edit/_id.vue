<template>
  <VCard title="Edit License Mode">
    <template #header>
      <VBtn to="/license-mode" class="m-0 c-btn--small"> Defined Products </VBtn>
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
      </div>
      <div class="mt-5">
        <VBtn :loader="loaderRequest">SAVE</VBtn>
        <VBtn btn="danger" to="/license-mode" :loader="loaderRequest">CANCEL</VBtn>
      </div>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "edit",
  permission: "license-mode.update",
  data() {
    return {
      id: this.$route.params.id,
      payload: {
        name: "",
        label: "",
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
          await this.$store.dispatch("licenseMode/update", {
            payload: this.payload,
            id: this.id,
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.licenseMode.error);
          if (!err) {
            this.$toast.success("License Mode successfully updated.");
            this.$router.push("/license-mode");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async show() {
      this.startLoading();
      await this.$store.dispatch("licenseMode/show", this.id);
      this.handleError(this.$store.state.licenseMode.error);
      let data = this.$store.state.licenseMode.item;
      this.payload.label = data.label;
      this.payload.name = data.name;
      this.stopLoading();
    },
    validation() {
      return Yup.object({
        name: Yup.string().required(),
        label: Yup.string().required(),
      });
    },
    resetError() {
      this.$store.commit("licenseMode/RESET_ERROR");
      this.errors = {
        name: "",
        label: "",
      };
    },
  },
  created() {
    this.show();
    this.setTitle("Definitions");
    this.setBreadcrumb([
      {
        to: "/license-mode",
        name: "Definitions / License Mode",
      },
      {
        to: "/license-mode/edit/" + this.id,
        name: "Edit",
      },
    ]);
    this.resetError();
  },
};
</script>

<style scoped>
</style>
