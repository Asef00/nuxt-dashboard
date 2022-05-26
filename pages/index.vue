<template>
  <div class="c-card">
    <div class="c-card__header">
      <h2 class="c-card__title">Dashboard</h2>
    </div>
    <div class="c-card__body">
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>
        <VSelect
          :multiple="true"
          placeholder="Please select tag"
          v-model="payload.tag"
          :list="options"
          key-validation="tag"
          label="Tags"
        />
        <div class="row">
          <div class="col-md-6">
            <VInput
              label="Name"
              v-model="payload.name"
              keyValidation="name"
              placeholder="Name enter"
            />
          </div>
          <div class="col-md-6">
            <div class="c-form__control">
              <label class="c-form__label">Sample Label</label>
              <input
                class="c-form__input"
                type="text"
                placeholder="Disabled"
                disabled
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="c-form__control">
              <label class="c-form__label">Sample Label</label>
              <textarea
                class="c-form__input c-form__input--area"
                placeholder="Please Add Note..."
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <button class="c-btn" disabled>Save</button>
            <button class="c-btn c-btn--primary" disabled>
              <fa icon="plus" />
              Add Client
            </button>
            <button class="c-btn c-btn--outline" disabled>
              <fa icon="chevron-left" />
              Prev Step
            </button>
          </div>
          <div class="col-12">
            <button class="c-btn">Save</button>
            <button class="c-btn c-btn--primary">
              <fa icon="plus" />
              Add Client
            </button>
            <button class="c-btn c-btn--outline">
              <fa icon="chevron-left" />
              Prev Step
            </button>
          </div>
        </div>

        <button type="button" @click="validation" class="c-btn c-btn--block">
          Add Note
        </button>
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
        name: "",
        tag: "",
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
      this.$store.commit("me/RESET_ERROR");
      this.errors = {
        name: "",
        tag: "",
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
