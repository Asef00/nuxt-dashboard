<template>
  <VCard title="Define New Group">
    <template #header>
      <VBtn to="/group" size="sm" class="m-0"> Defined Groups</VBtn>
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
            v-model="payload.fields"
            @validation="validate('fields')"
            :error="errorMessage('fields')"
            :list="list.field_name"
            placeholder="Please enter fields"
            track-label="label"
            track-by="id"
            :multiple="true"
            :closeOnSelect="false"
            label="Fields"
          />
        </div>
      </div>
      <div class="mt-5">
        <VBtn :loader="loaderRequest">SAVE</VBtn>
        <VBtn btn="danger" to="/group" :loader="loaderRequest">CANCEL</VBtn>
      </div>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "create",
  permission: "group.store",
  data() {
    return {
      list: {
        field_name: [],
      },
      payload: {
        name: "",
        label: "",
        fields: [],
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
          await this.$store.dispatch("group/create", {
            name: this.payload.name,
            label: this.payload.label,
            field_name_ids: this.payload.fields.map((a) => a.id),
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.group.error);
          if (!err) {
            this.$toast.success("Group successfully created.");
            this.$router.push("/group");
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
        fields: Yup.array(),
      });
    },
    resetError() {
      this.$store.commit("group/RESET_ERROR");
      this.errors = {
        name: "",
        label: "",
        fields: "",
      };
    },
    async getFieldName() {
      await this.$store.dispatch("fieldName/listLabel");
      let err = this.handleError(this.$store.state.fieldName.error);
      if (!err) {
        this.list.field_name = this.$store.state.fieldName.list;
      }
    },
  },
  created() {
    this.setTitle("Definitions");
    this.setBreadcrumb([
      {
        to: "/group",
        name: "Definitions / Group",
      },
      {
        to: "/group/create",
        name: "Create",
      },
    ]);
    this.resetError();
    this.getFieldName();
  },
};
</script>

<style scoped>
</style>
