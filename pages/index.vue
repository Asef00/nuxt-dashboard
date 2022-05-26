<template>
  <div class="c-card">
    <div class="c-card__header">
      <h2 class="c-card__title">Dashboard</h2>
    </div>
    <div class="c-card__body">
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>
        <VSelect :multiple="true" placeholder="Please select tag" v-model="payload.tag" :list="options"
                 key-validation="tag" label="Tags"/>
        <div class="row">
          <div class="col-md-6">
            <VInput label="Name" v-model="payload.name" keyValidation="name"
                    placeholder="Please enter name"/>
          </div>
          <div class="col-md-6">
            <VTextarea v-model="payload.summary" label="Summary" key-validation="summary"
                       placeholder="Please enter summary"/>
          </div>
        </div>
        <VBtn @action="startLoading" btn="simple" type="button">SAVE</VBtn>
        <VBtn @action="startLoading" type="button">
          <fa icon="plus"/>
          Add Client
        </VBtn>
        <VBtn @action="startLoading" btn="outline" type="button">
          <fa icon="chevron-left"/>
          Prev Step
        </VBtn>
        <VBtn @action="startLoading" btn="block" type="button">
          Add Note
        </VBtn>
      </form>
    </div>
  </div>
</template>

<script>
import * as Yup from "yup";

export default {
  data() {
    return {
      payload: {
        name: '',
        tag: '',
        summary: '',
      },
      options: ["list", "of", "options", "bla"],
    };
  },
  methods: {
    validation() {
      return Yup.object({
        name: Yup.string().required(),
        summary: Yup.string().required(),
        tag: Yup.array().min(1),
      });
    },
    resetError() {
      this.$store.commit('me/RESET_ERROR')
      this.errors = {
        name: '',
        tag: '',
        summary: '',
      }
    },
  },
  created() {
    this.setTitle('Dashboard')
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
