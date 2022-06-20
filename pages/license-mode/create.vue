<template>
  <VCard title="Create New License Mode">
    <template #header>
      <VBtn type="button" class="m-0 c-btn--small">
        <NuxtLink to="/license-mode">List</NuxtLink>
      </VBtn>
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
      </div>
      <VBtn :loader="loaderRequest">SAVE</VBtn>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "create",
  permission: "license-mode.store",
  data() {
    return {
      payload: {
        name: '',
        label: '',
      }
    };
  },
  methods: {
    create() {
      this.startLoading();
      this.validation()
        .validate(this.payload, {abortEarly: false})
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("licenseMode/create", this.payload);
          this.stopLoading();
          const err = this.handleError(this.$store.state.licenseMode.error);
          if (!err) {
            this.$toast.success("License Mode successfully created.");
            this.$router.push("/license-mode");
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
      });
    },
    resetError() {
      this.$store.commit('licenseMode/RESET_ERROR')
      this.errors = {
        name: "",
        label: "",
      };
    }
  },
  created() {
    this.setTitle('License Mode')
    this.setBreadcrumb([
      {
        to: '/license-mode',
        name: 'License Mode'
      },
      {
        to: '/license-mode/create',
        name: 'Create'
      }
    ])
    this.resetError()
  }
}
</script>

<style scoped>

</style>
