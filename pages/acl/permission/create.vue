<template>
  <VCard title="Define New Permission">
    <template #header>
      <VBtn to="/acl/permission" size="sm" class="m-0"> Defined Permissions </VBtn>
    </template>
    <form @submit.prevent="create" class="c-form">
      <div class="row">
        <div class="col-md-6">
          <VSelect
            v-model="payload.name"
            @validation="validate('name')"
            :error="errorMessage('name')"
            :list="list.route"
            placeholder="Please select name"
            track-label="name"
            label="Name (Route Name)"
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
      <!--conditions-->
      <div v-if="false">
        <label class="c-form__label">Conditions</label>
        <div v-if="checkSelectedModel" class="row">
          <div class="col-md-3">
            <div class="c-form__control">
              <multiselect
                class="c-form__select"
                v-model="data.conditions.field"
                :options="payload.permission_model_fields"
                select-label="Selected"
                deselect-label="Hit to remove"
                placeholder="Field"
              >
                <template slot="caret">
                  <div
                    class="multiselect__select c-chevron c-chevron--bottom"
                  ></div>
                </template>
              </multiselect>
            </div>
          </div>
          <div class="col-md-3">
            <div class="c-form__control">
              <multiselect
                class="c-form__select"
                v-model="data.conditions.condition"
                :options="list.conditions"
                select-label="Selected"
                deselect-label="Hit to remove"
                placeholder="Condition"
                track-by="label"
                label="label"
              >
                <template slot="caret">
                  <div
                    class="multiselect__select c-chevron c-chevron--bottom"
                  ></div>
                </template>
              </multiselect>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="c-form__control"
              v-show="data.conditions.condition.is_value"
            >
              <input
                v-model="data.conditions.value"
                placeholder="Value"
                class="c-form__input"
              />
              <span>current_user = user logged in</span>
            </div>
          </div>
          <div class="col-md-3">
            <VBtn
              type="button"
              @action="addCondition"
              btn="outline"
              :loader="loaderRequest"
              >ADD
            </VBtn>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <VBtn :loader="loaderRequest">SAVE</VBtn>
        <VBtn btn="danger" to="/acl/permission" :loader="loaderRequest">CANCEL</VBtn>
      </div>
    </form>
  </VCard>
</template>

<script>
import Multiselect from "vue-multiselect";
import * as Yup from "yup";

export default {
  name: "create",
  permission: "permission.store",
  components: { Multiselect },
  data() {
    return {
      hasFilter: false,
      options: {
        mode: "code",
      },
      list: {
        route: [],
        model: [],
        conditions: [
          {
            label: "equal",
            condition: "",
            is_value: true,
          },
          {
            label: "in",
            condition: "_in",
            is_value: true,
          },
          {
            label: "not in",
            condition: "_notIn",
            is_value: true,
          },
          {
            label: "is null",
            condition: "_isNull",
            is_value: true,
          },
          {
            label: "is not null",
            condition: "_isNotNull",
            is_value: true,
          },
          {
            label: "like",
            condition: "_like",
            is_value: true,
          },
          {
            label: "not",
            condition: "_not",
            is_value: true,
          },
          {
            label: "between",
            condition: "_between",
            is_value: true,
          },
          {
            label: "not between",
            condition: "_notBetween",
            is_value: true,
          },
          {
            label: "date",
            condition: "_date",
            is_value: true,
          },
          {
            label: "month",
            condition: "_month",
            is_value: true,
          },
          {
            label: "day",
            condition: "_day",
            is_value: true,
          },
          {
            label: "year",
            condition: "_year",
            is_value: true,
          },
          {
            label: "time",
            condition: "_time",
            is_value: true,
          },
          {
            label: "gt",
            condition: "_gt",
            is_value: true,
          },
          {
            label: "lt",
            condition: "_lt",
            is_value: true,
          },
          {
            label: "gte",
            condition: "_gte",
            is_value: true,
          },
          {
            label: "lte",
            condition: "_lte",
            is_value: true,
          },
          {
            label: "sort desc",
            condition: "desc",
            is_value: false,
          },
          {
            label: "sort asc",
            condition: "asc",
            is_value: false,
          },
        ],
      },
      data: {
        conditions: {
          field: "",
          condition: "",
          value: "",
        },
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
    create() {
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
          await this.$store.dispatch("permission/create", payload);
          this.stopLoading();
          const err = this.handleError(this.$store.state.permission.error);
          if (!err) {
            this.$toast.success("Permission successfully created.");
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
    addCondition() {
      Yup.object({
        field: Yup.string().nullable().required(),
        condition: Yup.object().nullable().required(),
      })
        .validate(this.data.conditions, { abortEarly: false })
        .then(async () => {
          this.payload.permission_model_conditions.push({
            field: this.data.conditions.field,
            condition: this.data.conditions.condition,
            value: this.data.conditions.value,
          });
          this.data.conditions.field = "";
          this.data.conditions.condition = "";
          this.data.conditions.value = "";
        })
        .catch((err) => {
          this.$toast.error("Please fill all field");
        });
    },
  },
  created() {
    this.resetError();
    this.setTitle("Definitions");
    this.setBreadcrumb([
      {
        to: "/acl/permission",
        name: "Definitions / Permission",
      },
      {
        to: "/acl/permission/create",
        name: "Create",
      },
    ]);
  },
  mounted() {
    this.getRouteList();
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
