<template>
  <div>
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
        <div class="row">
          <div class="col-12">
            <VSwitch
              :defaultState="true"
              v-on:change="triggerToggleEvent"
              :labelText="'Validate Response'"
            />
          </div>
          <div class="col-12">
            <VCheckbox
              label="Ali"
              data="Ali"
              :list="selectedOptions"
              v-model="selected"
            />
            <VCheckbox
              label="Reza"
              data="Reza"
              :list="selectedOptions"
              v-model="selected"
            />
          </div>
          <div class="col-12">
            <VCheckbox
              label="Disabled"
              inputValue="foo"
              v-model="selectedOptions"
              :disabled="true"
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
    <VCard title="Alert">
      <VAlert class="c-alert--secondary">
        A simple primary alert—check it out!
      </VAlert>
      <VAlert class="c-alert--success">
        A simple success alert—check it out!
      </VAlert>
      <VAlert class="c-alert--danger">
        A simple danger alert—check it out!
      </VAlert>
      <VAlert class="c-alert--warning">
        A simple warning alert—check it out!
      </VAlert>
      <VAlert class="c-alert--info"> A simple info alert—check it out! </VAlert>
      <VAlert class="c-alert--light">
        A simple light alert—check it out!
      </VAlert>
      <VAlert class="c-alert--dark"> A simple dark alert—check it out! </VAlert>
    </VCard>
    <VCard title="MLS Information">
      <template #header>
        <VBtn class="m-0 c-btn--small">Button</VBtn>
        <VBtn class="m-0 c-btn--small" btn="outline">Button</VBtn>
      </template>
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>
      </form>
    </VCard>
    <VCard title="Card Toolbar Block button">
      <template #header>
        <VBtn class="m-0 c-btn--block c-btn--small">Button</VBtn>
      </template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
        eligendi quis, assumenda corporis ut error molestiae totam hic facilis
        et, nostrum culpa expedita maiores cumque amet modi delectus earum enim!
      </p>
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
    this.setTitle("Dashboard");
    this.setBreadcrumb([]);
    this.resetError();
  },
};
</script>
