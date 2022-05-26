<template>
  <div class="c-card">
    <div class="c-card__header">
      <h2 class="c-card__title">Dashboard</h2>
    </div>
    <div class="c-card__body">
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>

        <div class="c-form__control">
          <label class="c-form__label">Single select</label>
          <multiselect
            v-model="value"
            :options="options"
            :select-label="'Selected'"
            :deselect-label="'Hit to remove'"
            placeholder="Select Option"
          >
          </multiselect>
        </div>

        <div class="c-form__control">
          <label class="c-form__label">Single select</label>
          <multiselect
            v-model="value"
            :options="options"
            :select-label="'Selected'"
            :deselect-label="'Hit to remove'"
            placeholder="Select Option"
            class="is-invalid"
          >
          </multiselect>
          <span class="c-form__error">Please select a correct option</span>
        </div>

        <div class="row">
          <div class="col-md-6">
            <VInput  label="Name" v-model="payload.name" @some-event="validate('name')" keyValidation="name" placeholder="Name enter"/>
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
              <input class="c-form__input is-invalid" @keyup="validate('email')" type="text" placeholder="Enter..." value="jaguar@bla.com"/>
              <span class="c-form__error">Please provide a valid Email</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="c-form__control">
              <label class="c-form__label">Sample Label</label>
              <textarea class="c-form__input c-form__input--area" placeholder="Please Add Note..." rows="3"></textarea>
            </div>
          </div>
        </div>

        <button class="c-btn">Save</button>

        <button class="c-btn c-btn--primary">
          <fa icon="plus"/>
          Add Client
        </button>

        <button class="c-btn c-btn--outline">
          <fa icon="chevron-left"/>
          Prev Step
        </button>

        <button type="button" @click="validation" class="c-btn c-btn--block">Add Note</button>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import * as Yup from "yup";
export default {
  components: {Multiselect},
  data() {
    return {
      value: null,
      test:'dsdf',
      payload: {
        name: 'hi'
      },
      options: ["list", "of", "options", "bla"],
    };
  },
  methods: {
    validation(roles) {
      return Yup.object({
        name: Yup.string().required(),
      });
    },
    resetError() {
      this.$store.commit('me/RESET_ERROR')
      this.errors = {
        name: '',
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
