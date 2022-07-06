<template>
  <VCard title="Edit a Permission">
    <template #header>
      <VBtn to="/acl/permission" size="sm" class="m-0"> List</VBtn>
    </template>
    <form @submit.prevent="update" class="c-form">
      <div class="row">
        <div class="col-md-6">
          <VSelect
            v-model="payload.name"
            @validation="validate('name')"
            :error="errorMessage('name')"
            :list="list.route"
            placeholder="Please select name"
            track-label="name"
            label="Name (route name)"
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
          <VSwitch
            v-model="hasFilter"
            label="Has filter"
            :checked="Boolean(hasFilter)"
          />
        </div>
      </div>
      <div v-if="hasFilter" class="row">
        <div class="col-md-6">
          <VSelect
            v-model="payload.model"
            :list="list.model"
            placeholder="Please select model"
            track-label="name"
            label="Model"
          />
        </div>
        <div class="col-md-6">
          <div class="c-form__control c-form__control--inline mb-5">
            <label class="c-form__label">Fields :</label>
            <span
              v-for="field in payload.fields"
              class="c-badge u-bg-primary"
              >{{ field }}</span
            >
          </div>
        </div>
        <div class="col-md-12 mb-4">
          <label class="c-form__label">Conditions</label>
          <v-jsoneditor
            v-model="payload.conditions"
            :plus="false"
            :options="options"
            height="250px"
          />
        </div>
      </div>
      <VBtn :loader="loaderRequest">SAVE</VBtn>
    </form>
  </VCard>
</template>

<script>
import Multiselect from "vue-multiselect";
import * as Yup from "yup";

export default {
  name: "create",
  permission: "permission.update",
  components: { Multiselect },
  data() {
    return {
      id: this.$route.params.id,
      hasFilter: false,
      options: {
        mode: "code",
      },
      list: {
        route: [],
        model: [],
        model_fields: [],
      },
      payload: {
        name: "",
        label: "",
        model: null,
        fields: null,
        conditions: {},
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
          let payload = {
            name: this.payload.name.name,
            label: this.payload.label,
            conditions: this.payload.conditions,
          };
          await this.$store.dispatch("permission/update", {
            payload,
            id: this.id,
          });
          this.stopLoading();
          const err = this.handleError(this.$store.state.permission.error);
          if (!err) {
            this.$toast.success("Permission successfully updated.");
            this.$router.push("/acl/permission");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async getRouteList() {
      await this.$store.dispatch("permission/routeList");
      let err = this.handleError(this.$store.state.permission.error);
      if (!err) {
        this.list.route = this.$store.state.permission.routes;
      }
    },
    async getModel() {
      await this.$store.dispatch("permission/modelList");
      let err = this.handleError(this.$store.state.permission.error);
      if (!err) {
        this.list.model = this.$store.state.permission.models;
      }
    },
    async show() {
      this.startLoading();
      await this.$store.dispatch("permission/show", this.id);
      let err = this.handleError(this.$store.state.permission.error);
      if (!err) {
        let data = this.$store.state.permission.item;
        this.payload.name = this.list.route.find((o) => o.name === data.name);
        this.payload.label = data.label;
        if (data.conditions != null) {
          this.hasFilter = true;
          this.payload.conditions = data.conditions;
        }
      }
      this.stopLoading();
    },
    validation() {
      let roles = {
        name: Yup.object().nullable().required(),
        label: Yup.string().required(),
        conditions: Yup.object(),
      };
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit("permission/RESET_ERROR");
      this.errors = {
        name: "",
        label: "",
        conditions: "",
      };
    },
  },
  created() {
    this.resetError();
    this.getRouteList();
    this.show();
    this.setTitle("Permission");
    this.setBreadcrumb([
      {
        to: "/acl/permission",
        name: "Permission",
      },
      {
        to: "/acl/permission/edit/" + this.id,
        name: "Edit",
      },
    ]);
  },
  watch: {
    hasFilter: {
      async handler(v) {
        if (v) {
          await this.getModel();
        } else {
          this.payload.conditions = {};
          this.list.model_fields = {};
        }
      },
      immediate: true,
    },
    "payload.model": {
      handler(v) {
        if (v == null) {
          this.payload.fields = null;
        } else {
          this.payload.fields = v.fields;
        }
      },
    },
  },
};
</script>

<style scoped>
</style>
