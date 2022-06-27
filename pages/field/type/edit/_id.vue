<template>
  <VCard title="Edit a Field Type">
    <template #header>
      <VBtn to="/field/type" class="m-0 c-btn--small"> List </VBtn>
    </template>
    <form @submit.prevent="update" class="c-form">
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
  permission: "field-type.update",
  data() {
    return {
      id: this.$route.params.id,
      payload: {
        type: "",
        label: "",
      },
    };
  },
  methods: {
    update() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("fieldType/update", {
            payload: this.payload,
            id: this.id,
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.fieldType.error);
          if (!err) {
            this.$toast.success("Field Type successfully updated.");
            this.$router.push("/field/type");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async show() {
      this.startLoading();
      await this.$store.dispatch("fieldType/show", this.id);
      let err = this.handleError(this.$store.state.fieldType.error);
      if (!err) {
        let data = this.$store.state.fieldType.item;
        this.payload.type = data.type;
        this.payload.label = data.label;
      }
      this.stopLoading();
    },
    validation() {
      return Yup.object({
        type: Yup.string().required(),
        label: Yup.string().required(),
      });
    },
    resetError() {
      this.$store.commit("fieldType/RESET_ERROR");
      this.errors = {
        type: "",
        label: "",
      };
    },
  },
  created() {
    this.setTitle("Field Type");
    this.setBreadcrumb([
      {
        to: "/field/type",
        name: "Field Type",
      },
      {
        to: "/field/type/edit/" + this.id,
        name: "Edit",
      },
    ]);
    this.resetError();
    this.show();
  },
};
</script>

<style scoped>
</style>
