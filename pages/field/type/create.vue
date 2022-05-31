<template>
  <VCard title="Create New Field Type">
    <form @submit.prevent="create" class="c-form">
      <div class="row">
        <div class="col-md-6">
          <VInput
            @validation="validate('type')"
            :error="errorMessage('type')"
            label="Type"
            v-model="payload.type"
            placeholder="Please enter type"
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
  data() {
    return {
      payload: {
        type: '',
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
          await this.$store.dispatch("fieldType/create", this.payload);
          this.stopLoading();
          const err = this.handleError(this.$store.state.fieldType.error);
          if (!err) {
            this.$toast.success("Field Type successfully created.");
            this.$router.push("/field/type");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    validation() {
      return Yup.object({
        type: Yup.string().required(),
        label: Yup.string().required(),
      });
    },
    resetError() {
      this.$store.commit('fieldType/RESET_ERROR')
      this.errors = {
        type: "",
        label: "",
      };
    }
  },
  created() {
    this.setTitle('Field Type')
    this.setBreadcrumb([
      {
        to: '/field/type',
        name: 'Field Type'
      },
      {
        to: '/field/type/create',
        name: 'Create'
      }
    ])
    this.resetError()
  }
}
</script>

<style scoped>

</style>
