<template>
  <VCard title="Create new Role">
    <template #header>
      <VBtn to="/acl/role" size="sm" class="m-0"> List </VBtn>
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
            v-model="payload.permission"
            @validation="validate('permission')"
            :error="errorMessage('permission')"
            :list="list.permission"
            :multiple="true"
            placeholder="Please enter permission"
            track-label="label"
            track-by="id"
            :closeOnSelect="false"
            label="Permission"
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
  permission: "role.store",
  data() {
    return {
      list: {
        permission: [],
      },
      payload: {
        name: "",
        label: "",
        permission: [],
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
          await this.$store.dispatch("role/create", {
            name: this.payload.name,
            label: this.payload.label,
            permission_ids: this.payload.permission.map((a) => a.id),
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.fieldName.error);
          if (!err) {
            this.$toast.success("Role successfully created.");
            this.$router.push("/acl/role");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
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
        permission: Yup.array().min(1),
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
        permission: "",
      };
    },
  },
  created() {
    this.resetError();
    this.setTitle("Role");
    this.setBreadcrumb([
      {
        to: "/acl/role",
        name: "Role",
      },
      {
        to: "/acl/role/create",
        name: "Create",
      },
    ]);
    this.getPermission();
  },
  mounted() {},
};
</script>

<style scoped>
</style>
