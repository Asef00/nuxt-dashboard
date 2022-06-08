<template>
  <div>
    <VCard title="MLS Information">
      <template #header>
        <VBtn class="m-0 c-btn--small">Button</VBtn>
        <VBtn class="m-0 c-btn--small" btn="outline">Button</VBtn>
      </template>
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>
      </form>
    </VCard>
    <VCard title="MLS Information">
      <template #header>
        <VBtn class="m-0 c-btn--block c-btn--small">Button</VBtn>
      </template>
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>
      </form>
    </VCard>
  </div>
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
      toggleActive: false,
      selected: "", //for checkbox
      selectedOptions: [], //for checkbox
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

    triggerToggleEvent(value) {
      this.toggleActive = value;
    },
  },

  created() {
    this.setTitle("Treb MLS");
    this.setBreadcrumb([]);
    this.resetError();
  },
};
</script>
