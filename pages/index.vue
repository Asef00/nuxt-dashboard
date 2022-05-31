<template>
  <VCard title="Dashboard">
    <template #header> </template>
    <form action="" class="c-form">
      <h4 class="c-form__title">Sync Accounts</h4>
      <VSelect
        @validation="validate('tag')"
        :error="errorMessage('tag')"
        :multiple="true"
        placeholder="Please select tag"
        v-model="payload.tag"
        :list="options"
        label="Tags"
      />
      <VSelect
        :disabled="true"
        @validation="validate('tag')"
        :error="errorMessage('tag')"
        :multiple="true"
        placeholder="Please select tag"
        v-model="payload.tag"
        :list="options"
        label="Tags"
      />
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
          <VTextarea
            @validation="validate('summary')"
            :error="errorMessage('summary')"
            v-model="payload.summary"
            label="Summary"
            placeholder="Please enter summary"
          />
        </div>
      </div>
      <VBtn
        @action="startLoading"
        :loader="loaderRequest"
        btn="simple"
        type="button"
        >SAVE</VBtn
      >
      <VBtn @action="startLoading" type="button" :loader="loaderRequest">
        <fa icon="plus" />
        Add Client
      </VBtn>
      <VBtn @action="stopLoading" btn="outline" type="button">
        <fa icon="chevron-left" />
        Prev Step
      </VBtn>
      <VBtn
        @action="startLoading"
        btn="block"
        type="button"
        :loader="loaderRequest"
      >
        Add Note
      </VBtn>
    </form>
  </VCard>
</template>

<script>
import * as Yup from "yup";

export default {
  data() {
    return {
      payload: {
        name: "",
        tag: "",
        summary: "",
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
      this.$store.commit("me/RESET_ERROR");
      this.errors = {
        name: "",
        tag: "",
        summary: "",
      };
    },
  },
  created() {
    this.setTitle("Dashboard");
    this.setBreadcrumb([
      {
        to: "dashboard",
        name: "Dashboard",
      },
    ]);
    this.resetError();
  },
};
</script>
