<template>
  <div class="c-card">
    <div class="c-card__header">
      <h2 class="c-card__title">Dashboard</h2>
    </div>
    <div class="c-card__body">
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>
        <VSelect :multiple="false" placeholder="Please select tag" v-model="payload.tag" :list="options"
                 key-validation="tag" label="Tags"/>
        <div class="row">
          <div class="col-md-6">
            <VInput label="Name" v-model="payload.name" keyValidation="name" placeholder="Name enter"/>
          </div>
          <div class="col-md-6">
            <div class="c-form__control">
              <label class="c-form__label">Sample Label</label>
              <input class="c-form__input" type="text" placeholder="Disabled" disabled/>
            </div>
          </div>
          <div class="col-md-6">
            <div class="c-form__control">
              <label class="c-form__label">Sample Label</label>
              <textarea class="c-form__input c-form__input--area" placeholder="Please Add Note..." rows="3"></textarea>
            </div>
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
      },
      options: ["list", "of", "options", "bla"],
    };
  },
  methods: {
    validation() {
      return Yup.object({
        name: Yup.string().required(),
        tag: Yup.array().min(1),
      });
    },
    resetError() {
      this.$store.commit('me/RESET_ERROR')
      this.errors = {
        name: '',
        tag: '',
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
