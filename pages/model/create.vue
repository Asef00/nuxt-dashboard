<template>
  <VCard title="Create New Model">
    <form @submit.prevent="" class="c-form">
      <div class="row">
        <div class="col-md-6">
          <VInput @validation="validate('name')" :error="errorMessage('name')"
                  label="Name" v-model="payload.name"
                  placeholder="Please enter name"/>
        </div>
        <div class="col-md-6">
          <v-tag-input @list="pushListFiled($event)" @validation="validate('fields')" :error="errorMessage('fields')" v-model="payload.field"
                       label="Fields"/>
        </div>
      </div>
      <VBtn :loader="loaderRequest">
        Add Model
      </VBtn>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  name: "ModelCreate",
  data() {
    return {
      payload: {
        name: '',
        fields: [],
        field: ''
      },
    };
  },
  methods: {
    validation() {
      return Yup.object({
        name: Yup.string().required(),
        fields: Yup.array().min(1),
      });
    },
    resetError() {
      this.errors = {
        name: '',
        fields: '',
      }
    },
    pushListFiled(fields) {
      let arr = []
      for (let value of fields) {
        arr.push(value.text)
      }
      this.payload.fields = arr;
    }
  },
  created() {
    this.setTitle('Model')
    this.setBreadcrumb([
      {
        to: "dashboard",
        name: "Dashboard"
      },
    ])
    this.resetError()
  }
};
</script>
