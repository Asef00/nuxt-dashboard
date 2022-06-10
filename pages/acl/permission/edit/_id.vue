<template>
  <VCard title="Edit new Permission">
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
          <v-jsoneditor v-model="payload.permission_model_conditions" :plus="false" :options="optionsJson" height="250px"/>
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
      optionsJson: {
        mode: 'code'
      },
      list: {
        route: [],
        model: [],
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
    update() {
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
          await this.$store.dispatch("permission/update", {
            payload,
            id: this.$route.params.id
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
    async show() {
      this.startLoading()
      await this.$store.dispatch("permission/show", this.$route.params.id);
      let err = this.handleError(this.$store.state.permission.error);
      if (!err) {
        let data = this.$store.state.permission.item;
        this.payload.name = this.list.route.find(o => o.name === data.name)
        this.payload.label = data.label;
        if (data.permission_model) {
          await this.getModel()
          this.hasFilter = true;
          this.payload.permission_model_model = this.list.model.find(o => o.id === data.permission_model.model_id)
          this.payload.permission_model_conditions = data.permission_model.conditions
          this.payload.permission_model_fields = data.permission_model.fields
        }
      }
      this.stopLoading()
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
  },
  created() {
    this.resetError()
    this.getRouteList()
    this.show()
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
