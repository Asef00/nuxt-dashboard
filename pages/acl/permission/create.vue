<template>
  <VCard title="Create new Permission">
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
            label="Name (route name)"/>
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
            v-model="payload.permission_model_model"
            @validation="validate('permission_model_model')"
            :error="errorMessage('permission_model_model')"
            :list="list.model"
            placeholder="Please select model"
            track-label="name"
            label="Model"/>
        </div>
        <div v-if="checkSelectedModel" class="col-md-6">
          <VSelect
            :multiple="true"
            v-model="payload.permission_model_fields"
            @validation="validate('permission_model_fields')"
            :error="errorMessage('permission_model_fields')"
            :list="typeof(payload.permission_model_model.fields) == 'undefined' ? [] : payload.permission_model_model.fields"
            placeholder="Please select fields"
            label="Fields"/>
        </div>
        <div v-if="checkSelectedModel" class="col-md-12 mb-4">
          <label class="c-form__label">Conditions</label>
          <v-jsoneditor v-model="payload.permission_model_conditions" :plus="false" :options="options" height="250px"/>
        </div>
      </div>
      <!--            conditions-->
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
                  <div class="multiselect__select c-chevron c-chevron--bottom"></div>
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
                  <div class="multiselect__select c-chevron c-chevron--bottom"></div>
                </template>
              </multiselect>
            </div>
          </div>
          <div class="col-md-3">
            <div class="c-form__control" v-show="data.conditions.condition.is_value">
              <input v-model="data.conditions.value"
                     placeholder="Value"
                     class="c-form__input"/>
              <span>current_user = user logged in</span>
            </div>
          </div>
          <div class="col-md-3">
            <VBtn type="button" @action="addCondition" btn="outline" :loader="loaderRequest">ADD</VBtn>
          </div>
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
  components: {Multiselect},
  data() {
    return {
      hasFilter: false,
      options: {
        mode: 'code'
      },
      list: {
        route: [],
        model: [],
        conditions: [
          {
            label: 'equal',
            condition: '',
            is_value: true,
          },
          {
            label: 'in',
            condition: '_in',
            is_value: true,
          },
          {
            label: 'not in',
            condition: '_notIn',
            is_value: true,
          }, {
            label: 'is null',
            condition: '_isNull',
            is_value: true,
          }, {
            label: 'is not null',
            condition: '_isNotNull',
            is_value: true,
          }, {
            label: 'like',
            condition: '_like',
            is_value: true,
          }, {
            label: 'not',
            condition: '_not',
            is_value: true,
          }, {
            label: 'between',
            condition: '_between',
            is_value: true,
          }, {
            label: 'not between',
            condition: '_notBetween',
            is_value: true,
          }, {
            label: 'date',
            condition: '_date',
            is_value: true,
          }, {
            label: 'month',
            condition: '_month',
            is_value: true,
          }, {
            label: 'day',
            condition: '_day',
            is_value: true,
          }, {
            label: 'year',
            condition: '_year',
            is_value: true,
          }, {
            label: 'time',
            condition: '_time',
            is_value: true,
          }, {
            label: 'gt',
            condition: '_gt',
            is_value: true,
          }, {
            label: 'lt',
            condition: '_lt',
            is_value: true,
          }, {
            label: 'gte',
            condition: '_gte',
            is_value: true,
          }, {
            label: 'lte',
            condition: '_lte',
            is_value: true,
          }, {
            label: 'sort desc',
            condition: 'desc',
            is_value: false,
          }, {
            label: 'sort asc',
            condition: 'asc',
            is_value: false,
          },

        ]
      },
      data: {
        conditions: {
          field: '',
          condition: '',
          value: ''
        },
      },
      payload: {
        name: '',
        label: '',
        permission_model_model: [],
        permission_model_conditions: {},
        permission_model_fields: [],
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
          let payload = {
            name: this.payload.name.name,
            label: this.payload.label,
          }
          if (this.hasFilter) {
            payload = {
              ...payload, permission_model: {
                model_id: this.payload.permission_model_model.id,
                conditions: this.payload.permission_model_conditions,
                fields: this.payload.permission_model_fields
              }
            }
          }
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
      await this.$store.dispatch('permission/routeList')
      let err = this.handleError(this.$store.state.permission.error)
      if (!err) {
        this.list.route = this.$store.state.permission.routes
      }
    },
    async getModel() {
      await this.$store.dispatch('model/list')
      let err = this.handleError(this.$store.state.model.error)
      if (!err) {
        this.list.model = this.$store.state.model.list
      }
    },
    validation() {
      let roles = {
        name: Yup.object().nullable().required(),
        label: Yup.string().required(),
      };
      if (this.hasFilter) {
        roles = {
          permission_model_model: Yup.object().nullable().required(),
          permission_model_fields: Yup.array().nullable().min(3)
          , ...roles
        }
      }
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit('permission/RESET_ERROR')
      this.errors = {
        name: '',
        label: '',
        permission_model_model: '',
        permission_model_fields: '',
      };
    },
    addCondition() {
      Yup.object({
        field: Yup.string().nullable().required(),
        condition: Yup.object().nullable().required(),
      }).validate(this.data.conditions, {abortEarly: false}).then(async () => {
        this.payload.permission_model_conditions.push({
          field: this.data.conditions.field,
          condition: this.data.conditions.condition,
          value: this.data.conditions.value,
        });
        this.data.conditions.field = ''
        this.data.conditions.condition = ''
        this.data.conditions.value = ''
      }).catch((err) => {
        console.log(err.inner)
        this.$toast.error("Please fill all field");
      });
    },
  },
  created() {
    this.resetError()
    this.setTitle('Permission')
    this.setBreadcrumb([
      {
        to: '/acl/permission',
        name: 'Permission'
      },
      {
        to: '/acl/permission/create',
        name: 'Create'
      }
    ])
  },
  mounted() {
    this.getRouteList()
  },
  watch: {
    hasFilter: {
      handler(v) {
        if (v) {
          this.getModel()
        } else {
          this.payload.permission_model_fields = [];
          this.payload.permission_model_model = [];
        }
      },
      immediate: true
    },
    "payload.permission_model_model": {
      handler(v) {
        if (!v?.fields) {
          this.payload.permission_model_fields = []
        } else {
          this.payload.permission_model_fields = []
          this.payload.permission_model_fields = v.fields
        }
      },
      immediate: true
    }
  },
  computed: {
    checkSelectedModel() {
      if (this.payload.permission_model_model == null) {
        return false
      } else {
        return this.payload.permission_model_model.length !== 0
      }
    }
  }
}
</script>

<style scoped>

</style>
