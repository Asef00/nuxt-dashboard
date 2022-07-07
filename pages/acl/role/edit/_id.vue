<template>
  <VCard title="Edit Role">
    <template #header>
      <VBtn to="/acl/role" size="sm" class="m-0"> Defined Roles </VBtn>
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
            v-model="payload.permissions"
            @validation="validate('permissions')"
            :error="errorMessage('permissions')"
            :list="list.permission"
            :multiple="true"
            placeholder="Please Grant a Permission"
            track-label="label"
            track-by="id"
            :closeOnSelect="false"
            label="Permissions"
          />
        </div>
      </div>
      <div class="mt-5">
        <VBtn :loader="loaderRequest">SAVE</VBtn>
        <VBtn btn="danger" to="/acl/role" :loader="loaderRequest">CANCEL</VBtn>
      </div>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "edit",
  permission: "role.update",
  data() {
    return {
      id: this.$route.params.id,
      list: {
        permission: [],
      },
      payload: {
        name: "",
        label: "",
        permissions: [],
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
          this.payload = {
            name: this.payload.name,
            label: this.payload.label,
            permission_ids: this.payload.permissions.map((a) => a.id),
          };
          await this.$store.dispatch("role/update", {
            id: this.id,
            payload: this.payload,
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.fieldName.error);
          if (!err) {
            this.$toast.success("Role successfully updated.");
            this.$router.push("/acl/role");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async show() {
      this.startLoading();
      await this.$store.dispatch("role/show", this.id);
      let err = this.handleError(this.$store.state.role.error);
      if (!err) {
        let data = this.$store.state.role.item;
        this.payload.name = data.name;
        this.payload.label = data.label;
        this.payload.permissions = data.permissions;
      }
      this.stopLoading();
    },
    async getPermission() {
      await this.$store.dispatch("permission/listLabel", {});
      let err = this.handleError(this.$store.state.permission.error);
      if (!err) {
        this.list.permission = this.$store.state.permission.list;
      }
    },
    validation() {
      let roles = {
        name: Yup.string().required(),
        label: Yup.string().required(),
        permissions: Yup.array().min(1),
      };
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit("role/RESET_ERROR");
      this.$store.commit("fieldName/RESET_ERROR");
      this.$store.commit("permission/RESET_ERROR");
      this.errors = {
        name: "",
        label: "",
        permissions: "",
      };
    },
  },
  async created() {
    this.resetError();
    this.setTitle("Definitions");
    this.setBreadcrumb([
      {
        to: "/acl/role",
        name: "Definitions / Role",
      },
      {
        to: "/acl/role/edit/" + this.id,
        name: "Edit",
      },
    ]);
    await this.show();
    this.getPermission();
  },
  mounted() {},
};
</script>

<style scoped>
</style>
