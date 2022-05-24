<template>
  <div class="c-card">
    <div class="c-card__header">
      <h2 class="c-card__title">{{ title }}</h2>
    </div>
    <div class="c-card__body">
      <slot/>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste incidunt
        quae delectus necessitatibus? Dolorem similique dolore laborum sint a
        accusantium molestiae eius deleniti. Laborum totam nam incidunt placeat
        voluptatem molestias?
      </p>
      <form action="" class="c-form">
        <h4 class="c-form__title">Sync Accounts</h4>

        <div class="c-form__control">
          <label class="c-form__label">Single select</label>
          <multiselect
            v-model="value"
            :options="options"
            placeholder="Select Option"
          >
          </multiselect>
        </div>

        <div class="row">
          <div class="col">
            <div class="c-form__control">
              <label class="c-form__label">Sample Label</label>
              <input class="c-form__input" type="text" placeholder="Enter..." />
            </div>
          </div>
          <div class="col">
            <div class="c-form__control">
              <label class="c-form__label">Sample Label</label>
              <input class="c-form__input" type="text" placeholder="Disabled" disabled />
            </div>
          </div>
          <div class="col-12">
            <div class="c-form__control">
              <label class="c-form__label">Sample Label</label>
              <textarea class="c-form__input c-form__input--area" placeholder="Please Add Note..." rows="3"></textarea>
            </div>
          </div>
        </div>

        <button class="c-btn">Save</button>

        <button class="c-btn c-btn--primary">
          <fa icon="plus" />
          Add Client
        </button>

        <button class="c-btn c-btn--outline">
          <fa icon="chevron-left" />
          Prev Step
        </button>

        <button class="c-btn c-btn--block">Add Note</button>
      </form>
      >>>>>>> develop
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  name: "FooterPartial",
  props: {
  title: String
},
  methods: {},
  data() {
  return {
    value: null,
    options: ["list", "of", "options"],
  };
},
};
</script>

<style scoped lang="scss">

@import "~/assets/scss/components/card";
@import "~/assets/scss/components/form";
</style>
