<template>
  <VCard title="Create new Field Name">
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
          <VSelect
            v-model="payload.field_type"
            @validation="validate('field_type')"
            :error="errorMessage('field_type')"
            :list="list.field_type"
            placeholder="Please enter field type"
            track-label="label"
            label="Field Type"/>
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
          <VInput
            @validation="validate('placeholder')"
            :error="errorMessage('placeholder')"
            label="Placeholder"
            v-model="payload.placeholder"
            placeholder="Please enter placeholder"
          />
        </div>
        <div class="col-md-6">
          <VInput
            @validation="validate('length')"
            :error="errorMessage('length')"
            label="Length"
            type="number"
            v-model="payload.length"
            placeholder="Please enter length"
          />
        </div>
        <div class="col-md-6">
          <VInput
            @validation="validate('default_value')"
            :error="errorMessage('default_value')"
            label="Default Value"
            v-model="payload.default_value"
            placeholder="Please enter default value"
          />
        </div>
        <div v-if="this.checkFieldTypeHasSelect" class="col-md-6">
          <VSelect
            v-model="payload.data_set"
            :taggable="true"
            placeholder="Please enter data set"
            @validation="validate('data_set')"
            :error="errorMessage('data_set')"
            label="Data Set"/>
        </div>
        <div class="col-md-6">
          <VSelect
            v-model="payload.default_access"
            :multiple="true"
            :list="list.default_access"
            placeholder="Please enter default access"
            @validation="validate('default_access')"
            :error="errorMessage('default_access')"
            label="Default Access"/>
        </div>
      </div>
      <VSwitch
        @change="payload.required = $event"
        label="Required"
        @validation="validate('required')"
        :error="errorMessage('required')"
      />
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
      list: {
        field_type: [],
        default_access: ['edit', 'show']
      },
      data: {
        data_set: ''
      },
      payload: {
        name: '',
        label: '',
        placeholder: '',
        default_value: '',
        length: 0,
        required: false,
        data_set: [],
        default_access: [],
        field_type: []
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
          await this.$store.dispatch("fieldName/create", {...this.payload,field_type_id:this.payload.field_type.id});
          this.stopLoading();
          const err = this.handleError(this.$store.state.fieldName.error);
          if (!err) {
            this.$toast.success("Field Name successfully created.");
            this.$router.push("/field/name");
          }
        })
        .catch((err) => {
          this.setAllErrorValidation(err);
          this.stopLoading();
        });
    },
    async getFieldType() {
      await this.$store.dispatch('fieldType/list')
      let err = this.handleError(this.$store.state.fieldType.error)
      if (!err) {
        this.list.field_type = this.$store.state.fieldType.list
      }
    },
    validation() {
      let roles = {
        name: Yup.string().required(),
        label: Yup.string().required(),
        placeholder: Yup.string().required(),
        default_value: Yup.string(),
        length: Yup.number(),
        required: Yup.bool(),
        default_access: Yup.array().min(1),
        field_type: Yup.object().nullable().required(),
      };
      if (this.checkFieldTypeHasSelect) {
        roles = {data_set: Yup.array().min(1), ...roles}
      }
      return Yup.object(roles);
    },
    resetError() {
      this.$store.commit('fieldName/RESET_ERROR')
      this.errors = {
        name: '',
        label: '',
        placeholder: '',
        default_value: '',
        length: '',
        required: '',
        data_set: '',
        default_access: '',
        field_type: ''
      };
    },
  },
  created() {
    this.resetError()
  },
  mounted() {
    this.getFieldType()
  },
  computed: {
    checkFieldTypeHasSelect() {
      if (this.payload.field_type) {
        return this.payload.field_type.type === 'select'
      }
      return false;
    }
  }
}
</script>

<style scoped>

</style>
