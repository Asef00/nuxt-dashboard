<template>
  <VCard title="Edit Group">
    <template #header>
      <VBtn to="/group" size="sm" class="m-0"> Defined Groups </VBtn>
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
  name: "edit",
  permission: "group.update",
  data() {
    return {
      id: this.$route.params.id,
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
    update() {
      this.startLoading();
      this.validation()
        .validate(this.payload, { abortEarly: false })
        .then(async () => {
          this.resetError();
          await this.$store.dispatch("group/update", {
            payload: {
              name: this.payload.name,
              label: this.payload.label,
              field_name_ids: this.payload.fields.map((a) => a.id),
            },
            id: this.id,
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.group.error);
          if (!err) {
            this.$toast.success("Group successfully updated.");
            this.$router.push("/group");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async show() {
      this.startLoading();
      await this.$store.dispatch("group/show", this.id);
      this.handleError(this.$store.state.group.error);
      let data = this.$store.state.group.item;
      this.payload.label = data.label;
      this.payload.name = data.name;
      this.payload.fields = data.field_names;
      this.stopLoading();
    },
    async getFieldName() {
      await this.$store.dispatch("fieldName/listLabel");
      let err = this.handleError(this.$store.state.fieldName.error);
      if (!err) {
        this.list.field_name = this.$store.state.fieldName.list;
      }
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
  },
  created() {
    this.show();
    this.setTitle("Definitions");
    this.setBreadcrumb([
      {
        to: "/group",
        name: "Definitions / Group",
      },
      {
        to: "/group/edit/" + this.id,
        name: "Edit",
      },
    ]);
    this.resetError();
    this.getFieldName();
  },
};
</script>

<style scoped>
</style>
